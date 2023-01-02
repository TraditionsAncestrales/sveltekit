<div class="w-full flex items-center justify-center bg-cover bg-center font-bold relative {cEl}">
  <UiImg {image} loading="eager" fit="cover" class="absolute inset-0 w-full h-full" />
  <div class="relative py-40 text-white text-center uppercase tracking-widest">
    <div class="absolute inset-0 bg-primary {cMask}" />
    <h1 class="my-2 relative text-4xl sm:text-7xl max-w-2xl">{title}</h1>
    <h2 class="relative text-xs">{subtitle}</h2>
  </div>
</div>

<script lang="ts">
  import type {TheHeroP} from '~/schemas/ui';
  import UiImg from './ui-img.svelte';

  // PROPS ===================================================================================================================================
  export let image: TheHeroP['image'];
  export let subtitle: TheHeroP['subtitle'];
  export let title: TheHeroP['title'];

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
  const cMask = `[mask-image:url(/splash.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]`;
</script>
