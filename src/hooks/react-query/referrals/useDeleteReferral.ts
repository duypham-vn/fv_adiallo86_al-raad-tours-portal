import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

type UseUpdateProgramParams = {
	id: string;
};

export const useDeleteReferral = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: UseUpdateProgramParams) => {
			return fetchAuth(`/api/referrals/${params.id}`, {
				method: 'DELETE',
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.REFERRALS.GET_PAGING],
			});
		},
	});
};
