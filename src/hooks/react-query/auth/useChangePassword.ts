import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@hooks/useAuth';

export const useChangePassword = () => {
	const { changePassword } = useAuth();

	return useMutation({
		mutationFn: async ({ password }: { password: string }) => {
			return changePassword(password);
		},
	});
};
