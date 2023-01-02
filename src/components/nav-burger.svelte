<button type="button" aria-controls="navbar-default" aria-expanded="false" class="{cEl} {kEl}" on:click={() => (show = !show)}>
  <span class="sr-only">Ouvrir le menu</span>
  <svg
    class="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
</button>

{#if show}<div transition:fly={{x: 200}} class="fixed right-0 bottom-0 top-16 bg-white sm:hidden">
    <ul>
      {#each menu.items as { isActive, label, to: href }}
        <li><a {href} class="{cLink}{isActive ? ' bg-primary text-white' : ''}">{label}</a></li>
      {/each}
    </ul>
  </div>{/if}

<script lang="ts">
  import {fly} from 'svelte/transition';
  import type {Menu} from '~/schemas';

  // PROPS =================================================================================================================================
  export let menu: Menu;

  // STYLES ================================================================================================================================
  let kEl = '';
  export {kEl as class};

  const cEl = `p-2 text-sm text-neutral-800 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200`;
  const cLink = 'block p-4 px-8 text-black font-bold uppercase hover:bg-primary hover:text-white';

  // VARS ==================================================================================================================================
  let show = false;
</script>
