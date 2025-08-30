/* eslint-disable no-unused-vars */
import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type AuthState = {
	user: User | null;
	session: Session | null;
};

export type AuthActions = {
	setUser: (user: User | null) => void;
	setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
	user: null,
	session: null,
	setUser: (user: User | null) => set({ user }),
	setSession: (session: Session | null) => set({ session }),
}));
