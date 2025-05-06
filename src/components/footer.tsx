'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function Footer() {
  const { user } = useAuth();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-wide">Fireplay</Link>
            <p className="mt-3 text-gray-400 text-sm">
              Tu tienda online de videojuegos para PC y consolas
            </p>
            
            {/* Mostrar saludo al usuario */}
            {user && (
              <p className="mt-3 text-gray-400 text-sm">
                Gracias por visitarnos, {user.displayName || 'Usuario'}
              </p>
            )}
          </div>
          
          {/* Enlaces útiles */}
          <div>
            <h3 className="text-base font-semibold mb-4">Enlaces útiles</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/games" className="hover:text-white transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Información */}
          <div>
            <h3 className="text-base font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contacto y RRSS */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Formulario de contacto
                </Link>
              </li>
              <li className="flex space-x-4 mt-4">
                {/* Iconos de redes sociales */}
                <a href="https://twitter.com/fireplay" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.13 1.196 4.92 4.92 0 00-8.39 4.49c-4.09-.21-7.72-2.17-10.15-5.15a4.92 4.92 0 001.52 6.57 4.913 4.913 0 01-2.23-.616v.061a4.926 4.926 0 003.95 4.83 4.913 4.913 0 01-2.23.085 4.927 4.927 0 004.6 3.42A9.88 9.88 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://facebook.com/fireplay" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                  </svg>
                </a>
                <a href="https://instagram.com/fireplay" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}