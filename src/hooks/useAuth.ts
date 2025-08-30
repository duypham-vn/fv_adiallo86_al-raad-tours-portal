'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { SignupPayload } from '@app/api/auth/signup/types';

import { PATH_AUTH } from '@configs/routes';

import { useAuthStore } from '@stores/auth';

import { createClient } from '@helpers/supabase/client';

export const useAuth = () => {
	const router = useRouter();
	const supabase = createClient();

	const { setUser, setSession } = useAuthStore();

	const user = useAuthStore((state) => state.user);
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error) {
				console.error('Error getting session:', error);
			}

			setUser(session?.user ?? null);
			setSession(session);
		};

		getInitialSession();

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			setUser(session?.user ?? null);
			setSession(session);
		});

		return () => {
			subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [supabase.auth]);

	const login = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw error;
		}

		return data;
	};

	const signup = async (payload: SignupPayload) => {
		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('Failed to sign up');
			}

			return response.json();
		} catch (error) {
			console.error('Error signing up:', error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw error;
			}

			router.push(PATH_AUTH.signin);
		} catch (error) {
			console.error('Error logging out:', error);
			throw error;
		}
	};

	const resetPassword = async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/password-reset/confirm`,
		});

		if (error) {
			throw error;
		}
	};

	const updatePassword = async (password: string) => {
		const { error } = await supabase.auth.updateUser({
			password,
		});

		if (error) {
			throw error;
		}
	};

	return {
		user,
		session,
		isAuthenticated: !!session,
		login,
		signup,
		logout,
		resetPassword,
		updatePassword,
		accessToken: session?.access_token,
	};
};
