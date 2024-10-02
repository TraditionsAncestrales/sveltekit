import { z } from "zod";

// ENUMS ***********************************************************************************************************************************
export const collectionValues = [
  "config",
  "events",
  "images",
  "knowledges",
  "pages",
  "places",
  "posts",
  "products",
  "services",
  "testimonies",
] as const;
export const zCollection = z.enum(collectionValues);
export type Collection = z.infer<typeof zCollection>;
export const COLLECTION = zCollection.enum;

export const servicesCategoryValues = ["consult", "training", "workshop"] as const;
export const zServicesCategory = z.enum(servicesCategoryValues);
export type ServicesCategory = z.infer<typeof zServicesCategory>;
export const SERVICES_CATEGORY = zServicesCategory.enum;

// BASE ************************************************************************************************************************************
export const BaseModel = z.object({
  created: z.string().pipe(z.coerce.date()),
  id: z.string(),
  updated: z.string().pipe(z.coerce.date()),
});

export const AdminModel = z.object({
  ...BaseModel.shape,
  avatar: z.string(),
  email: z.string().email(),
});

export const RecordModel = z.object({
  ...BaseModel.shape,
  collectionId: z.string(),
  collectionName: z.string(),
  expand: z.any().optional(),
});

export const zRecordRef = z.string().transform((id) => (id === "" ? undefined : id));

// RECORDS *********************************************************************************************************************************
export const zConfigFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("config"),
  city: z.string(),
  email: z.string().email(),
  facebook: z.string().url(),
  instagram: z.string().url(),
  phone: z.string(),
  street: z.string(),
  title: z.string(),
  website: z.string().url(),
  zipcode: z.string(),
});
export type ConfigFlatRecord = z.infer<typeof zConfigFlatRecord>;

export const zEventsFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  excerpt: z.string(),
  from: z.string().pipe(z.coerce.date()),
  image: zRecordRef,
  name: z.string(),
  places: zRecordRef.array(),
  service: zRecordRef,
  slug: z.string(),
  to: z.string().pipe(z.coerce.date()),
  url: z.string().url(),
});
export type EventsFlatRecord = z.infer<typeof zEventsFlatRecord>;

export const zImagesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("images"),
  alt: z.string(),
  height: z.number().int(),
  src: z.string(),
  width: z.number().int(),
});
export type ImagesFlatRecord = z.infer<typeof zImagesFlatRecord>;

export const zKnowledgesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("knowledges"),
  image: zRecordRef,
  name: z.string(),
  slug: z.string(),
  text: z.string(),
});
export type KnowledgesFlatRecord = z.infer<typeof zKnowledgesFlatRecord>;

export const zPagesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("pages"),
  knowledge: zRecordRef,
  post: zRecordRef,
  services: zRecordRef.array().optional(),
  slug: z.string(),
  testimoniesImage: zRecordRef.optional(),
  title: z.string(),
});
export type PagesFlatRecord = z.infer<typeof zPagesFlatRecord>;

export const zPlacesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("places"),
  name: z.string(),
  slug: z.string(),
});
export type PlacesFlatRecord = z.infer<typeof zPlacesFlatRecord>;

export const zPostsFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("posts"),
  excerpt: z.string(),
  image: zRecordRef.optional(),
  knowledge: zRecordRef,
  slug: z.string(),
  text: z.string(),
  title: z.string(),
});
export type PostsFlatRecord = z.infer<typeof zPostsFlatRecord>;

export const zProductsFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("products"),
  excerpt: z.string(),
  image: zRecordRef,
  name: z.string(),
  price: z.string(),
  slug: z.string(),
  text: z.string(),
  url: z.string().url(),
});
export type ProductsFlatRecord = z.infer<typeof zProductsFlatRecord>;

export const zServicesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("services"),
  category: zServicesCategory,
  duration: z.string(),
  excerpt: z.string(),
  image: zRecordRef,
  knowledge: zRecordRef,
  name: z.string(),
  places: zRecordRef.array(),
  price: z.string(),
  slug: z.string(),
  text: z.string(),
});
export type ServicesFlatRecord = z.infer<typeof zServicesFlatRecord>;

export const zTestimoniesFlatRecord = z.object({
  ...RecordModel.omit({ expand: true }).shape,
  collectionName: z.literal("testimonies"),
  author: z.string(),
  text: z.string(),
  title: z.string(),
});
export type TestimoniesFlatRecord = z.infer<typeof zTestimoniesFlatRecord>;

// TYPES ***********************************************************************************************************************************
export const zConfigRecord = zConfigFlatRecord;
export type ConfigRecord = z.infer<typeof zConfigRecord>;

export const zImagesRecord = zImagesFlatRecord;
export type ImagesRecord = z.infer<typeof zImagesRecord>;

export const zPlacesRecord = zPlacesFlatRecord;
export type PlacesRecord = z.infer<typeof zPlacesRecord>;

export const zTestimoniesRecord = zTestimoniesFlatRecord;
export type TestimoniesRecord = z.infer<typeof zTestimoniesRecord>;

export const zKnowledgesRecord = zKnowledgesFlatRecord.extend({ expand: z.object({ image: zImagesRecord }) });
export type KnowledgesRecord = z.infer<typeof zKnowledgesRecord>;

export const zPostsRecord = zPostsFlatRecord.extend({ expand: z.object({ image: zImagesRecord, knowledge: zKnowledgesRecord }) });
export type PostsRecord = z.infer<typeof zPostsRecord>;

export const zProductsRecord = zProductsFlatRecord.extend({ expand: z.object({ image: zImagesRecord }) });
export type ProductsRecord = z.infer<typeof zProductsRecord>;

export const zServicesRecord = zServicesFlatRecord.extend({
  expand: z.object({ image: zImagesRecord, knowledge: zKnowledgesRecord, places: zPlacesRecord.array() }),
});
export type ServicesRecord = z.infer<typeof zServicesRecord>;

export const zEventsRecord = zEventsFlatRecord.extend({
  expand: z.object({ image: zImagesRecord, places: zPlacesRecord.array(), service: zServicesRecord }),
});
export type EventsRecord = z.infer<typeof zEventsRecord>;

export const zPagesRecord = zPagesFlatRecord.extend({
  expand: z.object({
    knowledge: zKnowledgesRecord,
    post: zPostsRecord,
    services: zServicesRecord.array().optional(),
    testimoniesImage: zImagesRecord.optional(),
  }),
});
export type PagesRecord = z.infer<typeof zPagesRecord>;

// TYPES ***********************************************************************************************************************************
export type RecordIdRef<C extends Collection = Collection> = { collection: C; id: string };
export type RecordSlugRef<C extends Collection = Collection> = { collection: C; slug: string };
export type RecordRef<C extends Collection = Collection> = RecordIdRef<C> | RecordSlugRef<C>;
