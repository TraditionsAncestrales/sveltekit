<script lang="ts" module>
  // STYLES ********************************************************************************************************************************
  export const TITLE = tv({
    slots: {
      ROOT: `relative inline-flex`,
      STAIN: `absolute left-0`,
      TEXT: `font-heading relative inline-flex uppercase`,
    },
  });

  const { ROOT, STAIN, TEXT } = TITLE();

  // TYPES *********************************************************************************************************************************
  export type TitleProps = {
    class?: Partial<(typeof TITLE)["slots"]> | string;
    text?: string;
  };
</script>

<script lang="ts">
  import { tv } from "tailwind-variants";
  import StainIcon from "~icons/ta/stain";

  // PROPS ***********************************************************************************************************************************
  let { class: classes = {}, text }: TitleProps = $props();

  // VARS **********************************************************************************************************************************
  let C = $derived(typeof classes === "string" ? { ROOT: classes } : classes);
</script>

{#if text}
  <div class={ROOT({ className: C.ROOT })}>
    <StainIcon width="100%" height="100%" class={STAIN({ className: C.STAIN ?? "-top-1 text-primary-300" })} />
    <h3 class={TEXT({ className: C.TEXT ?? "px-6 py-2 text-3xl" })}>{text}</h3>
  </div>
{/if}
