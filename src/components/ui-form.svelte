<form use:form method="POST" {action} {name} {...netlifyProps} class="flex flex-col gap-4 {cEl}">
  {#if netlify}
    <input type="hidden" name="form-name" value={name} />
    <input name={netlifyProps['netlify-honeypot']} class="hidden" />
  {/if}
  <slot name="fields" form={formState} />
  <FormSubmit form={formState} {intent} text={submitText} textDisabled={submitTextDisabled} class="mt-4 sm:mt-0 {cSubmit}" />
</form>

{#if alert}<div transition:fly={{y: 40}} class="z-50 fixed inset-x-10 bottom-10 flex justify-center">
    <div class="{alert?.isSuccess ? 'bg-emerald-500' : 'bg-red-500'} text-white text-center p-4">{alert?.message}</div>
  </div>{/if}

<script lang="ts">
  import {createForm, FelteSubmitError} from 'felte';
  import {fly} from 'svelte/transition';
  import type {Intent} from '~/schemas/ui';
  import FormSubmit from './form-submit.svelte';

  // PROPS =================================================================================================================================
  export let action: string;
  export let intent: Intent = 'primary';
  export let messages: Record<number, string>;
  export let name: string;
  export let netlify = false;
  export let submitText = 'Envoyer';
  export let submitTextDisabled = 'Envoi en cours...';
  export let validate: any;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
	export let cSubmit = '';

  // VARS ==================================================================================================================================
  let alert: {isSuccess: boolean; message: string} | undefined;

  $: netlifyProps = netlify ? {netlify: true, 'netlify-honeypot': 'spammy'} : {};
  $: felte = createForm({validate, onSuccess: (response) => handleResponse(response), onError: (error) => handleResponse(error)});
  $: ({form, reset, ...formState} = felte);

  // METHODS ===============================================================================================================================
  const handleResponse = (value: unknown) => {
    const status = value instanceof FelteSubmitError ? value.response.status : (value as Response).status;
    reset();
    alert = {isSuccess: status === 200, message: messages[status] ?? 'Une erreur est survenue. Veuillez réessayer ultérieurement.'};
    setTimeout(() => (alert = undefined), 3000);
  };
</script>
