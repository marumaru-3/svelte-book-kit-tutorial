import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.currentUser) {
		return json(null);
	}
	return json({ email: locals.currentUser.email });
};
