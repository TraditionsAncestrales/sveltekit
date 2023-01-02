<UiSection asideRight border="all" intent="white">
  <UiTitle slot="header" {title} class="mb-8" />
  <UiImg slot="aside" {image} {widths} {sizes} class={cImg} />
  <UiText text={description} />
</UiSection>

<script lang="ts">
  import UiImg from '~/components/ui-img.svelte';
  import UiSection from '~/components/ui-section.svelte';
  import UiText from '~/components/ui-text.svelte';
  import UiTitle from '~/components/ui-title.svelte';
  import type {PageServerData} from './$types';

  // PROPS ===================================================================================================================================
  export let data: PageServerData;

  // STYLES ==================================================================================================================================
  const cImg = 'relative shadow-lg shadow-black/50';

  // VARS ====================================================================================================================================
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;
  const widths = [320, 448, 576, 672];
  $: ({entry} = data);
  $: ({description, image, title} = entry);
</script>
