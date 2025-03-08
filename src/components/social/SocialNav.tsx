import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Bell, MessageCircle, Compass, Hash } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Feed', path: '/social' },
  { icon: Users, label: 'Groups', path: '/social/groups' },
  { icon: MessageCircle, label: 'Messages', path: '/social/messages' },
  { icon: Bell, label: 'Notifications', path: '/social/notifications' },
  { icon: Compass, label: 'Discover', path: '/social/discover' },
  { icon: Hash, label: 'Trending', path: '/social/trending' }
];

export function SocialNav() {
  const location = useLocation();

  return (
    <nav className="bg-white rounded-xl shadow-sm p-4">
      <div className="space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}