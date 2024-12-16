import { z } from "zod";
import { helpersFrom, select } from "zod-pocketbase";
import {
  zConfigRecord,
  zEventsRecord,
  zImagesRecord,
  zKnowledgesRecord,
  zPagesRecord,
  zPlacesRecord,
  zPostsRecord,
  zProductsRecord,
  zServicesRecord,
  zTestimoniesRecord,
} from "./schemas";
import {
  entryFromKnowledge,
  entryFromPost,
  entryFromService,
  hrefFromKnowledge,
  hrefFromPost,
  hrefFromService,
  imageFrom,
  itemFromEvent,
  itemFromKnowledge,
  itemFromPost,
  itemFromProduct,
  itemFromService,
  type KnowledgeItem,
  singleFromPost,
  singleFromService,
} from "./utils";

// SCHEMAS *********************************************************************************************************************************
export const zConfig = zConfigRecord.omit({ collectionId: true, collectionName: true, created: true, updated: true });
export type Config = z.infer<typeof zConfig>;

export const zImage = select(zImagesRecord, ["alt", "height", "id", "src", "width"]);
export const zKnowledgeSlug = select(zKnowledgesRecord, ["slug"]);
export const zPlacesNames = select(zPlacesRecord, ["name"]).array();

// CONFIG **********************************************************************************************************************************
export const getConfig = async ({ getRecord }: Helpers) => getRecord({ collection: "config", id: "fedcba987654321" }, { schema: zConfig });

// EVENTS **********************************************************************************************************************************
export const getEvents = async ({ getRecords }: Helpers) => {
  const zEvent = select(zEventsRecord, ["excerpt", "from", "name", "slug", "to", "url"], {
    image: zImage,
    places: zPlacesNames,
    service: select(zServicesRecord, ["category", "name", "slug"], { knowledge: zKnowledgeSlug }),
  });
  const { items: events } = await getRecords("events", { schema: zEvent, sort: "+from" });
  return Promise.all(events.map((event) => itemFromEvent(event)));
};

// KNOWLEDGES ******************************************************************************************************************************
export const getKnowledges = async ({ getRecords }: Helpers) => {
  const zKnowledge = select(zKnowledgesRecord, ["name", "slug", "text"], { image: zImage });
  const { items: knowledges } = await getRecords("knowledges", { schema: zKnowledge });
  return Promise.all(knowledges.map((knowledge) => itemFromKnowledge(knowledge)));
};

export const getKnowledgeSlugs = async ({ getRecords }: Helpers) => {
  const { items } = await getRecords("knowledges", { schema: zKnowledgeSlug });
  return items;
};

export const getKnowledgeEntries = async (helpers: Helpers) => {
  const knowledges = await getKnowledgeSlugs(helpers);
  return knowledges.map((knowledge) => entryFromKnowledge(knowledge));
};

export const getKnowledgeUrls = async (helpers: Helpers) => {
  const knowledges = await getKnowledgeSlugs(helpers);
  return knowledges.map((knowledge) => hrefFromKnowledge(knowledge));
};

// PAGE ************************************************************************************************************************************
export const getPage = async (slug: string, { getRecord }: Helpers) => {
  const zPage = select(zPagesRecord, [], {
    post: select(zPostsRecord, ["excerpt", "slug", "title"], {
      image: zImage,
      knowledge: zKnowledgeSlug,
    }),
    services: select(zServicesRecord, ["category", "duration", "excerpt", "name", "price", "slug"], {
      image: zImage,
      knowledge: zKnowledgeSlug,
      places: zPlacesNames,
    })
      .array()
      .optional(),
    testimoniesImage: zImage.optional(),
  });
  const page = await getRecord({ collection: "pages", slug }, { schema: zPage });
  const [post, testimoniesImage, ...services] = await Promise.all([
    itemFromPost(page.post),
    imageFrom(page.testimoniesImage),
    ...(page.services ?? []).map((service) => itemFromService(service)),
  ]);
  const trainings = services.filter(({ extra: { category } }) => category === "training");
  const workshops = services.filter(({ extra: { category } }) => category === "workshop");
  const consultations = services.filter(({ extra: { category } }) => category === "consult");
  return { consultations, post, testimoniesImage, trainings, workshops };
};

