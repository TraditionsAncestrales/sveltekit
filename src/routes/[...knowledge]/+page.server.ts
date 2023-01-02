import {error} from '@sveltejs/kit';
import {getKnowledgeData} from '~/server/api';
import type {PageServerLoad} from './$types';

export const load = (async ({params: {knowledge}}) => {
  try {
    return await getKnowledgeData(knowledge);
  } catch (e: any) {
		throw error(404, {message: e.toString()});
	}
}) satisfies PageServerLoad;
