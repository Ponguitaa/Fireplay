'use client'

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { logoutUser } from '@/firebase/auth';
import { useState, useEffect } from 'react';
import SearchBar from './search-bar';

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className={`bg-[var(--color-primary)] text-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 shadow-lg bg-opacity-95 backdrop-blur-sm' : 'py-4'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold tracking-wide hover:scale-105 transition-transform">
            Fireplay
          </Link>
          
          {/* Enlaces principales - solo visibles en desktop */}
          <nav className="hidden md:flex space-x-4">
            <Link 
              href="/games" 
              className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Juegos
            </Link>
          </nav>
        </div>
        
        {/* Buscador */}
        <div className="flex-1 mx-4 animate-fade-in">
          <SearchBar />
        </div>
        
        {/* Botón de hamburguesa para móvil */}
        <button 
          className="md:hidden relative z-50 p-1.5 hover:bg-blue-700 rounded-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <div className="w-6 flex flex-col items-end justify-center space-y-1.5">
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? 'w-6 transform rotate-45 translate-y-2' : 'w-6'
            }`}></span>
            <span className={`block h-0.5 bg-white rounded-full transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100 w-4'
            }`}></span>
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? 'w-6 transform -rotate-45 -translate-y-2' : 'w-5'
            }`}></span>
          </div>
        </button>
        
        {/* Navegación de usuario - visible en desktop */}
        <nav className="hidden md:flex space-x-5 items-center">
          {user ? (
            <>
              <Link 
                href="/favorites" 
                className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white"
              >
                Favoritos
              </Link>
              <Link 
                href="/cart" 
                className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white"
              >
                Carrito
              </Link>
              <Link 
                href="/dashboard" 
                className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white"
              >
                Mi Cuenta
              </Link>
              <button 
                onClick={handleLogout} 
                className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white"
              >
                Salir
              </button>
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-sm transition-transform hover:scale-110 transform cursor-pointer shadow-md">
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-700 px-4 py-2 rounded-md transition-all hover:bg-blue-600 hover:shadow-lg"
              >
                Crear Cuenta
              </Link>
            </>
          )}
        </nav>
        
        {/* Menú móvil */}
        <div className={`fixed inset-0 bg-[var(--color-primary)] md:hidden z-40 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}>
          <div className="h-16"></div> {/* Espacio para el header */}
          <nav className="flex flex-col p-6 space-y-4 animate-slide-down">
            <Link 
              href="/" 
              className="text-2xl font-bold mb-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Fireplay
            </Link>
            
            <Link 
              href="/games" 
              className="hover:bg-blue-700 p-3 rounded-lg transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Juegos
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/favorites" 
                  className="hover:bg-blue-700 p-3 rounded-lg transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoritos
                </Link>
                
                <Link 
                  href="/cart" 
                  className="hover:bg-blue-700 p-3 rounded-lg transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Carrito
                </Link>
                
                <Link 
                  href="/dashboard" 
                  className="hover:bg-blue-700 p-3 rounded-lg transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mi Cuenta
                </Link>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="hover:bg-blue-700 p-3 rounded-lg transition-colors text-left w-full flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
                
                <div className="mt-6 p-4 bg-blue-700 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-lg font-medium shadow-inner">
                      {user.displayName?.[0] || user.email?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-medium">{user.displayName || 'Usuario'}</p>
                      <p className="text-sm text-blue-100">{user.email}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-6 flex flex-col space-y-3">
                <Link 
                  href="/login" 
                  className="bg-blue-700 p-3 rounded-lg text-center transition-colors hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-blue-700 p-3 rounded-lg text-center transition-colors hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Crear Cuenta
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}