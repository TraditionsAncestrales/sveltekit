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
  import * as Form from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Section, type SectionProps } from "@/components/ui/section";
  import { Title } from "@/components/ui/title";
  import { toast } from "svelte-sonner";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { tv } from "tailwind-variants";
  import SubmitIcon from "~icons/bi/envelope-plus";
  import SubmittingIcon from "~icons/svg-spinners/ring-resize";
  import { zNewsletterValues, type Message, type NewsletterValues } from "./utils";

  // PROPS ***********************************************************************************************************************************
  const { sv, ...rest }: TheNewsletterProps = $props();

  // VARS ************************************************************************************************************************************
  const sf = superForm(sv, {
    validators: zodClient(zNewsletterValues),
    onError: () => {
      toast.error(i18n());
    },
    onUpdated: ({ form: { message, valid } }) => {
      console.log(message, valid);
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
    <form method="POST" action="/?/subscribeToNewsletter" use:enhance class={FORM({ className: "flex-1" })}>
      <Form.Field form={sf} name="email" class="w-full sm:max-w-xs xl:max-w-sm">
        <Form.Control>
          {#snippet children({ props })}
            <Input {...props} type="email" placeholder="Votre courriel..." bind:value={$form.email} class={INPUT} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="absolute text-destructive-400" />
      </Form.Field>
      <Form.Button disabled={$submitting} intent="secondary" class="mt-4 w-full justify-center gap-2 sm:mt-0 sm:w-auto">
        {#if $delayed}<SubmittingIcon class="h-4 w-4" />{:else}<SubmitIcon class="h-4 w-4" />{/if}
        Je m'inscris
      </Form.Button>
    </form>
  </div>
</Section>
