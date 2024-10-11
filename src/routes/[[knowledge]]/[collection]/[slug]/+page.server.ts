import { dev } from "$app/environment";
import { getKnowledgeCollectionSlugPage, getKnowledgeCollectionSlugPageEntries } from "@/lib/api";
import { getPocketbase } from "@/lib/pocketbase/server";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";

// ENTRIES *********************************************************************************************************************************
export const entries: EntryGenerator = async () => {
  return getKnowledgeCollectionSlugPageEntries({ cache: dev ? "1d" : undefined, pocketbase: getPocketbase() });
};

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals: { pocketbase }, params: { collection, slug } }) => {
  const data = await getKnowledgeCollectionSlugPage(collection, slug, { pocketbase, cache: dev ? "1d" : undefined });
  if (!data.single) error(404);
  return data;
};
