import React from 'react';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { Loader2 } from 'lucide-react';

export function GoogleAuthButton() {
  const { signInWithGoogle, loading, error } = useSupabaseAuth();

  const handleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google sign in error:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
      )}
      <span>{loading ? 'Connecting...' : 'Continue with Google'}</span>
    </button>
  );
}