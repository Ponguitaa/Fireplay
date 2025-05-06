import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Tipo para los datos de registro
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Tipo para los datos de login
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Registra un nuevo usuario con nombre, email y contraseña
 */
export const registerUser = async ({ name, email, password }: RegisterData): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar el perfil con el nombre del usuario
    await updateProfile(userCredential.user, {
      displayName: name
    });
    
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || "Error al registrar usuario";
    throw new Error(errorMessage);
  }
};

/**
 * Inicia sesión con email y contraseña
 */
export const loginUser = async ({ email, password }: LoginData): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || "Error al iniciar sesión";
    throw new Error(errorMessage);
  }
};

/**
 * Cierra la sesión del usuario actual
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    const errorMessage = error.message || "Error al cerrar sesión";
    throw new Error(errorMessage);
  }
};