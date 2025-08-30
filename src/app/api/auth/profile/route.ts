import { NextResponse } from 'next/server';

import { Partners } from '@prisma/client';
import { ZodError } from 'zod';

import { ApiResponse, AuthRequest } from '@app/api/types/common';
import { catchZodError } from '@app/api/utils/catchZodError';
import { withAuth } from '@app/api/utils/withAuth';

import { createClient } from '@helpers/prisma/server';

import { UpdateProfileSchema } from './types';

const get = async (
	request: AuthRequest,
): Promise<NextResponse<ApiResponse<Partners | null>>> => {
	const prisma = createClient();

	const partner = await prisma.partners.findFirst({
		where: {
			id: request.user.id,
		},
	});

	return NextResponse.json({ data: partner });
};

const update = async (
	request: AuthRequest,
): Promise<NextResponse<ApiResponse<Partners | null>>> => {
	try {
		const prisma = createClient();

		const data = UpdateProfileSchema.parse(await request.json());

		const partner = await prisma.partners.update({
			where: { id: request.user.id },
			data,
		});

		return NextResponse.json({ data: partner });
	} catch (error) {
		console.log('Update profile error', error);

		if (error instanceof ZodError) {
			return catchZodError(error);
		}

		return NextResponse.json(
			{ error: 'Internal server error', data: null },
			{ status: 500 },
		);
	}
};

export const GET = withAuth(get);
export const PUT = withAuth(update);
