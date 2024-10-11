import { dev } from "$app/environment";
import { getLayout } from "@/lib/api";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad } from "./$types";
import { zContactValues, zNewsletterValues } from "./utils";

// LOAD ************************************************************************************************************************************
export const load: LayoutServerLoad = async ({ locals: { pocketbase }, params, route }) => {
  const svContact = await superValidate(zod(zContactValues));
  const svNewsletter = await superValidate(zod(zNewsletterValues));
  const layoutData = await getLayout(params.knowledge, route.id === "/[[knowledge]]", { pocketbase, cache: dev ? "1d" : undefined });
  return { ...layoutData, svContact, svNewsletter };
};
