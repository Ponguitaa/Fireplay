'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useFavorites } from '@/context/favorites-context';
import { useCart } from '@/context/cart-context';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

interface StatsProps {
  favoritesCount: number;
  cartCount: number;
  messagesCount: number;
  lastLogin: string;
  loginCount: number;
  mostViewedCategories: {name: string, count: number}[];
  recentActivity: {type: string, date: string, item: string}[];
}

export default function UserStats() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatsProps>({
    favoritesCount: 0,
    cartCount: 0,
    messagesCount: 0,
    lastLogin: '',
    loginCount: 0,
    mostViewedCategories: [],
    recentActivity: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        setIsLoading(true);
        
        // Obtener recuento de mensajes
        const messagesQuery = query(
          collection(db, 'contactMessages'),
          where('email', '==', user.email)
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesCount = messagesSnapshot.size;
        
        // Simular datos de categorías más vistas
        const categories = [
          { name: 'Acción', count: Math.floor(Math.random() * 30) + 5 },
          { name: 'Aventura', count: Math.floor(Math.random() * 25) + 3 },
          { name: 'RPG', count: Math.floor(Math.random() * 20) + 2 },
          { name: 'Estrategia', count: Math.floor(Math.random() * 15) + 1 }
        ].sort((a, b) => b.count - a.count);
        
        // Simular actividad reciente
        const activities = [
          { type: 'vista', date: new Date(Date.now() - 3600000 * 2).toLocaleDateString(), item: 'The Witcher 3' },
          { type: 'favorito', date: new Date(Date.now() - 3600000 * 24).toLocaleDateString(), item: 'Cyberpunk 2077' },
          { type: 'carrito', date: new Date(Date.now() - 3600000 * 48).toLocaleDateString(), item: 'Elden Ring' },
          { type: 'mensaje', date: new Date(Date.now() - 3600000 * 72).toLocaleDateString(), item: 'Soporte técnico' }
        ];
        
        // Simular datos de login
        const loginCount = Math.floor(Math.random() * 20) + 5;
        const lastLogin = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        
        // Actualizar estado con todos los datos
        setStats({
          favoritesCount: favorites?.length || 0,
          cartCount: cartItems?.length || 0,
          messagesCount,
          lastLogin,
          loginCount,
          mostViewedCategories: categories,
          recentActivity: activities
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, favorites, cartItems]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
        <h2 className="text-xl font-semibold mb-4 bg-gray-200 dark:bg-gray-700 h-8 w-1/3 rounded"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Estadísticas de Uso</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Favoritos */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Juegos favoritos</p>
              <p className="text-2xl font-bold">{stats.favoritesCount}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-100">
            Última actualización: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {/* Carrito */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">En carrito</p>
              <p className="text-2xl font-bold">{stats.cartCount}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-green-100">
            Última actualización: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {/* Mensajes */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-yellow-100">Mensajes enviados</p>
              <p className="text-2xl font-bold">{stats.messagesCount}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-yellow-100">
            Última actualización: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {/* Sesiones */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100">Inicios de sesión</p>
              <p className="text-2xl font-bold">{stats.loginCount}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-100">
            Último acceso: {stats.lastLogin}
          </div>
        </div>
      </div>
      
      {/* Categorías más vistas y actividad reciente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">Categorías más vistas</h3>
          <div className="space-y-3">
            {stats.mostViewedCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
                    {category.count} visitas
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 h-1.5 rounded-full">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(100, (category.count / 30) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">Actividad reciente</h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                    ${activity.type === 'vista' ? 'bg-gray-200 dark:bg-gray-600' : 
                      activity.type === 'favorito' ? 'bg-blue-100 dark:bg-blue-800' : 
                      activity.type === 'carrito' ? 'bg-green-100 dark:bg-green-800' : 
                      'bg-yellow-100 dark:bg-yellow-800'}`}>
                    {activity.type === 'vista' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {activity.type === 'favorito' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {activity.type === 'carrito' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {activity.type === 'mensaje' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity.item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}