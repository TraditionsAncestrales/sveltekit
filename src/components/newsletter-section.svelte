<UiSection {...$$restProps}>
  <UiTitle slot="header" title="Newsletter" class="mb-8" />
  <div class="w-full flex flex-col gap-4 lg:flex-row lg:gap-12">
    <p class="text-justify lg:max-w-sm xl:max-w-lg">
      Pour recevoir chaque semaine mon bulletin, c'est simple, vous avez juste à saisir votre courriel :
    </p>
    <UiForm
      name="newsletter"
      action="/api/newsletter"
      {validate}
      {messages}
      intent="secondary"
      submitText="Je m'inscris"
      submitTextDisabled="Inscription en cours..."
      cSubmit="w-full justify-center sm:w-auto"
      class="flex-1 sm:flex-row sm:items-start"
    >
      <svelte:fragment slot="fields" let:form>
        <FormEmail
          id="newsletterEmail"
          name="email"
          placeholder="Votre courriel"
          {form}
          intent="secondary"
          class="sm:max-w-xs xl:max-w-sm"
        />
      </svelte:fragment>
    </UiForm>
  </div>
</UiSection>

<script lang="ts">
  import {isEmail} from '~/data/utils';
  import FormEmail from './form-email.svelte';
  import UiForm from './ui-form.svelte';
  import UiSection from './ui-section.svelte';
  import UiTitle from './ui-title.svelte';

  // VARS ==================================================================================================================================
  const messages = {200: 'Inscription réalisée avec succès !', 401: 'Vous êtes déjà inscrit(e).'};
  const validate = ({email}: any) => ({email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null});
</script>
