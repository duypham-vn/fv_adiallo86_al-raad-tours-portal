import { z } from 'zod';

export type SignupPayload = z.infer<typeof schema>;

export const schema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});
