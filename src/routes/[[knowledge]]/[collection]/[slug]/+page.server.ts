import { getKnowledgeCollectionSlugPage } from "@/lib/pocketbase/api";
import { entryFromPost, entryFromService } from "@/lib/pocketbase/utils";
import type { PageServerLoad } from "./$types";

// ENTRIES *********************************************************************************************************************************
// export const entries: EntryGenerator = async () => {
// 	const knowledges = await pb.collection("knowledges").getFullList().then(zKnowledge.array().parse);
// }

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals, params: { collection, slug } }) => {
  const data = await getKnowledgeCollectionSlugPage(collection, slug, locals);
  const entry = data.entry.collectionName === "posts" ? entryFromPost(data.entry) : entryFromService(data.entry);
  return { entry };
};
