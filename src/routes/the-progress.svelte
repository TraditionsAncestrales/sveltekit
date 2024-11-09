<script lang="ts" module>
  export type TheProgressProps = ProgressProps;
</script>

<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { Progress, type ProgressProps } from "@/components/ui/progress";
  import { cn } from "@/lib/utils";

  // PROPS *********************************************************************************************************************************
  let { class: className }: ProgressProps = $props();

  // VARS **********************************************************************************************************************************
  let [completer, starter, updater]: NodeJS.Timeout[] = [];
  let isVisible = $state(false);
  let value = $state(0);

  // CYCLE *********************************************************************************************************************************
  beforeNavigate((nav) => {
    clear();
    value = 8;
    if (!nav.to?.route.id) return;
    starter = setTimeout(() => {
      isVisible = true;
      updater = setInterval(() => {
        let step = [0, 0.5, 1, 2][Math.floor(Math.random() * 4)] ?? 0;
        if (value < 20) step += 10;
        else if (value < 50) step += 4;
        else if (value < 80) step += 2;
        else step += 0.5;
        value = Math.min(value + step, 99.4);
      }, 700);
    }, 150);
  });

  afterNavigate(() => {
    clear();
    if (!isVisible) return;
    value = 100;
    completer = setTimeout(() => (isVisible = false), 700);
  });

  // METHODS *******************************************************************************************************************************
  function clear() {
    clearTimeout(starter);
    clearInterval(updater);
    clearTimeout(completer);
  }
</script>

<Progress {value} aria-label="progress" class={cn(isVisible ? "opacity-100" : "opacity-0", className)} />
