import { dev } from "$app/environment";
import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER, RESEND_API_KEY, VERCEL_REVALIDATE_TOKEN } from "$env/static/private";
import { getEvents, getKnowledgeEntries, getPage, getTestimonies } from "@/lib/pocketbase";
import { getPocketbase } from "@/lib/pocketbase/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";
import { Resend } from "resend";
import { zod } from "sveltekit-superforms/adapters";
import { message, superValidate } from "sveltekit-superforms/server";
import { helpersFrom } from "zod-pocketbase";
import { zContactValues, zNewsletterValues, type Message } from "../utils";
import type { Actions, EntryGenerator, PageServerLoad } from "./$types";

// CONFIG **********************************************************************************************************************************
export const config = { isr: { bypassToken: VERCEL_REVALIDATE_TOKEN } };

// ENTRIES *********************************************************************************************************************************
export const entries: EntryGenerator = async () =>
  getKnowledgeEntries(helpersFrom({ cache: dev ? "1d" : undefined, pocketbase: getPocketbase() }));

// CONST ***********************************************************************************************************************************
const resend = new Resend(RESEND_API_KEY);

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals, params: { knowledge = "traditions-ancestrales" } }) => {
  const [{ consultations, post, testimoniesImage, trainings, workshops }, allEvents, testimonies] = await Promise.all([
    getPage(knowledge, locals),
    getEvents(locals),
    getTestimonies(locals),
  ]);
  const isHome = knowledge === "traditions-ancestrales";
  const events = isHome ? allEvents : allEvents.filter(({ slug }) => slug === knowledge);

  const seo = Object.freeze({
    title: knowledge ? post.title : undefined,
  });

  return { consultations, events, post, seo, testimonies, testimoniesImage, trainings, workshops };
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
