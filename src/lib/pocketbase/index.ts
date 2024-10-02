import { z } from "zod";
import type Pocketbase from "pocketbase";
import type { RecordService } from "pocketbase";
import type {
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

// TYPES ***********************************************************************************************************************************
export type TypedPb = Pocketbase & {
  collection(idOrName: "config"): RecordService<z.input<typeof zConfigRecord>>;
  collection(idOrName: "events"): RecordService<z.input<typeof zEventsRecord>>;
  collection(idOrName: "images"): RecordService<z.input<typeof zImagesRecord>>;
  collection(idOrName: "knowledges"): RecordService<z.input<typeof zKnowledgesRecord>>;
  collection(idOrName: "pages"): RecordService<z.input<typeof zPagesRecord>>;
  collection(idOrName: "places"): RecordService<z.input<typeof zPlacesRecord>>;
  collection(idOrName: "posts"): RecordService<z.input<typeof zPostsRecord>>;
  collection(idOrName: "products"): RecordService<z.input<typeof zProductsRecord>>;
  collection(idOrName: "services"): RecordService<z.input<typeof zServicesRecord>>;
  collection(idOrName: "testimonies"): RecordService<z.input<typeof zTestimoniesRecord>>;
};
