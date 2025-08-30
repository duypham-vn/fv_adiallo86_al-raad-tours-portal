import { Partners } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@app/api/types/common';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useGetProfile = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.AUTH.PROFILE],
		queryFn: async () => {
			const response = await fetchAuth('/api/auth/profile');

			const profile: ApiResponse<Partners> = await response.json();

			return profile.data;
		},
	});
};
