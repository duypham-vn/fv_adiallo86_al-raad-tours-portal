/* eslint-disable no-unused-vars */
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import type { User } from '@supabase/supabase-js';

export type ApiResponse<T> = {
	data: T;
	error?: string | null;
};

export type ApiListResponse<T> = {
	data: T[];
	error?: string | null;
};

export type AuthRequest = NextRequest & {
	user: User;
};

export type AuthHandler<T = any> = (
	req: AuthRequest,
	res: NextApiResponse<T>,
) => unknown | Promise<unknown>;
