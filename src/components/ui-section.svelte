{#if hasBorderTop}<div class="{cBorder} -mt-16" />{/if}
<section class="{cEl} {kEl}">
  <div class={expanded ? 'w-full' : 'container mx-auto'}>
    {#if $$slots.header}<div class="{expanded ? 'mx-4' : ''} {cHeader}"><slot name="header" /></div>{/if}
    <div class="w-full flex flex-col items-center gap-8 md:flex-row md:items-start lg:gap-12">
      {#if $$slots.aside}<aside class="empty:hidden {asideRight ? 'md:order-2' : ''} {cAside} {kAside}"><slot name="aside" /></aside>{/if}
      <div class="flex-1 w-full flex flex-col gap-8 items-start"><slot /></div>
    </div>
  </div>
</section>
{#if hasBorderBottom}<div class="{cBorder} rotate-180" />{/if}

<script lang="ts">
  import type {UiSectionP} from '~/schemas/ui';
  import {bg} from '~/styles/ui';

  // PROPS ===================================================================================================================================
  export let asideRight: UiSectionP['asideRight'] = false;
  export let border: NonNullable<UiSectionP['border']> = 'none';
  export let expanded: UiSectionP['expanded'] = false;
  export let intent: NonNullable<UiSectionP['intent']> = 'white';

  // VARS ====================================================================================================================================
  $: hasBorderBottom = ['all', 'bottom'].includes(border);
  $: hasBorderTop = ['all', 'top'].includes(border);

  // STYLES ==================================================================================================================================
  let [cHeader, kAside, kBorder, kEl] = ['', '', '', ''];
  export {cHeader, kAside as cAside, kBorder as cBorder, kEl as class};

  const cAside = `flex-none w-full flex flex-col gap-8 max-w-xl md:max-w-xs lg:max-w-md xl:max-w-xl 2xl:max-w-2xl`;
  $: cBorder = ['relative w-full h-16 [mask-image:url(/border.svg)]', bg(intent), kBorder].join(' ');
  $: cEl = [`overflow-hidden py-12`, bg(intent), {'pt-4': hasBorderTop}, {'pb-4': hasBorderBottom}, {'px-6 md:px-12': !expanded}].join(' ');
</script>
