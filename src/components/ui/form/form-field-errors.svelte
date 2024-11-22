<script lang="ts">
  import { cn } from "@/lib/utils.js";
  import type { WithoutChild } from "bits-ui";
  import * as FormPrimitive from "formsnap";
  import { slide } from "svelte/transition";

  let {
    ref = $bindable(null),
    class: className,
    errorClasses,
    children: childrenProp,
    ...restProps
  }: WithoutChild<FormPrimitive.FieldErrorsProps> & {
    errorClasses?: string | undefined | null;
  } = $props();
</script>

<FormPrimitive.FieldErrors bind:ref class={cn("text-sm font-medium text-destructive", className)} {...restProps}>
  {#snippet children({ errors, errorProps })}
    {#if childrenProp}
      {@render childrenProp({ errors, errorProps })}
    {:else if errors.length > 0}
      <div transition:slide {...errorProps} class={cn(errorClasses)}>{errors.at(-1)}</div>
    {/if}
  {/snippet}
</FormPrimitive.FieldErrors>
