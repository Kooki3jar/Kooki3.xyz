import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PersonalInfoForm } from './PersonalInfoForm';
import { PasswordForm } from './PasswordForm';
import { PreferencesForm } from './PreferencesForm';
import StoreManagement from './StoreManagement';
import { WalletSettings } from './WalletSettings';
import { Settings, Lock, Bell, Store, Wallet } from 'lucide-react';
import { LogoWithText } from '../icons/Logo';
import { Link } from 'react-router-dom';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('userProfileTab') || 'personal';
  });

  useEffect(() => {
    localStorage.setItem('userProfileTab', activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'store', label: 'Store Management', icon: Store },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <header className="bg-white dark:bg-dark-paper shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center"
            >
              <LogoWithText className="h-8" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-dark-paper rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-dark-border">
            <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === id
                      ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && <PersonalInfoForm />}
            {activeTab === 'security' && <PasswordForm />}
            {activeTab === 'preferences' && <PreferencesForm />}
            {activeTab === 'store' && <StoreManagement />}
            {activeTab === 'wallets' && <WalletSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}