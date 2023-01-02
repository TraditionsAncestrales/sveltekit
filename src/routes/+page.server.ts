import {error} from '@sveltejs/kit';
import {getGeneralKnowledgeData} from '~/server/api';
import type {PageServerLoad} from './$types';

export const load = (async () => {
  try {
    return await getGeneralKnowledgeData();
  } catch (e: any) {
		throw error(404, {message: e.toString()});
	}
}) satisfies PageServerLoad;
