<UiItems ignoreSingle {items} title="Boutique" border="all" intent="light">
  <p>Il n'y a actuellement aucun produit dans la boutique.</p>
</UiItems>

<script lang="ts">
  import UiItems from '~/components/ui-items.svelte';
  import type {PageServerData} from './$types';

  // PROPS ===================================================================================================================================
  export let data: PageServerData;

  // VARS ====================================================================================================================================
  $: ({items} = data);
</script>
