import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@hooks/useAuth';

import { SignInPayload } from '../types';

export const useSignin = () => {
	const { login } = useAuth();

	return useMutation({
		mutationFn: async (data: SignInPayload) => {
			return login(data.email, data.password);
		},
	});
};
