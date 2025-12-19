import { database } from '$lib/server/mongodb';
import { ObjectId } from 'mongodb';

const expiresIn = 30 * 60 * 1000;

export type Session = {
	_id: string;
	userId: string;
	email: string;
	auth0Token: string;
	expiresAt: number;
};

const sessions = database.collection<Session>('sessions');

export async function createSession(data: Omit<Session, '_id' | 'expiresAt'>) {
	const sessionId = crypto.randomUUID();
	const session: Session = {
		_id: sessionId,
		expiresAt: Date.now() + expiresIn,
		...data
	};

	await sessions.insertOne(session);
	return sessionId;
}

export async function findSession(sessionId: string) {
	const session = await sessions.findOne({ _id: sessionId });

	if (!session) return null;

	if (session.expiresAt < Date.now()) {
		await deleteSession(session._id);
		return null;
	}
	return session;
}

export async function deleteSession(sessionId: string) {
	await sessions.deleteOne({ _id: sessionId });
}
