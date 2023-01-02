import {error} from '@sveltejs/kit';
import {getShopData} from '~/server/api';
import type {PageServerLoad} from './$types';

export const load = (async () => {
  try {
    return await getShopData();
  } catch (e: any) {
		throw error(404, {message: e.toString()});
	}
}) satisfies PageServerLoad;
