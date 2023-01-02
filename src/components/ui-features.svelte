{#if features}<dl class="w-full p-4 {cElBg} {cEl}">
    {#each features as { key, value }}
      <div class="flex gap-2">
        <dd class="flex-none font-bold">{key} :</dd>
        <dt>{value}</dt>
      </div>{/each}
  </dl>{/if}

<script lang="ts">
  import type {UiFeaturesP} from '~/schemas/ui';

  // PROPS ===================================================================================================================================
  export let features: UiFeaturesP['features'];
  export let intent: UiFeaturesP['intent'] = 'white';

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
  $: cElBg = intent === 'white' ? 'bg-primary-200' : 'bg-white/25';
</script>
