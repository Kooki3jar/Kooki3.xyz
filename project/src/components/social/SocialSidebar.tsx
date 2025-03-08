import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, Users, MessageCircle, Bookmark, TrendingUp } from 'lucide-react';

export type SocialTab = 'feed' | 'explore' | 'groups' | 'messages' | 'saved';

interface SocialSidebarProps {
  activeTab: SocialTab;
  onTabChange: (tab: SocialTab) => void;
}

export function SocialSidebar({ activeTab, onTabChange }: SocialSidebarProps) {
  const tabs = [
    { id: 'feed', label: 'Feed', icon: TrendingUp },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ] as const;

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4">
      <nav className="space-y-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}