<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type CarouselProps = { class?: string; externalLink?: boolean; items: Item[]; removeStale?: boolean };
</script>

<script lang="ts">
  import type { Item } from "@/lib/pocketbase/utils";
  import { cn } from "@/lib/utils";
  import { TITLE } from "@/styles/ui";
  import { Image } from "@unpic/svelte";
  import { BUTTON } from "./ui/button";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
  import type { CarouselAPI } from "./ui/carousel/context";
  import { Features } from "./ui/features";

  // PROPS *********************************************************************************************************************************
  let { class: className, externalLink = false, items, removeStale = false }: CarouselProps = $props();

  // VARS **********************************************************************************************************************************
  let api = $state<CarouselAPI>();
  let justifyCenter = $state(false);
  let target = $derived(externalLink ? "_blank" : "_self");
  let filteredItems = $derived(removeStale ? items.filter(({ stale }) => stale && stale >= new Date().toISOString()) : items);
  let isSet = $state(false);

  // CYCLE *********************************************************************************************************************************
  $effect(() => {
    if (!api) return;
    justifyCenter = api.scrollSnapList().length === 1;
    isSet = true;
    api.on("reInit", ({ scrollSnapList }) => (justifyCenter = scrollSnapList().length === 1));
  });
</script>

<Carousel setApi={(emblaApi) => (api = emblaApi)} opts={{ loop: true }} class={className}>
  <CarouselContent class={cn("opacity-0 transition-opacity duration-700", { "justify-center": justifyCenter, "opacity-100": isSet })}>
    {#each filteredItems as { features, href, image, slug, text, title } (slug)}
      <CarouselItem class="mb-2 max-w-96">
        <div class="flex h-full w-full flex-col bg-white shadow-md" data-slug={slug}>
          <Image {...image} height={256} width={384} breakpoints={[384, 768]} sizes="24rem" class="flex-none" />
          <div class="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
            <h4 class={TITLE()}>{title}</h4>
            <Features {features} intent="white" />
            <article class="prose prose-p:my-1 prose-p:leading-normal">{@html text}</article>
            <div class="flex-1"></div>
            <a {href} {target} class={BUTTON({ className: "self-end" })}> En savoir plus </a>
          </div>
        </div>
      </CarouselItem>
    {/each}
  </CarouselContent>
  <CarouselPrevious class="left-4" />
  <CarouselNext class="right-4" />
</Carousel>
