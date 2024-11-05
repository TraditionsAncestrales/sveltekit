<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type TheTestimoniesProps = { image?: ImageData; items: Pick<TestimoniesRecord, "author" | "text" | "title">[] };
</script>

<script lang="ts">
  import { Section } from "@/components/ui/section";
  import { Title } from "@/components/ui/title";
  import type { TestimoniesRecord } from "@/lib/pocketbase/schemas";
  import type { Image as ImageData } from "@/lib/pocketbase/utils";
  import { Image } from "@unpic/svelte";
  import { fly } from "svelte/transition";

  // PROPS *********************************************************************************************************************************
  let { image, items }: TheTestimoniesProps = $props();

  // STYLES ********************************************************************************************************************************
  const cEl = "absolute inset-0 flex-1 flex flex-col items-center justify-center text-center";

  // VARS **********************************************************************************************************************************
  let selected = $state(0);
  let item = $derived(items[selected]);

  $effect(() => {
    const interval = setInterval(() => (selected = (selected + 1) % items.length), 6000);
    return () => clearInterval(interval);
  });
</script>

{#if item}
  <Section class="relative">
    {#if image}<Image {...image} breakpoints={[320]} sizes="100vw" class="absolute inset-0 h-full scale-105 blur-sm" />{/if}
    {#snippet Header()}<Title text="Témoignages" class="z-10" />{/snippet}
    <div class="relative h-[28rem] w-full">
      {#key item}
        <div in:fly={{ y: 400, duration: 1000 }} out:fly={{ y: -400, duration: 1000 }} class={cEl}>
          <article class="max-w-4xl">
            <h5 class="mb-8 text-3xl font-bold italic">{item.title}</h5>
            <div class="mb-4 italic">{@html item.text}</div>
            <p class="font-bold">{item.author}</p>
          </article>
        </div>
      {/key}
    </div>
  </Section>
{/if}
