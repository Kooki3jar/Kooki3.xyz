import { useState, useCallback } from 'react';
import { signInWithSocial, signOut, signInWithEmail as supabaseSignInWithEmail, signUpWithEmail as supabaseSignUpWithEmail } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function useSupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSocialAuth = useCallback(async (provider: 'google' | 'twitter') => {
    try {
      setLoading(true);
      setError(null);
      
      // In WebContainer, we'll simulate a successful auth flow
      if (window.location.hostname.includes('webcontainer')) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just navigate to the home page
        navigate('/');
        return;
      }
      
      await signInWithSocial(provider);
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to sign in with ${provider}`;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In WebContainer, we'll simulate a successful sign out
      if (window.location.hostname.includes('webcontainer')) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate('/login');
        return;
      }
      
      await signOut();
      navigate('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In WebContainer, we'll simulate a successful sign in
      if (window.location.hostname.includes('webcontainer')) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just navigate to the home page
        navigate('/');
        return;
      }
      
      await supabaseSignInWithEmail(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signUpWithEmail = useCallback(async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In WebContainer, we'll simulate a successful sign up
      if (window.location.hostname.includes('webcontainer')) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just navigate to the home page
        navigate('/');
        return;
      }
      
      await supabaseSignUpWithEmail(email, password, username);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign up';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return {
    signInWithGoogle: () => handleSocialAuth('google'),
    signInWithTwitter: () => handleSocialAuth('twitter'),
    signInWithEmail,
    signUpWithEmail,
    signOut: handleSignOut,
    loading,
    error,
    clearError: () => setError(null)
  };
}