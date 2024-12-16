import { dev } from "$app/environment";
import { VERCEL_REVALIDATE_TOKEN } from "$env/static/private";
import { getPostEntries, getPostSingle, getServiceEntries, getServiceSingle } from "@/lib/pocketbase";
import { getPocketbase } from "@/lib/pocketbase/server";
import { error } from "@sveltejs/kit";
import { helpersFrom } from "zod-pocketbase";
import type { EntryGenerator, PageServerLoad } from "./$types";

// CONFIG **********************************************************************************************************************************
export const config = { isr: { bypassToken: VERCEL_REVALIDATE_TOKEN } };

// ENTRIES *********************************************************************************************************************************
export const entries: EntryGenerator = async () => {
  const helpers = helpersFrom({ cache: dev ? "1d" : undefined, pocketbase: getPocketbase() });
  const [posts, services] = await Promise.all([getPostEntries(helpers), getServiceEntries(helpers)]);
  return { ...posts, ...services };
};

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals, params: { collection, slug } }) => {
  const single = await (collection === "articles" ? getPostSingle(slug, locals) : getServiceSingle(slug, locals));
  if (!single) error(404);
  const seo = { title: single.title };
  return { single, seo };
};
