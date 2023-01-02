import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type {Image} from '~/schemas';

export const sanity = sanityClient({
  projectId: '7zo9q7sv',
  dataset: 'production',
  apiVersion: '2022-10-28',
  useCdn: true,
});

// IMAGE ===================================================================================================================================
const imageBuilder = imageUrlBuilder(sanity);

const processGap = ([w, h]: Dimensions, i: number, dimensions: Dimensions[]) => {
  const [w1, h1] = dimensions[i + 1] ?? [];
  return w1 && (w === w1 || (w1 - w <= 100 && h1 - h <= 100));
};

export const fromSanityImage = ({height, image, ratio, sizes, widths}: FromSanityImageO = {}) => {
  if (!image) return {};
  const builder = imageBuilder.image(image).fit('max').auto('format');
  const {aspectRatio: imgRatio, height: imgH, width: imgW} = image.dimensions;

  const fromDpi = (dpi = 1): Dimensions[] => (widths ?? []).map((w) => [dpi * w, dpi * (height ?? Math.round(w / (ratio ?? imgRatio)))]);
  let dimensions: Dimensions[] = [[imgH, imgW]];

  if (widths) {
    dimensions = [...dimensions, ...fromDpi(), ...fromDpi(2), ...fromDpi(3)].filter(([w]) => w <= imgW).sort(([w1], [w2]) => w1 - w2);
    while (dimensions.some(processGap)) dimensions.splice(dimensions.findIndex(processGap), 1);
  }

  return {
    src: image.lqip, //builder.width(maxW).url(),
    srcset: dimensions.map(([w, h]) => `${builder.size(w, h).url()} ${w}w`).join(', '),
    sizes: sizes ?? '100vw',
  };
};

// TYPES ===================================================================================================================================
export type Dimensions = [number, number];
export type FromSanityImageO = {height?: number; image?: Image; ratio?: number; sizes?: string; widths?: number[]};
