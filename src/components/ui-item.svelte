<li class="bg-white flex flex-col {cEl}">
  <UiImg {image} widths={[384]} ratio={3 / 2} sizes="24rem" fit="cover" class="flex-none relative" cImg="aspect-[3/2]" />
  <div class="flex-1 flex flex-col gap-4 p-4 px-6 sm:px-8">
    <h4 class={TITLE()}>{title}</h4>
    <UiFeatures {features} intent="white" />
    <UiText text={excerpt} />
    <div class="flex-1" />
    <UiLinkBtn {href} text="En savoir plus" class="self-end" />
  </div>
</li>

<script lang="ts">
  import type {UiItemP} from '~/schemas/ui';
  import {TITLE} from '~/styles/ui';
  import UiFeatures from './ui-features.svelte';
  import UiImg from './ui-img.svelte';
  import UiLinkBtn from './ui-link-btn.svelte';
  import UiText from './ui-text.svelte';

  // PROPS ===================================================================================================================================
  export let item: UiItemP['item'];

  // VARS ====================================================================================================================================
  $: ({excerpt, features, href, image, title} = item);

  // STYLES ==================================================================================================================================
  let cEl = '';
	export {cEl as class};
</script>
