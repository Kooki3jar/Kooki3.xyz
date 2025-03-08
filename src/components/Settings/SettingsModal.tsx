import React, { useState } from 'react';
import { X, User, Bell, Shield, Palette, ChevronRight } from 'lucide-react';
import { ProfileSettings } from './ProfileSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';

type SettingsView = 'profile' | 'notifications' | 'security' | 'appearance';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [currentView, setCurrentView] = useState<SettingsView>('profile');

  if (!isOpen) return null;

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your personal information' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Configure how you receive updates' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password and account security' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Customize your experience' },
  ] as const;

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r bg-gray-50">
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <nav className="p-2">
            {menuItems.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id as SettingsView)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  currentView === id
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    currentView === id ? 'text-teal-600' : 'text-gray-500'
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium ${
                      currentView === id ? 'text-teal-600' : 'text-gray-900'
                    }`}>
                      {label}
                    </div>
                    <div className="text-xs text-gray-500">{description}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${
                  currentView === id ? 'text-teal-600' : 'text-gray-400'
                }`} />
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-full">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}