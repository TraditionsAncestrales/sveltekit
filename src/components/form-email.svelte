<FormControl {form} {id} {intent} {label} {name} class={cEl}>
  <input {id} {name} type="email" {placeholder} required class="{INPUT({touched: $touched[name]})} {cInput}" />
</FormControl>

<script lang="ts">
  import type {FormEmailP} from '~/schemas/ui';
  import {INPUT} from '~/styles/ui';
  import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let form: FormEmailP['form'];
  export let id: FormEmailP['id'];
  export let intent: FormEmailP['intent'] = 'primary';
  export let label: FormEmailP['label'] = undefined;
  export let name: FormEmailP['name'];
  export let placeholder: FormEmailP['placeholder'] = undefined;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================
  $: ({touched} = form);
</script>
