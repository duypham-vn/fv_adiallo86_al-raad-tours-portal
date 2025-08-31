import { NextResponse } from 'next/server';

import { ZodError } from 'zod/v4';

import { AuthRequest, ParamsRequest } from '@app/api/types/common';
import { catchZodError } from '@app/api/utils/catchZodError';
import { withAdmin } from '@app/api/utils/withAdmin';
import { withAuth } from '@app/api/utils/withAuth';

import { createClient } from '@helpers/prisma/server';

import { UpdateProgramSchema } from './types';

export const update = async (
	request: AuthRequest,
	{ params }: ParamsRequest<{ id: string }>,
) => {
	try {
		const body = await request.json();
		const data = UpdateProgramSchema.parse(body);

		const prisma = createClient();

		const id = (await params).id;

		const program = await prisma.programs.findUnique({
			where: { id },
		});

		if (!program) {
			return NextResponse.json({ error: 'Program not found' }, { status: 404 });
		}

		await prisma.programs.update({
			where: { id },
			data,
		});

		return NextResponse.json({ data: program });
	} catch (error) {
		console.log('Update program error', error);

		if (error instanceof ZodError) {
			return catchZodError(error);
		}

		return NextResponse.json(
			{ error: 'Internal server error', data: null },
			{ status: 500 },
		);
	}
};

export const PUT = withAuth(withAdmin(update));
