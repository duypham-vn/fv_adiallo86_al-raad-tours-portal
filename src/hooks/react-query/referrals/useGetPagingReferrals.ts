import { Programs, Referrals } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { GetReferralsQueryParams } from '@app/api/referrals/types';
import { ApiPagingResponse } from '@app/api/types/common';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useGetPagingReferrals = (params: GetReferralsQueryParams) => {
	return useQuery({
		queryKey: [QUERY_KEYS.REFERRALS.GET_PAGING, params],
		queryFn: async () => {
			const { page, limit, partnerId } = params;

			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
				partnerId: partnerId || '',
			});

			const response = await fetchAuth(`/api/referrals?${queryParams}`);

			const data: ApiPagingResponse<
				Referrals & {
					program: Programs;
				}
			> = await response.json();

			return data;
		},
	});
};
