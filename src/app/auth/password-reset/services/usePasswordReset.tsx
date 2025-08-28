import { useMutation } from '@tanstack/react-query';

export const usePasswordReset = () => {
	return useMutation({
		mutationFn: async (data: { email: string }) => {
			const response = await fetch('/api/auth/password-reset', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			return response.json();
		},
	});
};
