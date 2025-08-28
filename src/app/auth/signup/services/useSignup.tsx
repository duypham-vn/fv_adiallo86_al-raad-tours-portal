import { useMutation } from '@tanstack/react-query';

import { SignUpPayload } from '../types';

export const useSignup = () => {
	return useMutation({
		mutationFn: async (data: SignUpPayload) => {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			return response.json();
		},
	});
};
