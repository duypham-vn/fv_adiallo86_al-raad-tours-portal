import { NextRequest, NextResponse } from 'next/server';

import { Partners } from '@prisma/client';
import { ZodError } from 'zod';

import { ApiResponse } from '@app/api/types/common';
import { catchZodError } from '@app/api/utils/catchZodError';

import { NEXT_PUBLIC_SITE_URL } from '@configs/_constant';

import { createClient as createPrismaClient } from '@helpers/prisma/server';
import { createClient } from '@helpers/supabase/server';

import { SignupSchema } from './types';

export async function POST(
	request: NextRequest,
): Promise<NextResponse<ApiResponse<Partners | null>>> {
	try {
		const data = SignupSchema.parse(await request.json());

		const supabase = await createClient();
		const prisma = await createPrismaClient();

		const { firstName, lastName, email, password, companyName, phoneNumber } =
			data;

		const { data: authUser, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					full_name: `${firstName} ${lastName}`,
				},
				emailRedirectTo: NEXT_PUBLIC_SITE_URL,
			},
		});

		if (error || !authUser.user) {
			return NextResponse.json(
				{ error: error?.message || 'Failed to create account', data: null },
				{ status: 400 },
			);
		}

		const partner = await prisma.partners.create({
			data: {
				id: authUser.user.id,
				firstName,
				lastName,
				email,
				companyName,
				phoneNumber,
			},
		});

		return NextResponse.json({ data: partner }, { status: 201 });
	} catch (error) {
		console.log('Sign up error', error);

		if (error instanceof ZodError) {
			return catchZodError(error);
		}

		return NextResponse.json(
			{ error: 'Internal server error', data: null },
			{ status: 500 },
		);
	}
}
