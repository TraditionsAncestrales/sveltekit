{#if image}<div class="overflow-hidden {cEl}">
    {#if border}<div class={cBorder} />{/if}
    <img {loading} alt="" class="{cImg} absolute inset-0" src={image.lqip} />
    <img {loading} alt="" class="{cImg} relative" {...props} />
  </div>{/if}

<script lang="ts">
  import type {UiImgP} from '~/schemas/ui';
  import {fromSanityImage} from '~/server/sanity';

  // PROPS ===================================================================================================================================
  export let border: UiImgP['border'] = undefined;
  export let borderRight: UiImgP['borderRight'] = undefined;
  export let fit: UiImgP['fit'] = undefined;
  export let height: UiImgP['height'] = undefined;
  export let image: UiImgP['image'] = undefined;
  export let loading: UiImgP['loading'] = 'lazy';
  export let ratio: UiImgP['ratio'] = undefined;
  export let sizes: UiImgP['sizes'] = undefined;
  export let widths: UiImgP['widths'] = [360, 640, 728, 1024, 1280, 1536, 1920];

  // VARS ====================================================================================================================================
  $: props = fromSanityImage({height, image, ratio, sizes, widths});

  // STYLES ================================================================================================================================
  let [cEl, kBorder, kImg] = ['', '', ''];
  export {cEl as class, kBorder as cBorder, kImg as cImg};

  $: cBorderImageSource = border === 1 ? '[border-image-source:url(/deco1.png)]' : '[border-image-source:url(/deco2.png)]';
  $: cBorderImage = `[border-image-repeat:round] [border-image-slice:60_fill] [border-image-width:60px] ${cBorderImageSource}`;
  $: cBorder = ['absolute inset-0 translate-y-10', borderRight ? 'translate-x-10' : '-translate-x-10', cBorderImage, kBorder].join(' ');
  $: cImg = ['w-full h-full', fit === 'contain' ? 'object-contain' : fit ? 'object-cover' : '', kImg].join(' ');
</script>
