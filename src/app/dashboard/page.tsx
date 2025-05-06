'use client';

import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Información del usuario */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl font-semibold text-gray-600">
                    {user?.displayName?.[0] || user?.email?.[0] || '?'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">
                  {user?.displayName || 'Usuario'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h3 className="text-lg font-medium mb-3">Información de contacto</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Nombre:</span> {user?.displayName || 'Sin especificar'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Accesos rápidos */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Panel de usuario</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/favorites"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Mis favoritos</h3>
                    <p className="text-sm text-gray-500">Gestiona tus juegos guardados</p>
                  </div>
                </Link>
                
                <Link 
                  href="/cart"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Mi carrito</h3>
                    <p className="text-sm text-gray-500">Ver carrito de compra</p>
                  </div>
                </Link>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Notificaciones</h3>
                    <p className="text-sm text-gray-500">Configura tus notificaciones</p>
                  </div>
                </div>
                
                <Link 
                  href="/contact"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Contacto</h3>
                    <p className="text-sm text-gray-500">Contáctanos para soporte</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}