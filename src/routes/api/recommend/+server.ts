import { getRecommends } from '$lib/server/product.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const recommends = await getRecommends(url.searchParams.get('id') as string);
	return json(recommends);
}
