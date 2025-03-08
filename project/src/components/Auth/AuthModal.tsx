import React, { useState } from 'react';
import { X, Mail, Twitter } from 'lucide-react';
import { Logo } from '../icons/Logo';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const { signInWithGoogle, signInWithTwitter, signInWithEmail, signUpWithEmail, loading, error, clearError } = useSupabaseAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      clearError();
      if (view === 'login') {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.username);
      }
      onClose();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'twitter') => {
    try {
      clearError();
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithTwitter();
      }
      onClose();
    } catch (err) {
      console.error('Social auth error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <Logo className="w-12 h-12 mb-2" />
            <h2 className="text-2xl font-bold text-center">
              {view === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-600 text-center">
              {view === 'login'
                ? 'Sign in to your account to continue'
                : 'Join Kooki3 to discover unique handmade treasures'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialAuth('twitter')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span>Continue with Twitter</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                  minLength={3}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-4 h-4" />
              {loading
                ? view === 'login' ? 'Signing in...' : 'Creating account...'
                : view === 'login' ? 'Sign in with email' : 'Create account with email'}
            </button>
          </form>

          <div className="mt-4 text-center">
            {view === 'login' ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setView('register')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setView('login')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}