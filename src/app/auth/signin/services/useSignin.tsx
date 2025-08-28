import { useMutation } from '@tanstack/react-query';

import { SignInPayload } from '../types';

export const useSignin = () => {
	return useMutation({
		mutationFn: async (data: SignInPayload) => {
			const response = await fetch('/api/auth/signin', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			return response.json();
		},
	});
};
