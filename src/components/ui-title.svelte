{#if title}<div class="relative inline-flex {cEl}">
    <StainIcon class="absolute left-0 w-full h-full {cStain}" />
    <h4 class="relative inline-flex font-heading uppercase {cTitle}">{title}</h4>
  </div>{/if}

<script lang="ts">
  import type {UiTitleP} from '~/schemas/ui';
  import StainIcon from '~icons/ta/stain';

  // PROPS ==================================================================================================================================
  export let title: UiTitleP['title'];

  // STYLES ==================================================================================================================================
  let [cEl, cStain, cTitle] = ['', '-top-1 text-primary-300', 'py-2 px-6 text-3xl'];
  export {cEl as class, cStain, cTitle};
</script>
