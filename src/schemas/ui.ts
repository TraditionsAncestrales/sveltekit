import type {createForm} from 'felte';
import {z} from 'zod';
import {fill} from '~/data/utils';
import {fillString} from '~/server/utils';
import {
  zArticleItem,
  zConfig,
  zConsultationItem,
  zEvent,
  zFeature,
  zImage,
  zItem,
  zKnowledge,
  zMenu,
  zNav,
  zPageType,
  zProductItem,
  zTestimony,
  zTrainingItem,
  zWorkshopItem
} from '.';
import {zSanityBlock} from './sanity';

// CORE ====================================================================================================================================
export const zClass = z.string().optional();
export const fillClass = fill(zClass);

export const zFit = z.enum(['contain', 'cover']);
export const zIntent = z.enum(['dark', 'light', 'primary', 'secondary', 'white']);

// COMPONENTS ==============================================================================================================================
export const zComponentStyles = z.object({
  class: zClass,
  'class:list': z.any().optional(),
});

export const zSvelteComponentStyles = zComponentStyles.omit({'class:list': true});

// FORM CONTROL ============================================================================================================================
export const zFormControlData = z.object({
  ...fill(z.string().optional())('label', 'placeholder'),
  ...fillString('id','name'),
  intent: zIntent,
});
export const zFormControlP = zFormControlData.merge(zSvelteComponentStyles);

// FORM AREA ===============================================================================================================================
export const zFormAreaData = zFormControlData.extend({});
export const zFormAreaP = zFormAreaData.merge(zSvelteComponentStyles);

// FORM EMAIL ==============================================================================================================================
export const zFormEmailData = zFormControlData.extend({});
export const zFormEmailP = zFormEmailData.merge(zSvelteComponentStyles);

// FORM SUBMIT =============================================================================================================================
export const zFormSubmitData = zFormControlData.extend({...fillString('text', 'textDisabled'), intent: zIntent});
export const zFormSubmitP = zFormSubmitData.merge(zSvelteComponentStyles);

// FORM TEXT ===============================================================================================================================
export const zFormTextData = zFormControlData.extend({});
export const zFormTextP = zFormTextData.merge(zSvelteComponentStyles);

// NAV ITEM  ===============================================================================================================================
export const zNavItemData = z.object({item: zNav});
export const zNavItemP = zNavItemData.merge(zComponentStyles);

// THE FOOTER ==============================================================================================================================
export const zTheFooterData = zConfig.pick({city: true, email: true, fb: true, instagram: true, phone: true, street: true, zipcode: true});
export const zTheFooterP = zTheFooterData.merge(zComponentStyles);
export type TheFooterP = z.infer<typeof zTheFooterP>;

// THE HEADER ==============================================================================================================================
export const zTheHeaderData = z.object({menu: zMenu});
export const zTheHeaderP = zTheHeaderData.merge(zComponentStyles);

// THE HERO ================================================================================================================================
export const zTheHeroData = z.object({
  ...fillString('subtitle', 'title'),
  image: zImage,
});
export const zTheHeroP = zTheHeroData.merge(zComponentStyles);
export type TheHeroP = z.infer<typeof zTheHeroP>;

// LAYOUT ==================================================================================================================================
export const zLayoutData = z.object({
  footer: zTheFooterData,
  hero: zTheHeroData,
  menu: zMenu,
  organization: zArticleItem,
  others: zKnowledge.array(),
  pageType: zPageType,
  theme: z.string(),
});
export const zLayoutP = zLayoutData;

// UI FEATURES =============================================================================================================================
export const zUiFeaturesData = z.object({
  features: zFeature.array().optional(),
  intent: zIntent.optional(),
});
export const zUiFeaturesP = zUiFeaturesData.merge(zComponentStyles);
export type UiFeaturesP = z.infer<typeof zUiFeaturesP>;

// UI IMG ==================================================================================================================================
export const zUiImgData = z.object({
  border: z.number().optional(),
  borderRight: z.boolean().optional(),
  fit: zFit.optional(),
  height: z.number().optional(),
  image: zImage.optional(),
  loading: z.enum(['eager', 'lazy']).optional(),
  ratio: z.number().optional(),
  sizes: z.string().optional(),
  widths: z.number().array().optional(),
});
export const zUiImgStyles = zComponentStyles.extend(fillClass('cBorder', 'cImg'));
export const zUiImgP = zUiImgData.merge(zUiImgStyles);
export type UiImgP = z.infer<typeof zUiImgP>;

// UI ITEM =================================================================================================================================
export const zUiItemData = z.object({item: zItem});
export const zUiItemP = zUiItemData.merge(zComponentStyles);
export type UiItemP = z.infer<typeof zUiItemP>;

