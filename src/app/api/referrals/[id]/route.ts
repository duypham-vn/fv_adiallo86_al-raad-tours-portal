import { NextResponse } from 'next/server';

import { AuthRequest, ParamsRequest } from '@app/api/types/common';
import { withAuth } from '@app/api/utils/withAuth';

import { createClient } from '@helpers/prisma/server';

export const deleteReferral = async (
	request: AuthRequest,
	{ params }: ParamsRequest<{ id: string }>,
) => {
	const prisma = createClient();

	const id = (await params).id;

	const referral = await prisma.referrals.findUnique({
		where: { id },
	});

	if (!referral) {
		return NextResponse.json({ error: 'Referral not found' }, { status: 404 });
	}

	if (referral.partnerId !== request.user.id) {
		return NextResponse.json(
			{ error: 'You are not authorized to delete this referral' },
			{ status: 403 },
		);
	}

	await prisma.referrals.delete({
		where: { id },
	});

	return NextResponse.json({ data: referral });
};

export const DELETE = withAuth(deleteReferral);
