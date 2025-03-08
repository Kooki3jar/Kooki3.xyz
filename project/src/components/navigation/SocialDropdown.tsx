import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Users, MessageCircle, Bell, Calendar, 
  Lock, Group, Send, Activity
} from 'lucide-react';

const sections = [
  {
    title: 'Feed',
    items: [
      { icon: Home, label: 'Global Feed', description: 'Public posts from all users', to: '/social' },
      { icon: Lock, label: 'NFT Community', description: 'Exclusive NFT-gated content', to: '/social/nft-feed' }
    ]
  },
  {
    title: 'Groups',
    items: [
      { icon: Group, label: 'Directory', description: 'Browse and join groups', to: '/social/groups' },
      { icon: Lock, label: 'NFT Groups', description: 'Token-gated communities', to: '/social/groups/nft' }
    ]
  },
  {
    title: 'Profile',
    items: [
      { icon: Activity, label: 'Activity', description: 'Your posts and interactions', to: '/social/profile/activity' },
      { icon: Calendar, label: 'Events', description: 'Your upcoming events', to: '/social/profile/events' }
    ]
  },
  {
    title: 'Messages',
    items: [
      { icon: MessageCircle, label: 'Inbox', description: 'Private conversations', to: '/social/messages' },
      { icon: Send, label: 'Requests', description: 'Message requests', to: '/social/messages/requests' },
      { icon: Users, label: 'Group Chats', description: 'Group conversations', to: '/social/messages/groups' }
    ]
  },
  {
    title: 'Notifications',
    items: [
      { icon: Bell, label: 'All', description: 'View all notifications', to: '/social/notifications' },
      { icon: Lock, label: 'NFT Updates', description: 'Collection activity', to: '/social/notifications/nft' }
    ]
  }
];

export function SocialDropdown() {
  return (
    <div className="absolute top-full left-0 w-screen bg-white dark:bg-dark-paper shadow-lg border-b dark:border-dark z-50 transform translate-y-0.5 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs">{section.title}</h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors group"
                      >
                        <div className="p-0.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                          <Icon className="w-3 h-3" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-xs">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}