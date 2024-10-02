import { getLayout } from "@/lib/pocketbase/api";
import { itemFromKnowledge, itemFromPost } from "@/lib/pocketbase/utils";
import { error } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad } from "./$types";
import { zContactValues, zNewsletterValues } from "./utils";

// LOAD ************************************************************************************************************************************
export const load: LayoutServerLoad = async ({ locals, params }) => {
  const svContact = await superValidate(zod(zContactValues));
  const svNewsletter = await superValidate(zod(zNewsletterValues));

  const { config, ...data } = await getLayout(locals);
  const knowledges = data.knowledges.map((knowledge) => itemFromKnowledge(knowledge));
  const organizationPost = itemFromPost(data.organizationPost);

  const theme = params.knowledge ?? "traditions-ancestrales";
  const currentKnowledge = knowledges.find(({ slug }) => slug === theme);
  if (!currentKnowledge) return error(404, "Savoir introuvable");
  const otherKnowledges = knowledges.filter(({ slug }) => slug !== theme);
  const hero = { image: currentKnowledge.image, subtitle: config.title, title: currentKnowledge.title };

  return { config, hero, organizationPost, otherKnowledges, svContact, svNewsletter, theme };
};
