import { NextResponse } from 'next/server';

import { ProgramStatus } from '@prisma/client';

import { createClient } from '@helpers/prisma/server';

import { AuthRequest } from '../types/common';
import { withAdmin } from '../utils/withAdmin';
import { withAuth } from '../utils/withAuth';

import { CreateProgramSchema } from './types';

const getPaging = async (request: AuthRequest) => {
	const { searchParams } = new URL(request.url);

	const page = searchParams.get('page') ?? 1;
	const limit = searchParams.get('limit') ?? 10;

	const prisma = createClient();

	const skip = (Number(page) - 1) * Number(limit);

	const total = await prisma.programs.count();

	const programs = await prisma.programs.findMany({
		skip,
		take: Number(limit),
		orderBy: { createdAt: 'desc' },
	});

	return NextResponse.json({
		data: programs,
		total,
		error: null,
	});
};

const create = async (request: AuthRequest) => {
	const body = await request.json();
	const data = CreateProgramSchema.parse(body);

	const prisma = createClient();

	const program = await prisma.programs.create({
		data: { name: data.name, status: ProgramStatus.ACTIVE },
	});

	return NextResponse.json({ data: program }, { status: 201 });
};

export const GET = withAuth(getPaging);
export const POST = withAuth(withAdmin(create));
