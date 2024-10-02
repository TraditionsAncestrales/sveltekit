import { PUBLIC_IMGIX_URL } from "$env/static/public";
import { format } from "@formkit/tempo";
import {
  type EventsRecord,
  type ImagesRecord,
  type KnowledgesRecord,
  type PlacesRecord,
  type PostsRecord,
  type ProductsRecord,
  type ServicesRecord,
} from "./schemas";

type Narrow<FROM, TO> = FROM extends undefined ? (TO extends Promise<unknown> ? Promise<undefined> : undefined) : TO;
export function allowUndefined<FROM, TO>(method: (defined: FROM) => TO) {
  return <F extends FROM | undefined>(possiblyUndefined: F) => (possiblyUndefined ? method(possiblyUndefined) : undefined) as Narrow<F, TO>;
}

// EVENTS **********************************************************************************************************************************
function strictItemFromEvent(event: EventForItem) {
  const { excerpt: text, expand, from, name: title, slug, to, url: href } = event;
  const features = [
    { key: "Type", value: expand.service.name },
    { key: "Du", value: format(from, "full") },
    { key: "Au", value: format(to, "full") },
    { key: "Endroits", value: expand.places.map(({ name }) => name).join(" ou ") },
  ];
  return { features, href, image: imageFrom(expand.image), slug, text, title };
}
export const itemFromEvent = allowUndefined(strictItemFromEvent);

// IMAGE ***********************************************************************************************************************************
function strictImageFrom({ alt, height, id, src, width }: ImageForEntry) {
  return { alt, aspectRatio: width / height, src: `${PUBLIC_IMGIX_URL}/${id}/${src}` };
}
export const imageFrom = allowUndefined(strictImageFrom);

// KNOWLEDGE *******************************************************************************************************************************
function strictItemFromKnowledge(knowledge: KnowledgeForItem) {
  const { expand, name: title, slug, text } = knowledge;
  return { href: `/${slug}`, image: imageFrom(expand.image), slug, text, title };
}
export const itemFromKnowledge = allowUndefined(strictItemFromKnowledge);

export function fragmentFromKnowledge({ slug }: KnowledgeForRoute) {
  return slug === "traditions-ancestrales" ? undefined : slug;
}

export function hrefFromKnowledge({ slug }: KnowledgeForRoute) {
  return "/" + (slug === "traditions-ancestrales" ? "" : `${slug}/`);
}

export function pathFromKnowledge(knowledge: KnowledgeForRoute) {
  return { knowledge: fragmentFromKnowledge(knowledge) };
}

// POST ************************************************************************************************************************************
function strictEntryFromPost(post: PostForEntry) {
  const { expand, text, title } = post;
  return { features: [], image: imageFrom(expand.image), text, title };
}
export const entryFromPost = allowUndefined(strictEntryFromPost);

function strictItemFromPost(post: PostForItem) {
  const { excerpt: text, expand, slug, title } = post;
  if (!expand.image) throw new Error(`Post ${slug} has no image`);
  return { href: hrefFromPost(post), image: imageFrom(expand.image), slug, text, title };
}
export const itemFromPost = allowUndefined(strictItemFromPost);

export function hrefFromPost(post: PostForRoute) {
  return `${hrefFromKnowledge(post.expand.knowledge)}articles/${post.slug}`;
}

export function pathFromPost({ expand: { knowledge }, slug }: PostForRoute) {
  return { params: { knowledge: fragmentFromKnowledge(knowledge), collection: "articles", slug } };
}

// PRODUCT *********************************************************************************************************************************
function strictItemFromProduct(product: ProductForItem) {
  const { excerpt: text, expand, name: title, slug, url: href } = product;
  if (!expand.image) throw new Error(`Product ${slug} has no image`);
  return { features: featuresFromProduct(product), href, image: imageFrom(expand.image), slug, text, title };
}
export const itemFromProduct = allowUndefined(strictItemFromProduct);

export function featuresFromProduct({ price }: ProductForFeatures) {
  return [{ key: "Tarif", value: price }];
}

