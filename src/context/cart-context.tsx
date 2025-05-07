'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Game, GameDetails } from '@/types/games.types';
import { useAuth } from './auth-context';
import { addToFirestoreCart, getFirestoreCart, removeFromFirestoreCart, updateCartItemQuantity } from '@/firebase/cart';

// Definir el tipo CartItem para los elementos del carrito
export interface CartItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Definir el tipo para el contexto del carrito
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: GameDetails, price: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  isInCart: (id: number) => boolean;
}

// Crear el contexto
const CartContext = createContext<CartContextType | null>(null);

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto para el carrito
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, loading } = useAuth();

  // Cargar carrito cuando cambia el estado de autenticación
  useEffect(() => {
    const loadCart = async () => {
      // Si hay un usuario autenticado, cargamos de Firestore
      if (user && !loading) {
        try {
          const firestoreCart = await getFirestoreCart(user.uid);
          if (firestoreCart) {
            setCartItems(firestoreCart);
          } else if (localStorage.getItem('fireplayCart')) {
            // Si hay elementos en localStorage, los sincronizamos con Firestore
            const localCart = JSON.parse(localStorage.getItem('fireplayCart') || '[]');
            setCartItems(localCart);
            // Sincronizar con Firestore (esto se maneja en useEffect abajo)
          }
        } catch (error) {
          console.error('Error al cargar el carrito de Firestore:', error);
          
          // Intentar recuperar de localStorage como respaldo
          const localCart = JSON.parse(localStorage.getItem('fireplayCart') || '[]');
          setCartItems(localCart);
        }
      } 
      // Si no hay usuario o está cargando, usamos localStorage
      else if (!user && !loading) {
        const localCart = JSON.parse(localStorage.getItem('fireplayCart') || '[]');
        setCartItems(localCart);
      }
    };

    loadCart();
  }, [user, loading]);

  // Sincronizar carrito con localStorage y/o Firestore cuando cambia
  useEffect(() => {
    // Siempre guardamos en localStorage para tener un respaldo
    localStorage.setItem('fireplayCart', JSON.stringify(cartItems));
    
    // Si hay un usuario autenticado, sincronizamos con Firestore
    const syncWithFirestore = async () => {
      if (user && !loading && cartItems.length > 0) {
        // En un entorno real, deberíamos manejar la sincronización de manera más eficiente
        // Para simplificar, sobrescribimos todo el carrito en Firestore
        for (const item of cartItems) {
          try {
            await addToFirestoreCart(user.uid, item);
          } catch (error) {
            console.error('Error al sincronizar con Firestore:', error);
          }
        }
      }
    };

    if (user && !loading) {
      syncWithFirestore();
    }
  }, [cartItems, user, loading]);

  // Añadir item al carrito
  const addToCart = async (game: GameDetails, price: number) => {
    const existingItem = cartItems.find(item => item.id === game.id);
    
    if (existingItem) {
      // Si el item ya existe, incrementamos la cantidad
      updateQuantity(game.id, existingItem.quantity + 1);
    } else {
      // Si es un nuevo item, lo añadimos al carrito
      const newItem: CartItem = {
        id: game.id,
        slug: game.slug,
        name: game.name,
        image: game.background_image,
        price: price,
        quantity: 1
      };
      
      setCartItems(prev => [...prev, newItem]);
      
      // Si el usuario está autenticado, sincronizar con Firestore
      if (user) {
        try {
          await addToFirestoreCart(user.uid, newItem);
        } catch (error) {
          console.error('Error al añadir item a Firestore:', error);
        }
      }
    }
  };

  // Eliminar item del carrito
  const removeFromCart = async (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    // Si el usuario está autenticado, sincronizar con Firestore
    if (user) {
      try {
        await removeFromFirestoreCart(user.uid, id);
      } catch (error) {
        console.error('Error al eliminar item de Firestore:', error);
      }
    }
  };

  // Actualizar cantidad de un item
  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    // Si el usuario está autenticado, sincronizar con Firestore
    if (user) {
      try {
        await updateCartItemQuantity(user.uid, id, quantity);
      } catch (error) {
        console.error('Error al actualizar cantidad en Firestore:', error);
      }
    }
  };

  // Vaciar el carrito
  const clearCart = async () => {
    setCartItems([]);
    
    // Limpiar localStorage
    localStorage.removeItem('fireplayCart');
    
    // Si el usuario está autenticado, limpiar en Firestore
    if (user) {
      try {
        // En un caso real, tendríamos un método específico para esto
        for (const item of cartItems) {
          await removeFromFirestoreCart(user.uid, item.id);
        }
      } catch (error) {
        console.error('Error al limpiar carrito en Firestore:', error);
      }
    }
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Verificar si un juego ya está en el carrito
  const isInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};