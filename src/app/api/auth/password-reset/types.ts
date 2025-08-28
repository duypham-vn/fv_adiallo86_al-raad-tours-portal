import z from 'zod/v4';

export const PasswordResetSchema = z.object({
	email: z.string().email('Invalid email'),
});

export type PasswordResetPayload = z.infer<typeof PasswordResetSchema>;
