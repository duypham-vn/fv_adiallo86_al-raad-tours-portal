import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateReferralPayload } from '@app/api/referrals/types';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useCreateReferral = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateReferralPayload) => {
			return fetchAuth('/api/referrals', {
				method: 'POST',
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.REFERRALS.GET_PAGING],
			});
		},
	});
};
