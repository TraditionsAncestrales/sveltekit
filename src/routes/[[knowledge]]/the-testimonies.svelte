<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type TheTestimoniesProps = { image?: Image; items: Pick<TestimoniesRecord, "author" | "text" | "title">[] };
</script>

<script lang="ts">
  import { Section } from "@/lib/components/ui/section";
  import { Title } from "@/lib/components/ui/title";
  import type { TestimoniesRecord } from "@/lib/pocketbase/generated";
  import type { Image } from "@/lib/pocketbase/utils";
  import { Image as Img } from "@unpic/svelte";
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
    {#if image}<Img {...image} objectFit="cover" layout="fullWidth" height={596} class="absolute inset-0" />{/if}
    {#snippet Header()}<Title text="Témoignages" class="z-10" />{/snippet}
    <div class="relative h-[28rem] w-full">
      {#key item}
        <div in:fly={{ y: 400, duration: 1000 }} out:fly={{ y: -400, duration: 1000 }} class={cEl}>
          <article class="max-w-4xl">
            <h5 class="mb-8 text-3xl font-bold italic">{item.title}</h5>
            <p class="mb-4 italic">{@html item.text}</p>
            <p class="font-bold">{item.author}</p>
          </article>
        </div>
      {/key}
    </div>
  </Section>
{/if}
