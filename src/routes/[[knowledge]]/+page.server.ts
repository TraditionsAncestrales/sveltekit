import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER, RESEND_API_KEY } from "$env/static/private";
import { getKnowledgeEntries, getKnowledgePage } from "@/lib/pocketbase/api";
import { getPb } from "@/lib/pocketbase/server";
import { imageFrom, itemFromEvent, itemFromPost, itemFromService, pathFromKnowledge } from "@/lib/pocketbase/utils";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";
import { Resend } from "resend";
import { zod } from "sveltekit-superforms/adapters";
import { message, superValidate } from "sveltekit-superforms/server";
import { zContactValues, zNewsletterValues, type Message } from "../utils";
import type { Actions, EntryGenerator, PageServerLoad } from "./$types";

// CONST ***********************************************************************************************************************************
const resend = new Resend(RESEND_API_KEY);

// ENTRIES *********************************************************************************************************************************
export const entries: EntryGenerator = async () => {
  const locals = getPb(fetch);
  const { knowledges } = await getKnowledgeEntries(locals);
  return knowledges.map((knowledge) => pathFromKnowledge(knowledge));
};

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals, params: { knowledge } }) => {
  const isHome = knowledge === undefined;
  const { page, ...data } = await getKnowledgePage(knowledge ?? "traditions-ancestrales", locals);
  const events = data.events.map((event) => itemFromEvent(event));
  const post = isHome ? { ...itemFromPost(page.expand.post), title: "Bienvenue" } : itemFromPost(page.expand.post);
  const services = (page.expand.services ?? []).map((service) => itemFromService(service));
  const trainings = services.filter(({ extra: { category } }) => category === "training");
  const workshops = services.filter(({ extra: { category } }) => category === "workshop");
  const consultations = services.filter(({ extra: { category } }) => category === "consult");
  const testimonies = { image: imageFrom(page.expand.testimoniesImage), items: data.testimonies };
  return { consultations, events, post, testimonies, trainings, workshops };
};

// ACTIONS *********************************************************************************************************************************
export const actions: Actions = {
  sendMessage: async ({ request }) => {
    const svContact = await superValidate(request, zod(zContactValues));
    if (!svContact.valid) return message<Message>(svContact, 402, { status: 402 });
    const { email, fullname, message: content } = svContact.data;
    const { error } = await resend.emails.send({
      from: "contact@traditionsancestrales.fr",
      to: "niama.traditions.ancestrales@gmail.com",
      subject: "Formulaire de contact",
      html: `<dl><dt>Nom :</dt><dd>${fullname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${content}</dd></dl>`,
    });
    if (error) return message<Message>(svContact, 400, { status: 400 });
    return message<Message>(svContact, 200);
  },
  subscribeToNewsletter: async ({ request }) => {
    const svNewsletter = await superValidate(request, zod(zNewsletterValues));
    if (!svNewsletter.valid) return message<Message>(svNewsletter, 402, { status: 402 });
    const { email } = svNewsletter.data;
    const listId = MAILCHIMP_LIST_ID;
    if (!listId) return message<Message>(svNewsletter, 400, { status: 400 });
    const subscriberHash = md5(email.toLowerCase());
    mailchimp.setConfig({ apiKey: MAILCHIMP_API_KEY, server: MAILCHIMP_SERVER });
    try {
      const { status } = await mailchimp.lists.getListMember(listId, subscriberHash);
      if (status !== "unsubscribed") return message<Message>(svNewsletter, 409, { status: 409 });
      await mailchimp.lists.updateListMember(listId, subscriberHash, { status: "subscribed" });
    } catch {
      await mailchimp.lists.addListMember(listId, { email_address: email, status: "subscribed" });
    }
    return message<Message>(svNewsletter, 200);
  },
};
