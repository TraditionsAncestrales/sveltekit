<script lang="ts" module>
  // TYPES ***********************************************************************************************************************************
  export type FeaturesProps = { class?: ClassValue; features?: Feature[]; intent?: Intent };
</script>

<script lang="ts">
  import type { Feature } from "@/lib/pocketbase/utils";
  import { cn } from "@/lib/utils";
  import type { Intent } from "@/styles/ui";
  import type { ClassValue } from "tailwind-variants";

  // PROPS ***********************************************************************************************************************************
  let { class: className, features = [], intent = "white" }: FeaturesProps = $props();
</script>

{#if features.length > 0}
  <dl class={cn("w-full p-4", intent === "white" ? "bg-primary/20" : "bg-white/25", className)}>
    {#each features as { href, key, value }}<div class="flex gap-2">
        <dd class="flex-none font-bold">{key} :</dd>
        <dt>
          {#if href}<a {href} class="hover:underline">{value}</a>{:else}{value}{/if}
        </dt>
      </div>{/each}
  </dl>
{/if}
