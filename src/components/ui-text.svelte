<article>
  <PortableText value={text} />
</article>

<script lang="ts">
  import {PortableText} from '@portabletext/svelte';
  import type {UiTextP} from '~/schemas/ui';
  //import UiTextBlock from './ui-text-block.astro';
  //mport UiTextMark from './ui-text-mark.astro';

  // PROPS ==================================================================================================================================
  export let text: UiTextP['text'];

  //const components = {block: UiTextBlock, mark: UiTextMark};
</script>
