import type { Handle } from '@sveltejs/kit';
import { findSession } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('svelte_ec_session');

	if (!sessionId) {
		event.locals.currentUser = null;
		return resolve(event);
	}

	event.locals.currentUser = await findSession(sessionId);
	return await resolve(event);
};
