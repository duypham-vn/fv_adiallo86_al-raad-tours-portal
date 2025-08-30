import { useMutation } from '@tanstack/react-query';

import { UpdateProfilePayload } from '@app/api/auth/profile/types';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: async (data: UpdateProfilePayload) => {
			return fetchAuth('/api/auth/profile', {
				method: 'PUT',
				body: JSON.stringify(data),
			});
		},
	});
};
