import { useMutation } from '@tanstack/react-query';

import { SignupPayload } from '@app/api/auth/signup/types';

import { useAuth } from '@hooks/useAuth';

export const useSignup = () => {
	const { signup } = useAuth();

	return useMutation({
		mutationFn: async (data: SignupPayload) => {
			return signup(data);
		},
	});
};
