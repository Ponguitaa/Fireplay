import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
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

// Tipo para los datos de actualización de perfil
export interface UpdateProfileData {
  displayName?: string;
  photoURL?: string;
  email?: string;
}

// Tipo para los datos de cambio de contraseña
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
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

/**
 * Actualiza el perfil del usuario actual
 */
export const updateUserProfile = async (data: UpdateProfileData): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No hay un usuario autenticado");
    
    // Actualizar el perfil (nombre, foto)
    if (data.displayName || data.photoURL) {
      await updateProfile(currentUser, {
        displayName: data.displayName || currentUser.displayName,
        photoURL: data.photoURL || currentUser.photoURL,
      });
    }
    
    // Actualizar email (requiere reautenticación)
    if (data.email && data.email !== currentUser.email) {
      await updateEmail(currentUser, data.email);
    }
    
  } catch (error: any) {
    const errorMessage = error.message || "Error al actualizar el perfil";
    throw new Error(errorMessage);
  }
};

/**
 * Reautentica al usuario actual (necesario para operaciones sensibles)
 */
export const reauthenticateUser = async (password: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) throw new Error("No hay un usuario autenticado");
    
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
  } catch (error: any) {
    const errorMessage = error.message || "Error al reautenticar";
    throw new Error(errorMessage);
  }
};

/**
 * Cambia la contraseña del usuario actual
 */
export const changeUserPassword = async ({ currentPassword, newPassword }: ChangePasswordData): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No hay un usuario autenticado");
    
    // Primero reautenticar al usuario
    await reauthenticateUser(currentPassword);
    
    // Luego cambiar la contraseña
    await updatePassword(currentUser, newPassword);
  } catch (error: any) {
    const errorMessage = error.message || "Error al cambiar la contraseña";
    throw new Error(errorMessage);
  }
};