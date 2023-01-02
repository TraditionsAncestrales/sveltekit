{#if hasAny}
  <div class="-my-16 lg:flex">
    {#each items as { href, excerpt, image, slug, title }, i}
      <UiSection intent="primary" class="theme-{slug} lg:hidden {i === 0 ? 'pt-16' : ''} {i === items.length - 1 ? 'pb-20' : ''}">
        <UiTitle slot="header" {title} class="mb-8" />
        <UiImg
          slot="aside"
          {image}
          fit="cover"
          widths={[320, 576]}
          sizes="(min-width: 768px) 20rem, (min-width: 640px) 36rem, 100vw"
          ratio={3 / 2}
          class={cImg}
        />
        <UiText text={excerpt} />
        <UiLinkBtn {href} text="En savoir plus" intent="secondary" class="self-end" />
      </UiSection>

      <a {href} class="theme-{slug} {cItem}">
        <UiImg {image} fit="cover" widths={[256, 512]} height={600} sizes="25vw" class="{cAbs} -z-20 group-hover/k:scale-105" />
        <div class="{cAbs} -z-10 translate-y-full bg-primary group-hover/k:translate-y-0">
          <div class="mt-[150px] px-4 text-center">
            <UiText text={excerpt} />
          </div>
        </div>
        <UiTitle
          {title}
          cStain="-top-2 text-primary"
          cTitle="py-6 px-12 text-4xl text-black"
          class="group-hover/k:-translate-y-[200px] transition-transform duration-500"
        />
      </a>
    {/each}
  </div>
{/if}

<script lang="ts">
  import type {KnowledgeItemsP} from '~/schemas/ui';
  import UiImg from './ui-img.svelte';
  import UiLinkBtn from './ui-link-btn.svelte';
  import UiSection from './ui-section.svelte';
  import UiText from './ui-text.svelte';
  import UiTitle from './ui-title.svelte';

  // PROPS ===================================================================================================================================
  export let items: KnowledgeItemsP['items'];

  // STYLES ==================================================================================================================================
  const cAbs = `absolute inset-0 w-full h-full transition-transform duration-500`;
  const cItem = `hidden w-1/4 h-[600px] relative overflow-hidden group/k flex-col justify-center items-center lg:flex`;
  const cImg = `relative aspect-[3/2] shadow-lg shadow-black/50`;

  // VARS ====================================================================================================================================
  $: hasAny = items?.length > 0;
</script>
