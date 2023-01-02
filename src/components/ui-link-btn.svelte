<a {href} class="{BTN({intent})} {cEl}">{text}</a>

<script lang="ts">
  import type {UiLinkBtnP} from '~/schemas/ui';
  import {BTN} from '~/styles/ui';

  // PROPS ===================================================================================================================================
  export let href: UiLinkBtnP['href'];
  export let intent: UiLinkBtnP['intent'] = 'primary';
  export let text: UiLinkBtnP['text'];

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
