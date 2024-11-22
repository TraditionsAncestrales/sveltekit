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
  import * as Form from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Section, type SectionProps } from "@/components/ui/section";
  import { Textarea } from "@/components/ui/textarea";
  import { Title } from "@/components/ui/title";
  import { cn } from "@/lib/utils";
  import { inview, type ObserverEventDetails } from "svelte-inview";
  import { toast } from "svelte-sonner";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import SubmitIcon from "~icons/bi/send";
  import SubmittingIcon from "~icons/svg-spinners/ring-resize";
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
  let isInView = $state(false);

  // EVENTS ********************************************************************************************************************************
  function onInViewChange({ detail: { inView } }: CustomEvent<ObserverEventDetails>) {
    isInView = inView;
  }
</script>

<Section class="relative" {...rest}>
  {#snippet Header()}<Title text="Me contacter" class="mb-8" />{/snippet}
  <div use:inview={{ unobserveOnEnter: true }} oninview_change={onInViewChange} class="flex w-full justify-center gap-8 xl:justify-start">
    {@render TheForm("w-full max-w-xl pb-96 xl:pb-0")}
    {#if isInView}<Map class="absolute inset-x-0 bottom-0 z-0 h-96 xl:left-auto xl:top-0 xl:h-auto xl:w-1/2" />{/if}
  </div>
</Section>

{#snippet TheForm(className?: string)}
  <form method="POST" action="/?/sendMessage" use:enhance class={cn("flex flex-col gap-4", className)}>
    <Form.Field form={sf} name="fullname">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Votre nom</Form.Label>
          <Input {...props} bind:value={$form.fullname} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={sf} name="email">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Votre courriel</Form.Label>
          <Input type="email" {...props} bind:value={$form.email} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={sf} name="message">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Votre message</Form.Label>
          <Textarea rows={5} {...props} bind:value={$form.message} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={$submitting} class="gap-2 self-end">
      {#if $delayed}<SubmittingIcon class="h-4 w-4" />{:else}<SubmitIcon class="h-4 w-4" />{/if}
      Envoyer
    </Form.Button>
  </form>
{/snippet}
