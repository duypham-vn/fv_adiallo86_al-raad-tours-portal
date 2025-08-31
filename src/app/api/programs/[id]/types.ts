import { ProgramStatus } from '@prisma/client';
import z from 'zod/v4';

export const UpdateProgramSchema = z.object({
	name: z.string().min(1, 'Name is required').optional(),
	status: z.nativeEnum(ProgramStatus).optional(),
});

export type UpdateProgramPayload = z.infer<typeof UpdateProgramSchema>;
