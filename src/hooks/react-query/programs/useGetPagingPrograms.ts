import { Programs } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { GetProgramsQueryParams } from '@app/api/programs/types';
import { ApiPagingResponse } from '@app/api/types/common';

import { QUERY_KEYS } from '@configs/query-key';

import { fetchAuth } from '@helpers/supabase/fetchAuth';

export const useGetPagingPrograms = (params: GetProgramsQueryParams) => {
	return useQuery({
		queryKey: [QUERY_KEYS.PROGRAMS.GET_PAGING, params],
		queryFn: async () => {
			const { page, limit } = params;

			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			});

			const response = await fetchAuth(`/api/programs?${queryParams}`);

			const data: ApiPagingResponse<Programs> = await response.json();

			return data;
		},
	});
};
