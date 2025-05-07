import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  deleteDoc, 
  query, 
  where, 
  updateDoc 
} from 'firebase/firestore';
import { CartItem } from '@/context/cart-context';

// Colección de carritos en Firestore
const CART_COLLECTION = 'carts';

// Añadir un item al carrito de un usuario
export async function addToFirestoreCart(userId: string, item: CartItem): Promise<void> {
  try {
    const cartItemRef = doc(db, CART_COLLECTION, userId, 'items', item.id.toString());
    await setDoc(cartItemRef, item);
  } catch (error) {
    console.error('Error añadiendo item al carrito en Firestore:', error);
    throw error;
  }
}

// Obtener todos los items del carrito de un usuario
export async function getFirestoreCart(userId: string): Promise<CartItem[]> {
  try {
    const cartItemsRef = collection(db, CART_COLLECTION, userId, 'items');
    const querySnapshot = await getDocs(cartItemsRef);
    
    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => doc.data() as CartItem);
  } catch (error) {
    console.error('Error obteniendo carrito de Firestore:', error);
    throw error;
  }
}

// Eliminar un item del carrito
export async function removeFromFirestoreCart(userId: string, itemId: number): Promise<void> {
  try {
    const cartItemRef = doc(db, CART_COLLECTION, userId, 'items', itemId.toString());
    await deleteDoc(cartItemRef);
  } catch (error) {
    console.error('Error eliminando item del carrito en Firestore:', error);
    throw error;
  }
}

// Actualizar la cantidad de un item en el carrito
export async function updateCartItemQuantity(userId: string, itemId: number, quantity: number): Promise<void> {
  try {
    const cartItemRef = doc(db, CART_COLLECTION, userId, 'items', itemId.toString());
    await updateDoc(cartItemRef, { quantity });
  } catch (error) {
    console.error('Error actualizando cantidad en Firestore:', error);
    throw error;
  }
}

// Limpiar todo el carrito de un usuario
export async function clearFirestoreCart(userId: string): Promise<void> {
  try {
    const cartItemsRef = collection(db, CART_COLLECTION, userId, 'items');
    const querySnapshot = await getDocs(cartItemsRef);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error limpiando carrito en Firestore:', error);
    throw error;
  }
}