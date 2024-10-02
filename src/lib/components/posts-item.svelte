<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type PostsItemProps = Omit<SectionProps, "children"> & { post?: Item };
</script>

<script lang="ts">
  import { Image } from "@unpic/svelte";
  import type { Item } from "@/lib/pocketbase/utils";
  import { Section, type SectionProps } from "./ui/section";
  import { Title } from "./ui/title";
  import { BUTTON } from "./ui/button";

  // PROPS *********************************************************************************************************************************
  let { intent = "white", post, ...rest }: PostsItemProps = $props();

  // VARS **********************************************************************************************************************************
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;
  // const widths = [320, 448, 576, 672];
</script>

{#if post}
  {@const { href, image, text, title } = post}
  <Section {intent} {...rest}>
    {#snippet Header()}<Title text={title} class="mb-8 xl:hidden" />{/snippet}
    {#snippet Aside()}<Image {...image} width={672} {sizes} class="relative shadow-lg shadow-black/50" />{/snippet}
    <Title text={title} class="hidden self-start xl:inline-flex" />
    <article>{@html text}</article>
    <a {href} class={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", className: "self-end" })}> En savoir plus </a>
  </Section>
{/if}
