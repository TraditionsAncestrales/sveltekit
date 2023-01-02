<ul class="flex items-center {cEl}">
  {#each leftNavs as nav}<NavItem item={nav} />{/each}
  <li>
    <a href="/">
      <LogoIcon class="mx-8 w-20 h-20 fill-neutral-800 text-primary group-data-scrolled:hidden hover:text-primary-400" />
    </a>
  </li>
  {#each rightNavs as nav}<NavItem item={nav} />{/each}
</ul>

<script lang="ts">
  import type {z} from 'zod';
  import type {zTheHeaderP} from '~/schemas/ui';
  import LogoIcon from '~icons/ta/logo';
  import NavItem from './nav-item.svelte';

  // PROPS ===================================================================================================================================
  export let menu: z.infer < typeof zTheHeaderP > ['menu'];

  // VARS ====================================================================================================================================
  $: leftNavs = menu.items.slice(0, Math.ceil(0.5 * menu.items.length));
  $: rightNavs = menu.items.slice(Math.ceil(0.5 * menu.items.length));

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
