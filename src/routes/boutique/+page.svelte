<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type ShopPageProps = { data: PageServerData };
</script>

<script lang="ts">
  import RecordsItems from "@/components/records-items.svelte";
  import type { PageServerData } from "./$types";

  // PROPS *********************************************************************************************************************************
  let { data }: ShopPageProps = $props();
</script>

<RecordsItems title="Produit" items={data.products} border="all" intent="light">
  {#snippet None()}
    <p>Il n'y a actuellement aucun produit dans la boutique.</p>
  {/snippet}
</RecordsItems>
