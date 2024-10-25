<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type RecordsItemsProps = Omit<SectionProps, "children"> & { items: Item[]; title: string; None?: Snippet };
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
  let { intent = "white", items = [], title: singular, None, ...rest }: RecordsItemsProps = $props();

  // VARS **********************************************************************************************************************************
  let hasSome = $derived(items.length > 0);
  let isSingle = $derived(items.length === 1);
  let title = $derived(`${singular}${isSingle ? "" : "s"}`);
</script>

{#if isSingle}
  {@const { features, href, image, text } = items[0]}
  <Section {intent} {...rest}>
    {#snippet Header()}<Title text={title} class="mb-8 xl:hidden" />{/snippet}
    {#snippet Aside()}<Image {...image} class="relative shadow-lg shadow-black/50" />{/snippet}
    <Title text={title} class="hidden self-start xl:inline-flex" />
    <Features {intent} {features} />
    <article>{@html text}</article>
    <a {href} class={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", class: "self-end" })}> En savoir plus </a>
  </Section>
{:else if hasSome || None}
  <Section {intent} expanded={hasSome} {...rest}>
    {#snippet Header()}<Title text={title} class="mb-8" />{/snippet}
    {#if hasSome}<RecordsCarousel {items} class="w-full" />
    {:else}{@render None?.()}{/if}
  </Section>
{/if}
