'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Game } from '@/types/games.types';
import { addToFavorites, removeFromFavorites, getFavorites } from '@/firebase/favorites';
import { useAuth } from './auth-context';

interface FavoritesContextType {
  favorites: Game[];
  isLoading: boolean;
  addFavorite: (game: Game) => Promise<void>;
  removeFavorite: (gameId: number) => Promise<void>;
  isFavorite: (gameId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userFavorites = await getFavorites(user.uid);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Error cargando favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const addFavorite = async (game: Game) => {
    if (!user) return;
    
    try {
      await addToFavorites(user.uid, game);
      setFavorites([...favorites, game]);
    } catch (error) {
      console.error('Error al añadir favorito:', error);
    }
  };

  const removeFavorite = async (gameId: number) => {
    if (!user) return;
    
    try {
      await removeFromFavorites(user.uid, gameId);
      setFavorites(favorites.filter(game => game.id !== gameId));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  const isFavorite = (gameId: number): boolean => {
    return favorites.some(game => game.id === gameId);
  };

  const value = {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};