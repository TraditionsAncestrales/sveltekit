<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type RecordsItemsProps = Omit<SectionProps, "children"> & {
    externalLink?: boolean;
    forceMultiple?: boolean;
    items: Item[];
    removeStale?: boolean;
    title: string;
    None?: Snippet;
  };
</script>

<script lang="ts">
  import type { Item } from "@/lib/pocketbase/utils";
  import { Image } from "@unpic/svelte";
  import type { Snippet } from "svelte";
  import RecordsCarousel from "./records-carousel.svelte";
  import { BUTTON } from "./ui/button";
  import { Features } from "./ui/features";
  import { Section, type SectionProps } from "./ui/section";
  import { Title } from "./ui/title";

  // PROPS *********************************************************************************************************************************
  let {
    externalLink = false,
    forceMultiple = false,
    intent = "white",
    items = [],
    removeStale = false,
    title: singular,
    None,
    ...rest
  }: RecordsItemsProps = $props();

  // VARS **********************************************************************************************************************************
  let hasSome = $derived(items.length > 0);
  let isSingle = $derived(items.length === 1);
  let title = $derived(`${singular}${isSingle && !forceMultiple ? "" : "s"}`);

  const imageSizes = [
    "(min-width: 1536px) 42rem",
    "(min-width: 1280px) 36rem",
    "(min-width: 1024px) 28rem",
    "(min-width: 768px) 20rem",
    "calc(100vw - 7rem - 15px)",
  ].join(", ");

  let target = $derived(externalLink ? "_blank" : undefined);
</script>

{#if isSingle && !forceMultiple}
  {@const { features, href, image, text } = items[0]}
  <Section {intent} {...rest}>
    {#snippet Header()}<Title text={title} class="mb-8 xl:hidden" />{/snippet}
    {#snippet Aside()}
      <Image {...image} breakpoints={[320, 640, 960, 1280, 1600]} sizes={imageSizes} class="relative shadow-lg shadow-black/50" />
    {/snippet}
    <Title text={title} class="hidden self-start xl:inline-flex" />
    <Features {intent} {features} />
    <article>{@html text}</article>
    <a {href} {target} class={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", class: "self-end" })}> En savoir plus </a>
  </Section>
{:else if hasSome || None}
  <Section {intent} expanded={hasSome} {...rest}>
    {#snippet Header()}<Title text={title} class="mb-8" />{/snippet}
    {#if hasSome}<RecordsCarousel {externalLink} {items} {removeStale} class="w-full" />
    {:else}{@render None?.()}{/if}
  </Section>
{/if}
