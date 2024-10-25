<script lang="ts" module>
  // I18N **********************************************************************************************************************************
  function i18n(message?: Message) {
    if (message === 200) return "Message envoyé avec succès";
    if (message === 400) return "Une erreur est survenue.Veuillez contacter un administrateur";
    if (message === 402) return "Certains champs sont invalides";
    return "Une erreur est survenue. Veuillez réessayer ultérieurement";
  }

  // TYPES *********************************************************************************************************************************
  export type TheContactProps = Omit<SectionProps, "children"> & { sv: SuperValidated<ContactValues, Message> };
</script>

<script lang="ts">
  import { browser } from "$app/environment";
  import * as Form from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Section, type SectionProps } from "@/components/ui/section";
  import { Textarea } from "@/components/ui/textarea";
  import { Title } from "@/components/ui/title";
  import { cn } from "@/lib/utils";
  import { toast } from "svelte-sonner";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { default as SubmitIcon, default as SubmittingIcon } from "~icons/bi/envelope-plus";
  import Map from "./the-contact.map.svelte";
  import { zContactValues, type ContactValues, type Message } from "./utils";

  // PROPS *********************************************************************************************************************************
  let { sv, ...rest }: TheContactProps = $props();

  // VARS **********************************************************************************************************************************
  const sf = superForm(sv, {
    validators: zodClient(zContactValues),
    onError: () => toast.error(i18n()),
    onUpdated: ({ form: { message, valid } }) => {
      if (message) valid ? toast.success(i18n(message)) : toast.error(i18n(message));
    },
  });
  const { delayed, enhance, form, submitting } = sf;
</script>

<Section class="relative" {...rest}>
  {#snippet Header()}<Title text="Me contacter" class="mb-8" />{/snippet}
  <div class="w-full gap-8 lg:flex">
    {@render TheForm("w-full max-w-xl pb-96 xl:pb-0")}
    {#if browser}<Map class="absolute inset-x-0 bottom-0 z-0 h-96 xl:left-auto xl:top-0 xl:h-auto xl:w-1/2" />{/if}
  </div>
</Section>

{#snippet TheForm(className?: string)}
  <form method="POST" action="/?/sendMessage" use:enhance class={cn("flex flex-col gap-4", className)}>
    <Form.Field form={sf} name="fullname">
      <Form.Control let:attrs>
        <Form.Label>Votre nom</Form.Label>
        <Input {...attrs} bind:value={$form.fullname} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={sf} name="email">
      <Form.Control let:attrs>
        <Form.Label>Votre courriel</Form.Label>
        <Input type="email" {...attrs} bind:value={$form.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={sf} name="message">
      <Form.Control let:attrs>
        <Form.Label>Votre message</Form.Label>
        <Textarea rows={5} {...attrs} bind:value={$form.message} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={$submitting} class="flex gap-2 self-end">
      {#if $delayed}<SubmittingIcon class="h-4 w-4" />{:else}<SubmitIcon class="h-4 w-4" />{/if}
      Envoyer
    </Form.Button>
  </form>
{/snippet}
