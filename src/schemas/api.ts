import {z} from "zod";
import {zLayoutData} from "./ui";

// PATHS ===================================================================================================================================
export const zPaths = z.object({params: z.object({slug: z.string(), knowledge: z.string().optional()})}).array();
export const zKnowledgePaths = z.object({params: z.object({knowledge: z.string()})}).array();

// INPUT ===================================================================================================================================
export const zGeneralKnowledgeInput = z.tuple([]).transform(() => ({knowledge: 'general'}));
export const zKnowledgeSlugInput = z.tuple([z.string()]).transform(([knowledge]) => ({knowledge}));
export const zSlugInput = z.tuple([z.string()]).transform(([slug]) => ({slug}));

// OUTPUT ==================================================================================================================================
export const zOutput = z.object({layout: zLayoutData});