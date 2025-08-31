import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';
import { ZodError } from 'zod/v4';

import { createClient } from '@helpers/prisma/server';
import { isAdminRole } from '@helpers/supabase/isAdmin';

import { AuthRequest } from '../types/common';
import { catchZodError } from '../utils/catchZodError';
import { withAuth } from '../utils/withAuth';

import { CreateReferralSchema } from './types';

const getPaging = async (request: AuthRequest) => {
	const { searchParams } = new URL(request.url);

	const page = searchParams.get('page') ?? 1;
	const limit = searchParams.get('limit') ?? 10;
	const partnerId = searchParams.get('partnerId') ?? '';

	const prisma = createClient();

	const skip = (Number(page) - 1) * Number(limit);

	const where: Prisma.ReferralsWhereInput = {};

	if (isAdminRole(request.user) && partnerId) {
		where.partnerId = partnerId;
	}

	const total = await prisma.referrals.count({ where });

	const referrals = await prisma.referrals.findMany({
		skip,
		take: Number(limit),
		orderBy: { createdAt: 'desc' },
		include: {
			program: true,
		},
		where,
	});

	return NextResponse.json({
		data: referrals,
		total,
		error: null,
	});
};

export const create = async (request: AuthRequest) => {
	try {
		const body = await request.json();
		const data = CreateReferralSchema.parse(body);

		const prisma = createClient();

		const refferal = await prisma.referrals.findUnique({
			where: {
				passportNumber: data.passportNumber,
			},
		});

		if (refferal) {
			return NextResponse.json(
				{ error: 'Referral already exists with this passport number' },
				{ status: 400 },
			);
		}

		const referral = await prisma.referrals.create({
			data: {
				...data,
				partnerId: request.user.id,
			},
		});

		return NextResponse.json({ data: referral }, { status: 201 });
	} catch (error) {
		console.log('Create referral error', error);

		if (error instanceof ZodError) {
			return catchZodError(error);
		}

		return NextResponse.json(
			{ error: 'Internal server error', data: null },
			{ status: 500 },
		);
	}
};

export const GET = withAuth(getPaging);
export const POST = withAuth(create);
