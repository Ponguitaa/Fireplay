'use client';

import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function FavoritesPage() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Juegos Favoritos</h1>
        
        {/* Esta sección será reemplazada por la funcionalidad real de favoritos más adelante */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-xl mb-4">
            Bienvenido, {user?.displayName}. Tu lista de favoritos está vacía.
          </p>
          <p className="mb-6 text-gray-500">
            Explora el catálogo y marca tus juegos preferidos para guardarlos aquí.
          </p>
          <Link 
            href="/games" 
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Explorar Juegos
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}