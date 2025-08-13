import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthStore {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    updateToken: (body: { accessToken: string, refreshToken: string }) => void;
    logout: () => void;
    setAuth: (user: User, accessToken: string) => void;
    clearAuth: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setAuth: (user, accessToken) => set({
                user,
                accessToken,
                isAuthenticated: true
            }),

            clearAuth: () => set({
                user: null,
                accessToken: null,
                isAuthenticated: false
            }),

            updateToken: (body: { accessToken: string, refreshToken: string }) => set({
                ...body
            }),

            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,

                })
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);