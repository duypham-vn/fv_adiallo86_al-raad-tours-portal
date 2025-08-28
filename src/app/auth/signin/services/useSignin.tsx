import { useMutation } from '@tanstack/react-query';

export const useSignin = () => {
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			const response = await fetch('/api/auth/signin', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			return response.json();
		},
	});
};
