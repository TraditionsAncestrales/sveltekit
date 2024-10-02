import type { ErrorStatus } from "sveltekit-superforms";
import { z } from "zod";

// CONTACT *********************************************************************************************************************************
export const zContactValues = z.object({
  email: z.string().email("Ce courriel est invalide.").min(1, "Ce champ est requis."),
  fullname: z.string().min(1, "Ce champ est requis."),
  message: z.string().min(1, "Ce champ est requis."),
});

export type ContactValues = z.infer<typeof zContactValues>;

// NEWSLETTER ******************************************************************************************************************************
export const zNewsletterValues = z.object({
  email: z.string().email("Ce courriel est invalide.").min(1, "Ce champ est requis."),
});

export type NewsletterValues = z.infer<typeof zNewsletterValues>;

// TYPES ***********************************************************************************************************************************
export type Message = ErrorStatus | 200;
