import {error} from '@sveltejs/kit';
import {getConsultationData} from '~/server/api';
import type {PageServerLoad} from './$types';

export const load = (async ({params: {slug}}) => {
  try {
    return await getConsultationData(slug);
  } catch (e: any) {
		throw error(404, {message: e.toString()});
	}
}) satisfies PageServerLoad;
