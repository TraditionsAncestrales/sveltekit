<UiSection class="relative">
  <UiImg image={image} fit="cover" height={596} class="absolute inset-0" />
  <UiTitle slot="header" title="Témoignages" class="z-10" />
  <div class="h-[28rem] w-full relative"><TestimonyItems {items} /></div>
</UiSection>

<script lang="ts">
  import type {TestimonySectionP} from '~/schemas/ui';
  import TestimonyItems from './testimony-items.svelte';
  import UiImg from './ui-img.svelte';
  import UiSection from './ui-section.svelte';
  import UiTitle from './ui-title.svelte';

  // PROPS ===================================================================================================================================
  export let testimonies: TestimonySectionP['testimonies'];

  // VARS ===================================================================================================================================
  $: ({image, items} = testimonies);
</script>
