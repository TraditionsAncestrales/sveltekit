<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type KnowledgeCollectionPageProps = { data: PageServerData };
</script>

<script lang="ts">
  import { Features } from "@/components/ui/features";
  import { Section } from "@/components/ui/section";
  import { Title } from "@/components/ui/title";
  import { Image } from "@unpic/svelte";
  import type { PageServerData } from "./$types";

  // PROPS *********************************************************************************************************************************
  let { data }: KnowledgeCollectionPageProps = $props();

  // VARS **********************************************************************************************************************************
  let { features, image, text, title } = $derived(data.single!);
  let sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;
</script>

<Section asideRight border="all" intent="white">
  {#snippet Header()}<Title text={title} class="mb-8" />{/snippet}
  {#snippet Aside()}
    {#if image}<Image {...image} width={672} {sizes} class="relative shadow-lg shadow-black/50" />{/if}
    <Features {features} />
  {/snippet}
  <article>{@html text}</article>
</Section>
