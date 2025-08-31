import { NextResponse } from 'next/server';

import { createClient } from '@helpers/prisma/server';

import { AuthRequest } from '../types/common';
import { withAdmin } from '../utils/withAdmin';
import { withAuth } from '../utils/withAuth';

const getPaging = async (request: AuthRequest) => {
	const { searchParams } = new URL(request.url);

	const page = searchParams.get('page') ?? 1;
	const limit = searchParams.get('limit') ?? 10;

	const prisma = createClient();

	const skip = (Number(page) - 1) * Number(limit);

	const total = await prisma.partners.count();

	const partners = await prisma.partners.findMany({
		skip,
		take: Number(limit),
		orderBy: { createdAt: 'desc' },
	});

	return NextResponse.json({
		data: partners,
		total,
		error: null,
	});
};

export const GET = withAuth(withAdmin(getPaging));
