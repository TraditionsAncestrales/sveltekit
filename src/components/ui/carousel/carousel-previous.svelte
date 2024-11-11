<script lang="ts">
  import { cn } from "@/lib/utils.js";
  import type { WithoutChildren } from "bits-ui";
  import ArrowLeft from "~icons/bi/chevron-left";
  import { Button, type ButtonProps } from "../button";
  import { getEmblaContext } from "./context.js";

  let { ref = $bindable(null), class: className, intent, ...restProps }: WithoutChildren<ButtonProps> = $props();

  const emblaCtx = getEmblaContext("<Carousel.Previous/>");
</script>

<Button
  {intent}
  class={cn(
    "absolute touch-manipulation rounded-full",
    emblaCtx.orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
    className,
  )}
  disabled={!emblaCtx.canScrollPrev}
  onclick={emblaCtx.scrollPrev}
  onkeydown={emblaCtx.handleKeyDown}
  {...restProps}
  bind:ref
>
  <ArrowLeft class="size-4" />
  <span class="sr-only">Previous slide</span>
</Button>
