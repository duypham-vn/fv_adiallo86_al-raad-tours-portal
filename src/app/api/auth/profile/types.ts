import { z } from 'zod';

export const UpdateProfileSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	companyName: z.string().min(1, 'Company name is required'),
	phoneNumber: z.string().min(1, 'Phone number is required'),
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfileSchema>;
