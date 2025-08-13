'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isAuthenticated && !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
