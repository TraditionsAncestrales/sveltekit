<script lang="ts" module>
  export type ProgressProps = WithoutChildrenOrChild<ProgressPrimitive.RootProps>;
</script>

<script lang="ts">
  import { cn } from "@/lib/utils.js";
  import { Progress as ProgressPrimitive, type WithoutChildrenOrChild } from "bits-ui";

  let { ref = $bindable(null), class: className, max = 100, value, ...restProps }: ProgressProps = $props();
</script>

<ProgressPrimitive.Root bind:ref class={cn("relative h-1 w-full overflow-hidden", className)} {value} {max} {...restProps}>
  <div
    class="h-full w-full flex-1 bg-primary transition-all"
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
  ></div>
</ProgressPrimitive.Root>
