import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors flex items-center gap-2"
        aria-label="Open profile menu"
      >
        {user?.profile?.avatar ? (
          <img
            src={user.profile.avatar}
            alt={user.username || "User"}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        )}
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-paper rounded-xl shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden z-50">
          <div className="p-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="text-left">
                <div className="font-medium">Profile Settings</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Manage your account</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}