import { getConfig, getKnowledges, getPostItem, heroFrom, otherKnowledgesFrom } from "@/lib/pocketbase";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad } from "./$types";
import { zContactValues, zNewsletterValues } from "./utils";

// LOAD ************************************************************************************************************************************
export const load: LayoutServerLoad = async ({ locals, params: { knowledge = "traditions-ancestrales" }, route }) => {
  const svContact = await superValidate(zod(zContactValues));
  const svNewsletter = await superValidate(zod(zNewsletterValues));

  const [config, knowledges, organizationPost] = await Promise.all([
    getConfig(locals),
    getKnowledges(locals),
    getPostItem("l-association", locals),
  ]);
  const isMain = route.id === "/[[knowledge]]";
  const isHome = knowledge === "traditions-ancestrales" && isMain;
  const hero = heroFrom(config, knowledges, knowledge);
  const otherKnowledges = otherKnowledgesFrom(knowledges, knowledge);

  const baseSeo = Object.freeze({
    title: "Le site d'Océane",
    titleTemplate: "%s — Traditions ancestrales",
    description: "Site d'Océane Ravasini à propos des traditions ancestrales : chamanisme, rêves, reiki et tarot.",
  });

  return { baseSeo, config, hero, isHome, isMain, organizationPost, otherKnowledges, svContact, svNewsletter, theme: knowledge };
};
