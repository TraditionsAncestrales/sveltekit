<FormControl {form} {id} {intent} {label} {name} class={cEl}>
  <input {id} {name} required class="{INPUT({touched: $touched[name]})} {cInput}" />
</FormControl>

<script lang="ts">
  import type {FormTextP} from '~/schemas/ui';
  import {INPUT} from '~/styles/ui';
  import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let form: FormTextP['form'];
  export let id: FormTextP['id'];
  export let intent: FormTextP['intent'] = 'primary';
  export let label: FormTextP['label'];
  export let name: FormTextP['name'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================
  $: ({touched} = form);
</script>
