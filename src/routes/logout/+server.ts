import { redirect, type RequestHandler } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/session';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('svelte_ec_session');
	if (sessionId) {
		await deleteSession(sessionId);
		cookies.delete('svelte_ec_session', { path: '/' });
	}
	throw redirect(302, '/products/svelte-book');
};
