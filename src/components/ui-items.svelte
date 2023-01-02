{#if hasSome}
  <UiSection {intent} expanded={!single} {...$$restProps}>
    <UiTitle slot="header" {title} class="mb-8 {single ? 'xl:hidden' : ''}" />
    <svelte:fragment slot="aside">
      {#if single}<UiImg image={single.image} {sizes} {widths} class={cImg} />{/if}
    </svelte:fragment>
    {#if single}
      <UiTitle {title} class="hidden self-start xl:inline-flex" />
      <UiFeatures {intent} features={single.features} />
      <UiText text={single.excerpt} />
      <UiLinkBtn href={single.href} text="En savoir plus" intent={btnIntent} class="self-end" />
    {:else}
      <Splide {options} on:mounted={onResize} on:resize={onResize} class="w-full">
        {#each items as { excerpt, features, href, image, title }}
          <SplideSlide class="bg-white flex flex-col mb-2 splide__slide shadow-md">
            <UiImg {image} widths={[384]} ratio={3 / 2} sizes="24rem" fit="cover" class="flex-none relative" cImg="aspect-[3/2]" />
            <div class="flex-1 flex flex-col gap-4 p-4 px-6 sm:px-8">
              <h4 class={TITLE()}>{title}</h4>
              <UiFeatures {features} intent="white" />
              <UiText text={excerpt} />
              <div class="flex-1" />
              <UiLinkBtn {href} text="En savoir plus" class="self-end" />
            </div>
          </SplideSlide>
        {/each}
      </Splide>
    {/if}
    {#if !hasSome}<slot />{/if}
  </UiSection>
{/if}

<script lang="ts">
  import {Splide, SplideSlide} from '@splidejs/svelte-splide';
  import type {ConsultationItemsP, Intent} from '~/schemas/ui';
  import {TITLE} from '~/styles/ui';
  import UiFeatures from './ui-features.svelte';
  import UiImg from './ui-img.svelte';
  import UiLinkBtn from './ui-link-btn.svelte';
  import UiSection from './ui-section.svelte';
  import UiText from './ui-text.svelte';
  import UiTitle from './ui-title.svelte';

  // PROPS =================================================================================================================================
  export let ignoreSingle = false;
  export let intent: ConsultationItemsP['intent'] = 'white';
  export let items: ConsultationItemsP['items'] = [];
  export let singular: string | undefined = undefined;
  export let title: string | undefined = undefined;

  // STYLES ================================================================================================================================
  const cImg = 'relative shadow-lg shadow-black/50';

  // VARS ==================================================================================================================================
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;
  const widths = [320, 448, 576, 672];

  let btnIntent: Intent;
  let isOverflow = false;

  $: options = {
    arrows: isOverflow,
    breakpoints: {640: {fixedWidth: '100%'}},
    clones: isOverflow ? undefined : 0,
    drag: isOverflow,
    fixedWidth: '24rem',
    gap: '2rem',
    padding: '1rem',
    pagination: false,
    type: 'loop',
  };

  $: hasSome = items.length > 0;
  $: single = !ignoreSingle && items.length === 1 ? items[0] : undefined;
  $: title = title ?? (singular ? `${singular}${single ? '' : 's'}` : single?.title);
  $: btnIntent = intent === 'primary' ? 'secondary' : 'primary';

  // EVENTS ================================================================================================================================
  const onResize = ({detail: {splide}}: any) => {
    if (isOverflow === splide?.Components?.Layout.isOverflow()) return;
    isOverflow = !isOverflow;
    splide.go(0);
  };
</script>

<style>
  :global(.splide__arrow) {
    background-color: rgb(var(--color-primary)) !important;
  }

  :global(.splide__arrow svg) {
    fill: white !important;
  }

  :global(.splide:not(.is-overflow) .splide__arrows) {
    display: none;
  }

  :global(.splide:not(.is-overflow) .splide__list) {
    justify-content: center;
  }

  :global(.splide:not(.is-overflow) .splide__slide:last-child) {
    margin-right: 0 !important;
  }
</style>
