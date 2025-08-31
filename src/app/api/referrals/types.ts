import z from 'zod/v4';

import { PagingQueryParams } from '../types/common';

export type GetReferralsQueryParams = PagingQueryParams & {
	partnerId?: string;
};

export const CreateReferralSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email'),
	phoneNumber: z.string().min(1, 'Phone number is required'),
	passportNumber: z
		.string()
		.min(6, 'Passport must be at least 6 characters')
		.max(9, 'Passport must be at most 9 characters')
		.regex(/^[A-Z0-9]+$/, 'Passport must contain only letters and numbers'),
	additionalNotes: z.string().optional(),
	programId: z.string().min(1, 'Program is required'),
});

export type CreateReferralPayload = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	passportNumber: string;
	additionalNotes?: string;
	programId: string;
};
