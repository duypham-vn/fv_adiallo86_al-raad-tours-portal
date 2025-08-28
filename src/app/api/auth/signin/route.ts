import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@helpers/supabase/server';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		// Validate input
		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email and password are required' },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 },
			);
		}

		// Validate password length
		if (password.length < 6) {
			return NextResponse.json(
				{ error: 'Password must be at least 6 characters long' },
				{ status: 400 },
			);
		}

		const supabase = await createClient();

		// Sign in with Supabase
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return NextResponse.json(
				{ error: error.message || 'Invalid email or password' },
				{ status: 401 },
			);
		}

		// Return success response with user data (excluding sensitive information)
		return NextResponse.json({
			message: 'Sign in successful',
			user: {
				id: data.user?.id,
				email: data.user?.email,
				created_at: data.user?.created_at,
			},
		});
	} catch (error) {
		console.error('Sign in error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
