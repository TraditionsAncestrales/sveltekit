import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";
import { z } from "zod";
import type { TypedPb } from ".";
import type { Collection, RecordIdRef, RecordRef, RecordSlugRef } from "./schemas";
import { getExpand, getFields, type RecordIdOpts, type RecordOpts, type RecordSlugOpts, type RecordsOpts } from "./to-export";

let pb: TypedPb;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPb(fetch: any) {
  if (!pb) pb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPb;

  function getRecord(ref: RecordSlugRef, options?: RecordSlugOpts): <S extends z.AnyZodObject>(schema: S) => Promise<S["_output"]>;
  function getRecord(ref: RecordIdRef, options?: RecordIdOpts): <S extends z.AnyZodObject>(schema: S) => Promise<S["_output"]>;
  function getRecord(ref: RecordRef, options?: RecordOpts) {
    return async <S extends z.AnyZodObject>(schema: S) => {
      const opts = { ...options, fetch, expand: getExpand(schema).join(","), fields: getFields(schema).join(",") };
      const record = await ("id" in ref
        ? pb.collection(ref.collection).getOne(ref.id, opts)
        : pb.collection(ref.collection).getFirstListItem(`slug = "${ref.slug}"`, opts));
      return schema.parse(record);
    };
  }

  function getRecords(collection: Collection, options?: RecordsOpts) {
    return async <S extends z.AnyZodObject>(schema: S) => {
      const opts = { ...options, fetch, expand: getExpand(schema).join(","), fields: getFields(schema).join(",") };
      const records = await pb.collection(collection).getFullList(opts);
      return schema.array().parse(records);
    };
  }

  return { getRecord, getRecords, pb };
}
