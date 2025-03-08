import { useEffect, useState } from 'react';
import { 
  firebaseAuth, 
  firebaseAnalytics,
  firebaseDb,
  firebaseStorage 
} from '../services/firebase';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { logEvent } from 'firebase/analytics';

export function useFirebase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Log analytics event for user state change
      if (user) {
        logEvent(firebaseAnalytics, 'user_authenticated', {
          userId: user.uid,
          method: user.providerData[0]?.providerId || 'unknown'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      logEvent(firebaseAnalytics, 'login', {
        method: 'email'
      });
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      logEvent(firebaseAnalytics, 'sign_up', {
        method: 'email'
      });
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      logEvent(firebaseAnalytics, 'login', {
        method: 'google'
      });
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(firebaseAuth);
      logEvent(firebaseAnalytics, 'logout');
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    auth: firebaseAuth,
    db: firebaseDb,
    storage: firebaseStorage,
  };
}