// UI LINK =================================================================================================================================
export const zUiLinkBtnData = z.object({...fillString('href', 'text'), intent: zIntent.optional()});
export const zUiLinkBtnP = zUiLinkBtnData.merge(zComponentStyles);
export type UiLinkBtnP = z.infer<typeof zUiLinkBtnP>;

// UI TEXT =================================================================================================================================
export const zUiTextData = z.object({text: zSanityBlock.array()});
export const zUiTextP = zUiTextData.merge(zComponentStyles);
export type UiTextP = z.infer<typeof zUiTextP>;

// UI TITLE ================================================================================================================================
export const zUiTitleData = z.object({title: z.string().optional()});
export const zUiTitleStyles = zComponentStyles.extend(fillClass('cImageImg', 'cStain', 'cTitle'));
export const zUiTitleP = zUiTitleData.merge(zUiTitleStyles);
export type UiTitleP = z.infer<typeof zUiTitleP>;

// UI SECTION ==============================================================================================================================
export const zUiSectionData = z.object({
  asideRight: z.boolean().optional(),
  border: z.enum(['all', 'bottom', 'none', 'top']).optional(),
  expanded: z.boolean().optional(),
  intent: zIntent.optional(),
});
export const zUiSectionStyles = zComponentStyles.extend(fillClass('cAside', 'cBorder', 'cHeader'));
export const zUiSectionP = zUiSectionData.merge(zUiSectionStyles);
export type UiSectionP = z.infer<typeof zUiSectionP>;

// ARTICLE ITEMS ===========================================================================================================================
export const zArticleItemsData = z.object({items: zArticleItem.array()});
export const zArticleItemsP = zArticleItemsData.merge(zUiSectionP);
export type ArticleItemsP = z.infer<typeof zArticleItemsP>;

// CONSULTATION ITEMS ======================================================================================================================
export const zConsultationItemsData = z.object({items: zConsultationItem.array()});
export const zConsultationItemsP = zConsultationItemsData.merge(zUiSectionP);
export type ConsultationItemsP = z.infer<typeof zConsultationItemsP>;

// EVENT ITEMS =============================================================================================================================
export const zEventItemsData = z.object({items: zEvent.array()});
export const zEventItemsP = zEventItemsData.merge(zUiSectionP);
export type EventItemsP = z.infer<typeof zEventItemsP>;

// KNOWLEDGE ITEMS =========================================================================================================================
export const zKnowledgeItemsData = z.object({items: zKnowledge.array()});
export const zKnowledgeItemsP = zKnowledgeItemsData.merge(zUiSectionP);
export type KnowledgeItemsP = z.infer<typeof zKnowledgeItemsP>;

// PRODUCT ITEMS ===========================================================================================================================
export const zProductItemsData = z.object({items: zProductItem.array()});
export const zProductItemsP = zProductItemsData.merge(zUiSectionP);
export type ProductItemsP = z.infer<typeof zProductItemsP>;

// TESTIMONY SECTION =======================================================================================================================
export const zTestimonySectionData = z.object({testimonies: z.object({image: zImage, items: zTestimony.array()})});
export const zTestimonySectionP = zTestimonySectionData.merge(zUiSectionP);
export type TestimonySectionP = z.infer<typeof zTestimonySectionP>;

// TRAINING ITEMS ==========================================================================================================================
export const zTrainingItemsData = z.object({items: zTrainingItem.array()});
export const zTrainingItemsP = zTrainingItemsData.merge(zUiSectionP);
export type TrainingItemsP = z.infer<typeof zTrainingItemsP>;

// WORKSHOP ITEMS ==========================================================================================================================
export const zWorkshopItemsData = z.object({items: zWorkshopItem.array()});
export const zWorkshopItemsP = zWorkshopItemsData.merge(zUiSectionP);
export type WorkshopItemsP = z.infer<typeof zWorkshopItemsP>;

// TYPES ===================================================================================================================================
export type FormProp = {
  form: Pick<ReturnType<typeof createForm>, 'errors' | 'isSubmitting' | 'isValid' | 'touched'>;
};
export type FormControlP = z.infer<typeof zFormControlP> & FormProp;
export type FormAreaP = z.infer<typeof zFormAreaP> & FormProp;
export type FormEmailP = z.infer<typeof zFormEmailP> & FormProp;
export type FormTextP = z.infer<typeof zFormTextP> & FormProp;
export type FormSubmitP = z.infer<typeof zFormSubmitP> & FormProp;
export type Intent = z.infer<typeof zIntent>;
