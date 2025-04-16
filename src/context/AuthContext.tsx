import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../service/interface/User";
import { TokenService } from "../service/api/token.service";
import { apiClient } from "../service/api/apiClient";
import { AuthService } from "../service/auth/auth.service";


// 2. Tipo para el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

// 3. Crear el contexto con tipo explícito
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchUser = async () => {
    try {
      const token = TokenService.getToken();
      if (!token) return;
      
      const data = await AuthService.me();
      setUser(data)
    } catch (error) {
      console.error('Error al cargar usuario logueado:', error);
      TokenService.clearTokens();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
