'use client';

import { 
  ReactNode, 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

// Tipo para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Suscripción a cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Limpieza al desmontar
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};