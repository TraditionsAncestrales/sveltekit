<script lang="ts" module>
  // STYLES **********************************************************************************************************************************
  export const SECTION = tv({
    slots: {
      ASIDE: `empty:hidden flex-none w-full flex flex-col gap-8 md:max-w-xs lg:max-w-md xl:max-w-xl 2xl:max-w-2xl`,
      BORDER: `relative w-full h-16 [mask-image:url(/border.svg)]`,
      CONTENT: `w-full flex flex-col items-center gap-8 md:flex-row md:items-start lg:gap-12`,
      HEADER: ``,
      MAIN: `flex-1 w-full flex flex-col gap-8 items-start`,
      ROOT: `overflow-hidden py-12`,
      WRAPPER: ``,
    },
    variants: {
      asideRight: {
        true: { ASIDE: `md:order-2` },
      },
      border: {
        all: { ROOT: `py-4` },
        bottom: { ROOT: `pb-4` },
        none: {},
        top: { ROOT: `pt-4` },
      },
      expanded: {
        true: { HEADER: `mx-4`, WRAPPER: `w-full` },
        false: { ROOT: `px-6 md:px-12`, WRAPPER: `container mx-auto` },
      },
      intent: {
        dark: { BORDER: `bg-neutral-800`, ROOT: `bg-neutral-800` },
        light: { BORDER: `bg-neutral-200`, ROOT: `bg-neutral-200` },
        primary: { BORDER: `bg-primary`, ROOT: `bg-primary` },
        secondary: { BORDER: `bg-neutral-600`, ROOT: `bg-neutral-600` },
        white: { BORDER: `bg-white`, ROOT: `bg-white` },
      },
    },
  });

  const { ASIDE, BORDER, CONTENT, HEADER, MAIN, ROOT, WRAPPER } = SECTION();

  // TYPES ***********************************************************************************************************************************
  export type SectionProps = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    asideRight?: boolean;
    border?: "all" | "bottom" | "none" | "top";
    class?: Partial<(typeof SECTION)["slots"]> | string;
    expanded?: boolean;
    intent?: Intent;
    Aside?: Snippet;
    children: Snippet;
    Header?: Snippet;
  };
</script>

<script lang="ts">
  import type { Intent } from "@/styles/ui";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { tv } from "tailwind-variants";

  // PROPS *********************************************************************************************************************************
  let {
    asideRight = false,
    border = "none",
    class: classes = {},
    expanded = false,
    intent = "white",
    Aside,
    children,
    Header,
    "data-theme": theme,
  }: SectionProps = $props();

  // VARS **********************************************************************************************************************************
  let C = $derived(typeof classes === "string" ? { ROOT: classes } : classes);
  let hasBorderBottom = $derived(["all", "bottom"].includes(border));
  let hasBorderTop = $derived(["all", "top"].includes(border));
</script>

{#if hasBorderTop}<div class={BORDER({ intent, class: ["-mt-16", C.BORDER] })}></div>{/if}
<section data-theme={theme} class={ROOT({ border, expanded, intent, class: C.ROOT })}>
  <div class={WRAPPER({ expanded, class: C.WRAPPER })}>
    {#if Header}<div class={HEADER({ expanded, class: C.HEADER })}>{@render Header()}</div>{/if}
    <div class={CONTENT({ class: C.CONTENT })}>
      {#if Aside}<aside class={ASIDE({ asideRight, class: C.ASIDE })}>{@render Aside()}</aside>{/if}
      <div class={MAIN({ class: C.MAIN })}>{@render children()}</div>
    </div>
  </div>
</section>
{#if hasBorderBottom}<div class={BORDER({ intent, class: ["rotate-180", C.BORDER] })}></div>{/if}
