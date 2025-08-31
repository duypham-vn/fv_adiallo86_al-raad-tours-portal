import { Partners } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { GetPartnersQueryParams } from '@app/api/partners/types';
import { ApiPagingResponse } from '@app/api/types/common';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useGetPagingPartners = (params: GetPartnersQueryParams) => {
	return useQuery({
		queryKey: [QUERY_KEYS.PARTNERS.GET_PAGING, params],
		queryFn: async () => {
			const { page, limit } = params;

			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			});

			const response = await fetchAuth(`/api/partners?${queryParams}`);

			const data: ApiPagingResponse<Partners> = await response.json();

			return data;
		},
	});
};
