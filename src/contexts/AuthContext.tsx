import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("asme_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - will be replaced with Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!email || !password) {
      return { success: false, error: "Email et mot de passe requis" };
    }

    // Mock user creation
    const mockUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      isAdmin: email.includes("admin")
    };

    setUser(mockUser);
    localStorage.setItem("asme_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!name || !email || !password) {
      return { success: false, error: "Tous les champs sont requis" };
    }

    if (password.length < 6) {
      return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" };
    }

    const mockUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      isAdmin: false
    };

    setUser(mockUser);
    localStorage.setItem("asme_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("asme_user");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
