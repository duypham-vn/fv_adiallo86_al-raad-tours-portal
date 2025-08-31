import z from 'zod/v4';

import { PagingQueryParams } from '../types/common';

export type GetProgramsQueryParams = PagingQueryParams & {};

export const CreateProgramSchema = z.object({
	name: z.string().min(1, 'Name is required'),
});

export type CreateProgramPayload = z.infer<typeof CreateProgramSchema>;
