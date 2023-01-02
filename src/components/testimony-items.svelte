{#key item}
  <div in:fly={{y: 400, duration: 1000}} out:fly={{y: -400, duration: 1000}} class={cEl}>
    <article class="max-w-4xl">
      <h5 class="mb-8 text-3xl italic font-bold">{item.title}</h5>
      <p class="mb-4 italic">{item.content}</p>
      <p class="font-bold">{item.author}</p>
    </article>
  </div>
{/key}

<script lang="ts">
  import {onMount} from 'svelte';
  import {fly} from 'svelte/transition';
  import type {Testimony} from '~/schemas';

  // PROPS =================================================================================================================================
  export let items: Testimony[];

  // STYLES =================================================================================================================================
  const cEl = 'absolute inset-0 flex-1 flex flex-col items-center justify-center text-center';

  // VARS ==================================================================================================================================
  let selected = 0;
  $: item = items[selected];

  onMount(() => {
    const interval = setInterval(() => (selected = (selected + 1) % items.length), 6000);
    return () => clearInterval(interval);
  });
</script>
