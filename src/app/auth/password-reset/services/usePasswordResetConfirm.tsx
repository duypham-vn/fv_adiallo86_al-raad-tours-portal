import { useMutation } from '@tanstack/react-query';

import { createClient } from '@helpers/supabase/client';

export const usePasswordResetConfirm = () => {
	return useMutation({
		mutationFn: async ({ password }: { password: string }) => {
			const supabase = createClient();

			const response = await supabase.auth.updateUser({
				password,
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			return response.data.user;
		},
	});
};
