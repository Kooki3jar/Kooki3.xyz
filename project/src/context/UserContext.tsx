import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateProfile: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('kooki3_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        return null;
      }
    }
    
    // Default user for development
    return {
      id: 'user123',
      email: 'user@example.com',
      username: 'user123',
      linkedWallets: {},
      profile: {
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Digital art enthusiast and collector',
        location: 'New York, NY',
        phone: '',
        privacySettings: {
          showLocation: true,
          showContact: true,
          showSocial: true,
        },
        socialLinks: {
          twitter: '',
          linkedin: '',
          instagram: '',
        }
      }
    };
  });

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('kooki3_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}