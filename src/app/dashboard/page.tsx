'use client';

import { useAuth } from "@/context/auth-context";
import ProfileEditor from "@/components/profile-editor";
import ProtectedRoute from "@/components/protected-route";
import UserMessages from "@/components/user-messages";
import UserStats from "@/components/user-stats";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');

  // Envolver en componente de ruta protegida
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Mi Cuenta
        </h1>

        {/* Tabs de navegación */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === 'perfil'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Perfil
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('estadisticas')}
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === 'estadisticas'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Estadísticas
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('mensajes')}
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === 'mensajes'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Mis Mensajes
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === 'pedidos'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Mis Pedidos
              </button>
            </li>
          </ul>
        </div>

        {/* Contenido de las pestañas */}
        <div className="animate-fade-in">
          {activeTab === 'perfil' && (
            <div>
              <ProfileEditor />
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/favorites" className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl flex items-center hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">Mis Favoritos</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ver juegos guardados</p>
                    </div>
                  </Link>

                  <Link href="/cart" className="bg-green-50 dark:bg-green-900 p-4 rounded-xl flex items-center hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                    <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">Mi Carrito</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ver productos en carrito</p>
                    </div>
                  </Link>
                  
                  <Link href="/games" className="bg-purple-50 dark:bg-purple-900 p-4 rounded-xl flex items-center hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">Catálogo</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Explorar juegos</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'estadisticas' && (
            <UserStats />
          )}
          
          {activeTab === 'mensajes' && (
            <UserMessages />
          )}
          
          {activeTab === 'pedidos' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center py-12">
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">No hay pedidos aún</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Parece que todavía no has realizado ninguna compra en nuestra tienda.
                </p>
                <Link href="/games" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors">
                  Explorar juegos
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}