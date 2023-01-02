import {URL_DIRS, type PageType} from '~/schemas';

// CORE ====================================================================================================================================
export const qSlug = `slug.current`;
export const qKnowledgeSlug = `knowledge->${qSlug}`;
export const qImage = (name = 'image') => `{...${name}, ...${name}.asset->metadata{dimensions, lqip}}`;

export const qImageProp = (name="image") => `defined(${name}) => {'image': ${qImage(name)}}`;
export const qKnowledgeSlugProp = `'knowledge': ${qKnowledgeSlug}`;
export const qSlugProp = `'slug': ${qSlug}`;

export const qHrefProp = (type: PageType) => {
  if (type === 'page') return `'href': '/' + ${qSlug}`;
  if (type === 'knowledge') return `'href': '/' + ${qSlug}`;
  if (type === 'product' || type === 'event') return `'href': url`;
  return `${qKnowledgeSlug} != 'general' => {'href': '/' + ${qKnowledgeSlug} + '/${URL_DIRS[type]}/' + ${qSlug}}, 
    ${qKnowledgeSlug} == 'general' => {'href': '/${URL_DIRS[type]}/' + ${qSlug}}
  `;
};

export const qFeaturesProp = (type: PageType) => {
  if (['article', 'knowledge'].includes(type)) return;
  let result = `'features': [`;
  if (type === 'event') result += `{'key': 'De', 'value': from}, {'key': 'à', 'value': to}`;
  else {
    result += `{'key': 'Tarif', 'value': price}`;
    if (type !== 'product')
      result += `, {'key': 'Durée', 'value': duration}, {'key': 'Endroits', 'value': array::join(places[]->.title, ' ou ')}`;
  }
  return result + ']';
};

export const qEntryProps = (type: PageType) =>
  ['description', qFeaturesProp(type), qHrefProp(type), qImageProp(), 'title'].filter(Boolean).join(', ');

export const qItemProps = (type: PageType) =>
  ['excerpt', qFeaturesProp(type), qHrefProp(type), qImageProp(), qSlugProp, 'title'].filter(Boolean).join(', ');

export const qIs = (slug = '$slug') => `${qSlug} == ${slug}`;
export const qIsnt = (slug = '$slug') => `${qSlug} != ${slug}`;

export const qEntries = (type: string) => `*[_type == '${type}']`;
export const qEntry = (type: string, slug = '$slug') => `*[_type == '${type}' && ${qIs(slug)}][0]`;
export const qOtherEntries = (type: string, slug = '$slug') => `*[_type == '${type}' && ${qIsnt(slug)}]`;

// PATHS ===================================================================================================================================
export const qPaths = (type: PageType) =>
  type === 'knowledge'
    ? `${qOtherEntries('knowledge', "'general'")}{'params': {'knowledge': ${qSlug}}}`
    : `${qEntries(type)}{'params': {${qSlugProp}, ${qKnowledgeSlug} != 'general' => {${qKnowledgeSlugProp}}}}`;

// LAYOUT ==================================================================================================================================
export const qLayout = (type: PageType) => {
  const prefix = type === 'knowledge' ? '' : 'knowledge->';

  return `${qEntries('config')}[0]{
		'footer': {city, email, fb, instagram, phone, street, zipcode},
		'hero': {
			${qImageProp()}, subtitle, title, 
			^.${prefix}${qIsnt("'general'")} => ^${type === 'knowledge' ? '' : '.knowledge->'}{${qImageProp()}, title}
		},
		menu->{
			label,
			${qSlugProp}, 
			items[]->{
				label,
				'to': '/' + coalesce(${qSlug}, ''),
				'isActive': false,
			}
		},
		'organization': ${qEntry('article', "'l-association'")}{${qItemProps('article')}},
		'others': ${qOtherEntries(
      'knowledge',
      type === 'knowledge' ? '$knowledge' : type === 'product' ? "'general'" : `^.^.${qKnowledgeSlug}`
    )}{${qItemProps('knowledge')}},
		'pageType': '${type}',
		'theme': ${type === 'product' ? "'general'" : `^.${prefix}${qSlug}`},
	}`;
};
