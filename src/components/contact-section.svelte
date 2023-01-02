<UiSection class="relative" {...$$restProps}>
  <UiTitle slot="header" title="Me contacter" class="mb-8" />
  <div class="w-full lg:flex gap-8">
    <UiForm
      name="contact"
      action={import.meta.env.DEV ? '/api/contact' : '/'}
      netlify
      {messages}
      {validate}
      cSubmit="self-end"
      class="mb-4 w-full max-w-xl pb-96 xl:pb-0"
    >
      <svelte:fragment slot="fields" let:form>
        <FormText id="contactFullname" name="fullname" label="Votre nom" {form} />
        <FormEmail id="contactEmail" name="email" label="Votre courriel" {form} />
        <FormArea id="contactMessage" name="message" label="Votre message" {form} />
      </svelte:fragment>
    </UiForm>
    <figure use:setMap={mapO} class="z-0 absolute bottom-0 inset-x-0 h-96 xl:top-0 xl:left-auto xl:w-1/2 xl:h-auto" />
  </div>
</UiSection>

<script lang="ts">
  import {setMap} from '~/data/map';
  import {isEmail} from '~/data/utils';
  import FormArea from './form-area.svelte';
  import FormEmail from './form-email.svelte';
  import FormText from './form-text.svelte';
  import UiForm from './ui-form.svelte';
  import UiSection from './ui-section.svelte';
  import UiTitle from './ui-title.svelte';

  // VARS ==================================================================================================================================
  const mapO = {lat: -21.142107, lng: 55.294209, zoom: 17};
  const messages = {200: 'Message envoyé avec succès !'};

  const validate = ({email, fullname, message}: any) => ({
    email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null,
    fullname: fullname ? null : 'Ce champ est requis.',
    message: message ? null : 'Ce champ est requis.',
  });
</script>
