import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@helpers/supabase/server';

export async function POST(request: NextRequest) {
	try {
		const { firstName, lastName, email, password } = await request.json();

		// Validate input
		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json(
				{ error: 'All fields are required' },
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

		// Sign up with Supabase
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					first_name: firstName,
					last_name: lastName,
					full_name: `${firstName} ${lastName}`,
				},
			},
		});

		if (error) {
			return NextResponse.json(
				{ error: error.message || 'Failed to create account' },
				{ status: 400 },
			);
		}

		// Return success response
		return NextResponse.json({
			message: 'Account created successfully',
			user: {
				id: data.user?.id,
				email: data.user?.email,
				created_at: data.user?.created_at,
			},
		});
	} catch (error) {
		console.error('Sign up error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
