import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@helpers/supabase/server';

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		// Validate input
		if (!email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 },
			);
		}

		const supabase = await createClient();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/password-reset/confirm`,
		});

		if (error) {
			return NextResponse.json(
				{ error: error.message || 'Invalid email' },
				{ status: 401 },
			);
		}

		// Return success response with user data (excluding sensitive information)
		return NextResponse.json({
			message: 'Password reset email sent',
		});
	} catch (error) {
		console.error('Sign in error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
