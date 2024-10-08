<script lang="ts" module>
  // I18N **********************************************************************************************************************************
  function i18n(message?: Message) {
    if (message === 200) return "Inscription réalisée avec succès";
    if (message === 400) return "Une erreur est survenue.Veuillez contacter un administrateur";
    if (message === 402) return "Certains champs sont invalides";
    if (message === 409) return "Vous êtes déjà inscrit.e";
    return "Une erreur est survenue. Veuillez réessayer ultérieurement";
  }

  // STYLES ********************************************************************************************************************************
  const FORM = tv({ base: "flex flex-col gap-4 sm:flex-row sm:items-center" });
  const INPUT = "aria-invalid:border-destructive-400 aria-invalid:focus-visible:ring-destructive-400 focus-visible:ring-secondary";

  // TYPES *********************************************************************************************************************************
  export type TheNewsletterProps = Omit<SectionProps, "children"> & { sv: SuperValidated<NewsletterValues, Message> };
</script>

<script lang="ts">
  import { Section, type SectionProps } from "@/lib/components/ui/section";
  import { Title } from "@/lib/components/ui/title";
  import * as Form from "@/lib/components/ui/form";
  import { Input } from "@/lib/components/ui/input";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  import { tv } from "tailwind-variants";
  import { zNewsletterValues, type NewsletterValues, type Message } from "./utils";
  import SubmitIcon from "~icons/bi/envelope-plus";
  import SubmittingIcon from "~icons/bi/envelope-plus";

  // PROPS ***********************************************************************************************************************************
  const { sv, ...rest }: TheNewsletterProps = $props();

  // VARS ************************************************************************************************************************************
  const sf = superForm(sv, {
    validators: zodClient(zNewsletterValues),
    onError: () => {
      toast.error(i18n());
    },
    onUpdated: ({ form: { message, valid } }) => {
      if (message) valid ? toast.success(i18n(message)) : toast.error(i18n(message));
    },
  });
  const { delayed, enhance, form, submitting } = sf;
</script>

<Section {...rest}>
  {#snippet Header()}<Title text="Newsletter" class="mb-8" />{/snippet}
  <div class="flex w-full flex-col gap-4 lg:flex-row lg:gap-12">
    <p class="text-justify lg:max-w-sm xl:max-w-lg">
      Pour recevoir chaque semaine mon bulletin, c'est simple, vous avez juste à saisir votre courriel :
    </p>
    <form method="POST" action="/?/subscribeToNewsletter" use:enhance novalidate class={FORM({ className: "flex-1" })}>
      <Form.Field form={sf} name="email" class="w-full sm:max-w-xs xl:max-w-sm">
        <Form.Control let:attrs>
          <Input {...attrs} type="email" placeholder="Votre courriel..." bind:value={$form.email} class={INPUT} />
        </Form.Control>
        <Form.FieldErrors class="absolute text-destructive-400" />
      </Form.Field>
      <Form.Button disabled={$submitting} intent="secondary" class="mt-4 w-full justify-center sm:mt-0 sm:w-auto">
        {#if $delayed}<SubmittingIcon class="h-4 w-4" />{:else}<SubmitIcon class="h-4 w-4" />{/if}
        Je m'inscris
      </Form.Button>
    </form>
  </div>
</Section>
