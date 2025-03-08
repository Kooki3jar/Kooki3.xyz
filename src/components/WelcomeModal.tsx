import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { LogoWithText } from './icons/Logo';
import { AuthModal } from './Auth/AuthModal';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: 'connect' | 'visitor') => Promise<void>;
}

export function WelcomeModal({ isOpen, onClose, onAction }: WelcomeModalProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('register');

  const handleAuthClick = (view: 'login' | 'register') => {
    setAuthView(view);
    setShowAuth(true);
  };

  const handleVisitorAction = async () => {
    if (onAction) {
      await onAction('visitor');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-dark-paper rounded-2xl w-full max-w-md relative animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <LogoWithText className="h-24" showTagline={true} />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleAuthClick('register')}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Create Account
              </button>

              <button
                onClick={() => handleAuthClick('login')}
                className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-active text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>

              <button
                onClick={handleVisitorAction}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <User className="w-5 h-5" />
                Continue as Visitor
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
              By continuing, you agree to Kooki3's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialView={authView}
      />
    </>
  );
}