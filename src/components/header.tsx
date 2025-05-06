'use client'

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { logoutUser } from '@/firebase/auth';
import { useState } from 'react';
import SearchBar from './search-bar';

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-[var(--color-primary)] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold tracking-wide">Fireplay</Link>
          
          {/* Enlaces principales - solo visibles en desktop */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/games" className="hover:underline">Juegos</Link>
          </nav>
        </div>
        
        {/* Buscador */}
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        
        {/* Botón de hamburguesa para móvil */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
        
        {/* Navegación de usuario - visible en desktop */}
        <nav className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <Link href="/favorites" className="hover:underline">Favoritos</Link>
              <Link href="/cart" className="hover:underline">Carrito</Link>
              <Link href="/dashboard" className="hover:underline">Mi Cuenta</Link>
              <button 
                onClick={handleLogout} 
                className="hover:underline"
              >
                Salir
              </button>
              <div className="px-3 py-1 bg-blue-700 rounded-full text-sm">
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Iniciar Sesión</Link>
              <Link href="/register" className="hover:underline bg-blue-700 px-3 py-1 rounded">Crear Cuenta</Link>
            </>
          )}
        </nav>
        
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[var(--color-primary)] md:hidden shadow-lg">
            <nav className="flex flex-col p-4 space-y-2">
              <Link href="/games" className="hover:bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                Juegos
              </Link>
              {user ? (
                <>
                  <Link href="/favorites" className="hover:bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                    Favoritos
                  </Link>
                  <Link href="/cart" className="hover:bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                    Carrito
                  </Link>
                  <Link href="/dashboard" className="hover:bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                    Mi Cuenta
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="hover:bg-blue-700 p-2 rounded text-left w-full"
                  >
                    Cerrar sesión
                  </button>
                  <div className="p-2 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-sm">
                      {user.displayName?.[0] || user.email?.[0] || '?'}
                    </div>
                    <span className="font-medium">{user.displayName || user.email}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                    Iniciar Sesión
                  </Link>
                  <Link href="/register" className="bg-blue-700 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                    Crear Cuenta
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}