import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { GoogleUser } from '../../types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: GoogleUser | null;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: googleUser, loading: googleLoading, signIn, signOut } = useGoogleAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!googleUser);
  }, [googleUser]);

  const login = async (credentials: any) => {
    // Implement traditional login logic if needed
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await signOut();
    setIsAuthenticated(false);
  };

  const googleLogin = async () => {
    await signIn();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading: googleLoading,
        user: googleUser,
        login,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}