// SERVICES ********************************************************************************************************************************
function strictEntryFromService(service: ServiceForEntry) {
  const { expand, name: title, text } = service;
  return { features: featuresFromService(service), image: imageFrom(expand.image), text, title };
}
export const entryFromService = allowUndefined(strictEntryFromService);

function strictItemFromService(service: ServiceForItem) {
  const { category, excerpt: text, expand, name: title, slug } = service;
  const features = featuresFromService(service);
  return { extra: { category }, features, href: hrefFromService(service), image: imageFrom(expand.image), slug, text, title };
}
export const itemFromService = allowUndefined(strictItemFromService);

export function featuresFromService({ price, duration, expand: { places } }: ServiceForFeatures) {
  return [
    { key: "Tarif", value: price },
    { key: "Durée", value: duration },
    { key: "Endroits", value: places.map(({ name }) => name).join(" ou ") },
  ];
}

export function fragmentFromService({ category }: ServiceForFragment) {
  return { consult: "consultations" as const, training: "formations" as const, workshop: "ateliers" as const }[category];
}

export function hrefFromService(service: ServiceForRoute) {
  return `${hrefFromKnowledge(service.expand.knowledge)}${fragmentFromService(service)}/${service.slug}`;
}

export function pathFromService(service: ServiceForRoute) {
  return {
    params: { knowledge: fragmentFromKnowledge(service.expand.knowledge), collection: fragmentFromService(service), slug: service.slug },
  };
}

// TYPES ***********************************************************************************************************************************
export type Image = ReturnType<typeof imageFrom>;

type EventForItem = Pick<EventsRecord, "excerpt" | "from" | "name" | "slug" | "to" | "url"> & {
  expand: {
    image: ImageForEntry;
    places: Pick<PlacesRecord, "name">[];
    service: Pick<ServicesRecord, "name">;
  };
};
type ImageForEntry = Pick<ImagesRecord, "alt" | "height" | "id" | "src" | "width">;
type KnowledgeForItem = KnowledgeForRoute & Pick<KnowledgesRecord, "name" | "text"> & { expand: { image: ImageForEntry } };
type KnowledgeForRoute = Pick<KnowledgesRecord, "slug">;
type PostForEntry = Pick<PostsRecord, "text" | "title"> & { expand: { image: ImageForEntry } };
type PostForItem = PostForRoute & Pick<PostsRecord, "excerpt" | "title"> & { expand: { image: ImageForEntry } };
type PostForRoute = Pick<PostsRecord, "slug"> & { expand: { knowledge: KnowledgeForRoute } };
type ProductForFeatures = Pick<ProductsRecord, "price">;
type ProductForItem = ProductForFeatures & Pick<ProductsRecord, "excerpt" | "name" | "slug" | "url"> & { expand: { image: ImageForEntry } };
type ServiceForEntry = ServiceForFeatures & Pick<ServicesRecord, "name" | "text"> & { expand: { image: ImageForEntry } };
type ServiceForFeatures = Pick<ServicesRecord, "price" | "duration"> & { expand: { places: Pick<PlacesRecord, "name">[] } };
type ServiceForFragment = Pick<ServicesRecord, "category">;
type ServiceForItem = ServiceForFeatures &
  ServiceForRoute &
  Pick<ServicesRecord, "excerpt" | "name"> & { expand: { image: ImageForEntry } };
type ServiceForRoute = ServiceForFragment & Pick<ServicesRecord, "slug"> & { expand: { knowledge: KnowledgeForRoute } };

export type Feature = {
  key: string;
  value: string;
};

export type Extra = Record<string, unknown> | undefined;

type StrictItem = {
  features?: Feature[];
  href: string;
  image: Image;
  slug: string;
  text: string;
  title: string;
};

export type Item<E extends Extra | undefined = undefined> = E extends undefined ? StrictItem : StrictItem & { extra: E };
export type ServiceItem = Awaited<ReturnType<typeof itemFromService>>;
