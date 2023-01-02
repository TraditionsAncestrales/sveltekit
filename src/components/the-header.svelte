<div class="bg-white p-2 sm:bg-transparent group-data-scrolled:bg-white group-data-scrolled:shadow-lg {cEl}">
  <nav class="mx-auto container flex items-center justify-between sm:justify-center sm:group-data-scrolled:justify-between">
    <TheLogo class="sm:hidden group-data-scrolled:flex" />
    <NavBurger {menu} class="sm:hidden" />
    <NavItems {menu} class="hidden sm:flex" />
  </nav>
</div>

<script lang="ts">
  import type {z} from 'zod';
  import type {zTheHeaderP} from '~/schemas/ui';
  import NavBurger from './nav-burger.svelte';
  import NavItems from './nav-items.svelte';
  import TheLogo from './the-logo.svelte';

  // PROPS ===================================================================================================================================
  export let menu: z.infer<typeof zTheHeaderP>['menu'];

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