// POST ************************************************************************************************************************************
export const getPostItem = async (slug: string, { getRecord }: Helpers) => {
  const zPost = select(zPostsRecord, ["excerpt", "slug", "title"], { image: zImage, knowledge: zKnowledgeSlug });
  const post = await getRecord({ collection: "posts", slug }, { schema: zPost });
  return itemFromPost(post);
};

export const getPostSingle = async (slug: string, { getRecord }: Helpers) => {
  const zPost = select(zPostsRecord, ["collectionName", "text", "title"], { image: zImage.optional() });
  const post = await getRecord({ collection: "posts", slug }, { schema: zPost });
  return singleFromPost(post);
};
export type Post = Awaited<ReturnType<typeof getPostSingle>>;

export const getPostEntries = async ({ getRecords }: Helpers) => {
  const zPost = select(zPostsRecord, ["slug"], { knowledge: zKnowledgeSlug });
  const { items: posts } = await getRecords("posts", { schema: zPost });
  return posts.map((post) => entryFromPost(post));
};

export const getPostUrls = async ({ getRecords }: Helpers) => {
  const zPost = select(zPostsRecord, ["slug"], { knowledge: zKnowledgeSlug });
  const { items: posts } = await getRecords("posts", { schema: zPost });
  return posts.map((post) => hrefFromPost(post));
};

// PRODUCT *********************************************************************************************************************************
export const getProducts = async ({ getRecords }: Helpers) => {
  const zProduct = select(zProductsRecord, ["excerpt", "name", "price", "slug", "url"], { image: zImage });
  const { items: products } = await getRecords("products", { schema: zProduct });
  return Promise.all(products.map((product) => itemFromProduct(product)));
};

// SERVICE *********************************************************************************************************************************
export const getServiceSingle = async (slug: string, { getRecord }: Helpers) => {
  const zService = select(zServicesRecord, ["collectionName", "duration", "name", "price", "text"], {
    image: zImage,
    places: select(zPlacesRecord, ["name"]).array(),
  });
  const service = await getRecord({ collection: "services", slug }, { schema: zService });
  return singleFromService(service);
};
export type Service = Awaited<ReturnType<typeof getServiceSingle>>;

export const getServiceEntries = async ({ getRecords }: Helpers) => {
  const zService = select(zServicesRecord, ["category", "slug"], { knowledge: zKnowledgeSlug });
  const { items: services } = await getRecords("services", { schema: zService });
  return services.map((service) => entryFromService(service));
};

export const getServiceUrls = async ({ getRecords }: Helpers) => {
  const zService = select(zServicesRecord, ["category", "slug"], { knowledge: zKnowledgeSlug });
  const { items: services } = await getRecords("services", { schema: zService });
  return services.map((service) => hrefFromService(service));
};

// TESTIMONY *******************************************************************************************************************************
export const getTestimonies = async ({ getRecords }: Helpers) => {
  const zTestimony = select(zTestimoniesRecord, ["author", "text", "title"]);
  const { items } = await getRecords("testimonies", { schema: zTestimony });
  return items;
};
export type Testimony = Awaited<ReturnType<typeof getTestimonies>>[number];

// UI **************************************************************************************************************************************
export function heroFrom(config: Config, knowledges: KnowledgeItem[], knowledgeSlug: string) {
  const knowledge = knowledges.find(({ slug }) => slug === knowledgeSlug);
  if (!knowledge) throw new Error(`No knowledge found ${knowledge}`);
  return { image: knowledge.image, subtitle: config.title, title: knowledge.title };
}

export function otherKnowledgesFrom(knowledges: KnowledgeItem[], knowledgeSlug: string) {
  return knowledges.filter(({ slug }) => slug !== knowledgeSlug);
}

// URLS ************************************************************************************************************************************
export const getAllUrls = async (helpers: Helpers) => {
  const [knowledgeUrls, postUrls, serviceUrls] = await Promise.all([
    getKnowledgeUrls(helpers),
    getPostUrls(helpers),
    getServiceUrls(helpers),
  ]);
  return [...knowledgeUrls, ...postUrls, ...serviceUrls, "/boutique"];
};

export type Helpers = ReturnType<typeof helpersFrom>;
