import { type RecordFullListOptions, type RecordListOptions, type RecordOptions } from "pocketbase";
import { z } from "zod";

// HELPERS *********************************************************************************************************************************
function isExpand(value: unknown): value is z.AnyZodObject | z.ZodArray<z.AnyZodObject> {
  return value instanceof z.ZodObject || (value instanceof z.ZodArray && value.element instanceof z.ZodObject);
}

function isOptionalExpand(value: unknown): value is z.ZodOptional<z.AnyZodObject | z.ZodArray<z.AnyZodObject>> {
  return value instanceof z.ZodOptional && isExpand(value.unwrap());
}

export function getExpand<S extends z.AnyZodObject | z.ZodArray<z.AnyZodObject>>(schema: S, prefix = "") {
  let expands: string[] = [];
  const shape = schema instanceof z.ZodArray ? schema.element.shape : schema.shape;
  if (!shape || !("expand" in shape)) return [];
  for (const [key, value] of Object.entries(shape.expand.shape)) {
    expands = [...expands, `${prefix}${key}`];
    if (isExpand(value)) expands = [...expands, ...getExpand(value, `${prefix}${key}.`)];
    else if (isOptionalExpand(value)) expands = [...expands, ...getExpand(value.unwrap(), `${prefix}${key}.`)];
  }
  return expands.sort((k1, k2) => (k1 < k2 ? -1 : 1));
}

export function getFields<S extends z.AnyZodObject | z.ZodArray<z.AnyZodObject>>(schema: S, prefix = "") {
  let fields: string[] = [];
  const shape = schema instanceof z.ZodArray ? schema.element.shape : schema.shape;
  for (const [key, value] of Object.entries(shape))
    fields = [...fields, ...(isExpand(value) ? getFields(value, `${prefix}${key}.`) : [`${prefix}${key}`])];
  return fields.sort((k1, k2) => (k1 < k2 ? -1 : 1));
}

export function expand<S extends z.ZodRawShape, U extends z.UnknownKeysParam, C extends z.ZodTypeAny, E extends z.ZodRawShape>(
  schema: z.ZodObject<S, U, C>,
  expansion: E,
): Expand<S, U, C, E> {
  return schema.extend({ expand: z.object(expansion) }) as unknown as Expand<S, U, C, E>;
}

export function pick<S extends z.ZodRawShape, U extends z.UnknownKeysParam, C extends z.ZodTypeAny, F extends (keyof S)[]>(
  schema: z.ZodObject<S, U, C>,
  fields: F,
): z.ZodObject<Pick<S, F[number]>, U, C> {
  return schema.pick(Object.fromEntries(fields.map((field) => [field, true])) as Exactly<{ [k in keyof S]?: true }, F[number]>);
}

export function select<
  S extends z.ZodRawShape,
  U extends z.UnknownKeysParam,
  C extends z.ZodTypeAny,
  F extends (keyof S)[],
  E extends z.ZodRawShape,
>(schema: z.ZodObject<S, U, C>, fields: F, expansion: E) {
  return expand(pick(schema, fields), expansion);
}

// TYPES ***********************************************************************************************************************************
type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
type ExtendShape<A extends object, B extends object> = { [K in keyof A as K extends keyof B ? never : K]: A[K] } & { [K in keyof B]: B[K] };
type Expand<S extends z.ZodRawShape, U extends z.UnknownKeysParam, C extends z.ZodTypeAny, E extends z.ZodRawShape> = z.ZodObject<
  ExtendShape<S, { expand: z.ZodObject<E> }>,
  U,
  C
>;

export type RecordSlugOpts = Omit<RecordListOptions, "expand" | "fields">;
export type RecordIdOpts = Omit<RecordOptions, "expand" | "fields">;
export type RecordOpts = RecordSlugOpts | RecordIdOpts;
export type RecordsOpts = Omit<RecordFullListOptions, "expand" | "fields">;

export type RecordIdRef<C extends string = string> = { collection: C; id: string };
export type RecordSlugRef<C extends string = string> = { collection: C; slug: string };
export type RecordRef<C extends string = string> = RecordIdRef<C> | RecordSlugRef<C>;
