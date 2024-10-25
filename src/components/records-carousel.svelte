<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type CarouselProps = { items: Item[]; class?: string };
</script>

<script lang="ts">
  import type { Item } from "@/lib/pocketbase/utils";
  import { cn } from "@/lib/utils";
  import { TITLE } from "@/styles/ui";
  import Splide from "@splidejs/splide";
  import "@splidejs/splide/css";
  import { Image } from "@unpic/svelte";
  import { BUTTON } from "./ui/button";
  import { Features } from "./ui/features";

  // PROPS *********************************************************************************************************************************
  let { class: className, items }: CarouselProps = $props();

  // VARS **********************************************************************************************************************************
  let _: HTMLDivElement;

  $effect(() => {
    const splide = new Splide(_, {
      arrows: false,
      drag: false,
      fixedWidth: "24rem",
      gap: "2rem",
      padding: "1rem",
      pagination: false,
      type: "loop",
    });

    splide.on("overflow", (isOverflow) => {
      splide.go(0);
      splide.options = { arrows: isOverflow, drag: isOverflow, clones: isOverflow ? undefined : 0 };
    });

    splide.mount();

    return () => splide.destroy();
  });
</script>

<div bind:this={_} role="group" aria-label="Carousel" class={cn("splide", className)}>
  <div class="splide__track">
    <ul class="splide__list">
      {#each items as { features, href, image, slug, text, title }}
        <li class="splide__slide mb-2 flex flex-col bg-white shadow-md" data-slug={slug}>
          <Image {...image} width={384} aspectRatio={3 / 2} sizes="24rem" objectFit="cover" class="relative aspect-[3/2] flex-none" />
          <div class="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
            <h4 class={TITLE()}>{title}</h4>
            <Features {features} intent="white" />
            <article>{@html text}</article>
            <div class="flex-1"></div>
            <a {href} class={BUTTON({ className: "self-end" })}>En savoir plus</a>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  :global(.splide__arrow) {
    background-color: rgb(var(--primary)) !important;
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
