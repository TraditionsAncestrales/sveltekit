import {z} from 'zod';
import {qEntries, qEntry, qEntryProps, qImageProp, qItemProps, qLayout, qPaths} from '~/data/queries';
import {zArticle, zArticleItem, zConsultation, zConsultationItem, zEvent, zImage, zProductItem, zTestimony, zTraining, zTrainingItem, zWorkshop, zWorkshopItem} from '~/schemas';
import {zGeneralKnowledgeInput, zKnowledgePaths, zKnowledgeSlugInput, zOutput, zPaths, zSlugInput} from '~/schemas/api';
import {zLayoutData} from '~/schemas/ui';
import {procedure} from './utils';

// ARTICLE ===============================================================================================================================
export const getArticleData = procedure('ARTICLE PAGE', {
  input: zSlugInput,
  output: zOutput.extend({entry: zArticle.omit({excerpt: true, knowledge: true, slug: true, uri: true})}),
  query: `${qEntry('article')}{
    'entry': {${qEntryProps('article')}},
    'layout': ${qLayout('article')}
  }`,
});

export const getArticlePaths = procedure('ARTICLE PATHS', {output: zPaths, query: qPaths('article')});

// CONSULTATION ============================================================================================================================
export const getConsultationData = procedure('CONSULTATION PAGE', {
  input: zSlugInput,
  output: zOutput.extend({entry: zConsultation.omit({excerpt: true, knowledge: true, slug: true, uri: true})}),
  query: `${qEntry('consultation')}{
    'entry': {${qEntryProps('consultation')}}, 
    'layout': ${qLayout('consultation')},
  }`,
});

export const getConsultationPaths = procedure('CONSULTATION PATHS', {output: zPaths, query: qPaths('consultation')});

// KNOWLEDGE ===============================================================================================================================
export const getGeneralKnowledgeData = procedure('GENERAL KNOWLEDGE PAGE', {
  input: zGeneralKnowledgeInput,
  output: zOutput.extend({
    article: zArticleItem,
    events: zEvent.array(),
    testimonies: z.object({image: zImage, items: zTestimony.array()}),
  }),
  query: `${qEntry('knowledge', '$knowledge')}{
    'article': ${qEntry('article', "'la-fondatrice'")}{${qItemProps('article')}},
    'events': ${qEntries('event')}{${qItemProps('event')}, from, to, type, url},
    'layout': ${qLayout('knowledge')},
    'testimonies': {
      ...${qEntries('config')}[0]{${qImageProp('testimoniesImage')}},
      'items': ${qEntries('testimony')},
    },
  }`,
});

export const getKnowledgeData = procedure('KNOWLEDGE PAGE', {
  input: zKnowledgeSlugInput,
  output: zOutput.extend({
    article: zArticleItem,
    consultations: zConsultationItem.array(),
    events: zEvent.array(),
    trainings: zTrainingItem.array(),
    workshops: zWorkshopItem.array(),
  }),
  query: `${qEntry('page', '$knowledge')}{
    article->{${qItemProps('article')}},
    consultations[]->{${qItemProps('consultation')}},
    'events': *[_type == 'event' && type->knowledge._ref == ^.knowledge._ref]{${qItemProps('event')}},
    'layout': ${qLayout('page')},
    trainings[]->{${qItemProps('training')}},
    workshops[]->{${qItemProps('workshop')}},
  }`
});

export const getKnowledgePaths = procedure('KNOWLEDGE PATHS', {output: zKnowledgePaths, query: `${qPaths('knowledge')}`});

// SHOP ====================================================================================================================================
export const getShopData = procedure('SHOP PAGE', {
  output: zOutput.extend({items: zProductItem.array()}),
  query: `{
    'items': ${qEntries('product')}{${qItemProps('product')}}, 
    'layout': ${qLayout('product')},
  }`,
});

// TRAINING ================================================================================================================================
export const getTrainingData = procedure('TRAINING PAGE', {
  input: zSlugInput,
  output: zOutput.extend({entry: zTraining.omit({excerpt: true, knowledge: true, slug: true, uri: true})}),
  query: `${qEntry('training')}{
    'entry': {${qEntryProps('training')}}, 
    'layout': ${qLayout('training')},
  }`,
});

export const getTrainingPaths = procedure('TRAINING PATHS', {output: zPaths, query: qPaths('training')});

// WORKSHOP ================================================================================================================================
export const getWorkshopData = procedure('WORKSHOP PAGE', {
  input: zSlugInput,
  output: zOutput.extend({entry: zWorkshop.omit({excerpt: true, knowledge: true, slug: true, uri: true})}),
  query: `${qEntry('workshop')}{
    'entry': {${qEntryProps('training')}}, 
    'layout': ${qLayout('workshop')},
  }`,
});

export const getWorkshopPaths = procedure('WORKSHOP PATHS', {output: zPaths, query: qPaths('workshop')});

// LAYOUT ==================================================================================================================================
export const getLayoutData = procedure('LAYOUT', {
  input: zKnowledgeSlugInput,
  output: zLayoutData,
  query: `${qEntry('knowledge', '$knowledge')}{...${qLayout('knowledge')}}`,
});
