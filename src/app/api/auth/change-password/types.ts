import z from 'zod/v4';

export const ChangePasswordSchema = z
	.object({
		oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;
