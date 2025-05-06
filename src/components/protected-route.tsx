'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si ya se cargó la autenticación y no hay usuario, redirigir al login
    if (!isLoading && !user) {
      // Guardar la ruta actual para redirigir después del login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    }
  }, [user, isLoading, router, pathname]);

  // Mientras se verifica la autenticación, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  // Si hay un usuario autenticado, mostrar el contenido protegido
  return user ? <>{children}</> : null;
}