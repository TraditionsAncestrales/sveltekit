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

  const baseSeo = Object.freeze({
    title: "Le site d'Océane",
    titleTemplate: "%s — Traditions ancestrales",
    description: "Site d'Océane Ravasini à propos des traditions ancestrales : chamanisme, rêves, reiki et tarot.",
  });

  return { ...layoutData, baseSeo, svContact, svNewsletter };
};
