<li class="mx-1 {cEl}">
  <a href={item.to} class="{cLink}, {item.isActive ? 'bg-primary text-white' : ''}">{item.label}</a>
</li>

<script lang="ts">
  import type {z} from 'zod';
  import type {zNavItemP} from '~/schemas/ui';

  // PROPS ===================================================================================================================================
  export let item: z.infer<typeof zNavItemP>['item'];

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
  const cLink = 'text-xs font-bold p-2 uppercase rounded group-data-top:text-white hover:bg-primary hover:text-white';
</script>
