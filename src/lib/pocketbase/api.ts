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
import { pick, select } from "./to-export";

// SHARED **********************************************************************************************************************************
export const toOmit = { collectionId: true, collectionName: true, created: true, updated: true } as const;
export const zImage = pick(zImagesRecord, ["alt", "height", "id", "src", "width"]);
export const zKnowledgeSlug = pick(zKnowledgesRecord, ["slug"]);
export const zPlacesNames = pick(zPlacesRecord, ["name"]).array();

// LAYOUT **********************************************************************************************************************************
export async function getLayout({ getRecord, getRecords }: App.Locals) {
  const [config, knowledges, organizationPost] = await Promise.all([
    getRecord({ collection: "config", id: "fedcba987654321" })(zConfigRecord.omit(toOmit)),
    getRecords("knowledges")(select(zKnowledgesRecord, ["name", "slug", "text"], { image: zImage })),
    getRecord({ collection: "posts", slug: "l-association" })(
      select(zPostsRecord, ["excerpt", "slug", "text", "title"], {
        image: zImage,
        knowledge: zKnowledgeSlug,
      }),
    ),
  ]);
  return { config, knowledges, organizationPost };
}

// KNOWLEDGE PAGE **************************************************************************************************************************
export async function getKnowledgeEntries({ getRecords }: App.Locals) {
  const knowledges = await getRecords("knowledges")(zKnowledgeSlug);
  return { knowledges };
}

export async function getKnowledgePage(knowledge: string, { getRecord, getRecords }: App.Locals) {
  const [events, page, testimonies] = await Promise.all([
    getRecords("events")(
      select(zEventsRecord, ["excerpt", "from", "name", "slug", "to", "url"], {
        image: zImage,
        places: zPlacesNames,
        service: pick(zServicesRecord, ["name"]),
      }),
    ),
    getRecord({ collection: "pages", slug: knowledge })(
      select(zPagesRecord, [], {
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
      }),
    ),
    knowledge === "traditions-ancestrales" ? getRecords("testimonies")(pick(zTestimoniesRecord, ["author", "text", "title"])) : [],
  ]);
  return { events, page, testimonies };
}

// KNOWLEDGE COLLECTION SLUG PAGE **********************************************************************************************************
export async function getKnowledgeCollectionSlugPage(collection: string, slug: string, { getRecord }: App.Locals) {
  const entry = await (collection === "articles"
    ? getRecord({ collection: "posts", slug })(select(zPostsRecord, ["collectionName", "text", "title"], { image: zImage }))
    : getRecord({ collection: "services", slug })(
        select(zServicesRecord, ["collectionName", "duration", "name", "price", "text"], {
          image: zImage,
          places: pick(zPlacesRecord, ["name"]).array(),
        }),
      ));
  return { entry };
}

// SHOP PAGE *******************************************************************************************************************************
export async function getShopPage({ getRecords }: App.Locals) {
  const products = await getRecords("products")(select(zProductsRecord, ["excerpt", "name", "price", "slug", "url"], { image: zImage }));
  return { products };
}
