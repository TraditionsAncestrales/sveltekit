<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type ButtonProps = WithElementRef<HTMLButtonAttributes> & WithElementRef<HTMLAnchorAttributes> & { intent?: Intent };

  // STYLES ********************************************************************************************************************************
  export const btnIntent = (intent: Intent) => [bg(intent), hoverBg(intent), disabledBg(intent), focusRing(intent)].join(" ");

  export const BUTTON = tv({
    base: `flex items-center font-medium rounded px-5 py-2.5 
    disabled:cursor-not-allowed
    focus:ring-4 focus:outline-none`,
    variants: {
      intent: {
        dark: [text("white"), btnIntent("dark")],
        light: [text("dark"), btnIntent("light")],
        primary: [text("white"), btnIntent("primary")],
        secondary: [text("white"), btnIntent("secondary")],
        white: [text("dark"), btnIntent("white")],
      },
    },
    defaultVariants: { intent: "primary" },
  });
</script>

<script lang="ts">
  import { cn } from "@/lib/utils.js";
  import { bg, disabledBg, focusRing, hoverBg, text, type Intent } from "@/styles/ui";
  import type { WithElementRef } from "bits-ui";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { tv } from "tailwind-variants";

  let {
    class: className,
    intent,
    ref = $bindable(null),
    href = undefined,
    type = "button",
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a bind:this={ref} class={cn(BUTTON({ intent, className }))} {href} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button bind:this={ref} class={cn(BUTTON({ intent, className }))} {type} {...restProps}>
    {@render children?.()}
  </button>
{/if}
