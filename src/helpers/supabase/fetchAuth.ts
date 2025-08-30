import { createClient } from './client';

// eslint-disable-next-line no-undef
export const fetchAuth = async (url: string, options: RequestInit = {}) => {
	const supabase = createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) throw new Error('No active session');

	const token = session.access_token;

	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
