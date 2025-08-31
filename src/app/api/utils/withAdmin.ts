/* eslint-disable no-unused-vars */
import { NextResponse } from 'next/server';

import { isAdminRole } from '@helpers/supabase/isAdmin';

import { AuthRequest } from '../types/common';

export function withAdmin(handler: (...args: any[]) => Promise<NextResponse>) {
	return async (req: AuthRequest, ...args: any[]) => {
		const { user } = req;

		const isAdmin = isAdminRole(user);

		if (!isAdmin) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		return handler(req, ...args);
	};
}
