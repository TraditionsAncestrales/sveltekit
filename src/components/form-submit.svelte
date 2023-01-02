<button type="submit" {disabled} class="{BTN({intent})} {cEl}">{disabled ? textDisabled : text}</button>

<script lang="ts">
  import type {FormSubmitP} from '~/schemas/ui';
  import {BTN} from '~/styles/ui';

  // PROPS =================================================================================================================================
  export let form: FormSubmitP['form'];
  export let intent: FormSubmitP['intent'] = 'primary';
  export let text: FormSubmitP['text'];
  export let textDisabled: FormSubmitP['textDisabled'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  $: ({isSubmitting, isValid} = form);
  $: disabled = $isSubmitting && $isValid;
</script>
