import { db } from './firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { Game } from '@/types/games.types';

const FAVORITES_COLLECTION = 'favorites';

// Añadir un juego a favoritos
export const addToFavorites = async (userId: string, game: Game): Promise<void> => {
  try {
    const favoriteRef = doc(db, FAVORITES_COLLECTION, `${userId}_${game.id}`);
    await setDoc(favoriteRef, {
      userId,
      gameId: game.id,
      game,
      addedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error al añadir favorito:', error);
    throw error;
  }
};

// Eliminar un juego de favoritos
export const removeFromFavorites = async (userId: string, gameId: number): Promise<void> => {
  try {
    const favoriteRef = doc(db, FAVORITES_COLLECTION, `${userId}_${gameId}`);
    await deleteDoc(favoriteRef);
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    throw error;
  }
};

// Obtener todos los favoritos de un usuario
export const getFavorites = async (userId: string): Promise<Game[]> => {
  try {
    const favoritesQuery = query(
      collection(db, FAVORITES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(favoritesQuery);
    const favorites: Game[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      favorites.push(data.game as Game);
    });
    
    return favorites;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
};

// Comprobar si un juego está en favoritos
export const isFavorite = async (userId: string, gameId: number): Promise<boolean> => {
  try {
    const favoritesQuery = query(
      collection(db, FAVORITES_COLLECTION),
      where('userId', '==', userId),
      where('gameId', '==', gameId)
    );
    
    const querySnapshot = await getDocs(favoritesQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error al comprobar favorito:', error);
    throw error;
  }
};