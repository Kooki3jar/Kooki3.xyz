import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_STORAGE_KEY, AuthResponse, isTokenExpired } from '../utils/auth';

interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  picture?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!savedAuth) return { user: null, token: null };

      const parsed = JSON.parse(savedAuth);
      if (!parsed.token || isTokenExpired(parsed.token)) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return { user: null, token: null };
      }

      return parsed;
    } catch (error) {
      console.error('Error parsing auth state:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, token: null };
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthResponse = useCallback(async (response: Response): Promise<AuthResponse> => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    const data = await response.json();
    
    if (!data.success || !data.token || !data.user) {
      throw new Error('Invalid response data');
    }

    const newState = { token: data.token, user: data.user };
    setAuthState(newState);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));

    return data;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      await handleAuthResponse(response);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, handleAuthResponse]);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include'
      });

      await handleAuthResponse(response);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, handleAuthResponse]);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({ user: null, token: null });
      localStorage.removeItem(AUTH_STORAGE_KEY);
      navigate('/');
    }
  }, [authState.token, navigate]);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: !!authState.token && !!authState.user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError: () => setError(null),
  };
}