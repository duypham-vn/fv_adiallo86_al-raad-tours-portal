import { z } from 'zod';

export const SignupSchema = z
	.object({
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		companyName: z.string().min(1, 'Company name is required'),
		phoneNumber: z.string().min(1, 'Phone number is required'),
		email: z.string().email('Invalid email'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type SignupPayload = z.infer<typeof SignupSchema>;
