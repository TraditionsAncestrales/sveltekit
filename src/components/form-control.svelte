<div class="mb-2 pb-6 w-full relative {cEl}">
  {#if label}<label for={id}>{label}</label>{/if}
  <slot />
  <label for={id} class="absolute left-1 bottom-0 text-sm {intent === 'primary' ? 'text-red-600' : 'text-red-300'}">{error}</label>
</div>

<script lang="ts">
  import type {FormControlP} from '~/schemas/ui';

  // PROPS =================================================================================================================================
  export let form: FormControlP['form'];
  export let id: FormControlP['id'];
  export let intent: FormControlP['intent'];
  export let label: FormControlP['label'];
  export let name: FormControlP['name'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  $: ({errors} = form);
  $: error = $errors[name]?.[0] ?? '';
</script>
