<script lang="ts">
  import { cn } from "@/lib/utils.js";
  import type { WithoutChildren } from "bits-ui";
  import ArrowRight from "~icons/bi/chevron-right";
  import { Button, type ButtonProps } from "../button";
  import { getEmblaContext } from "./context.js";

  let { ref = $bindable(null), class: className, intent, ...restProps }: WithoutChildren<ButtonProps> = $props();

  const emblaCtx = getEmblaContext("<Carousel.Next/>");
</script>

<Button
  {intent}
  class={cn(
    "absolute touch-manipulation rounded-full",
    emblaCtx.orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
    className,
  )}
  disabled={!emblaCtx.canScrollNext}
  onclick={emblaCtx.scrollNext}
  onkeydown={emblaCtx.handleKeyDown}
  bind:ref
  {...restProps}
>
  <ArrowRight class="size-4" />
  <span class="sr-only">Next slide</span>
</Button>
