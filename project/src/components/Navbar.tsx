import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, Bell, User, Moon, Sun, Calendar } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { LogoWithText } from './icons/Logo';
import { SecondaryNav } from './SecondaryNav';
import { NotificationBadge } from './social/NotificationBadge';
import { useTheme } from '../context/ThemeContext';
import { Calendar as CalendarComponent } from './calendar/Calendar';
import { useUser } from '../context/UserContext';

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-dark bg-gray-200 dark:bg-dark-card"
      role="switch"
      aria-checked={isDark}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className={`${
          isDark ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isDark ? 'bg-teal-500' : ''
        }`}
      />
      <Sun className={`absolute left-1 w-4 h-4 ${isDark ? 'opacity-0' : 'opacity-100'} transition-opacity text-teal-600`} />
      <Moon className={`absolute right-1 w-4 h-4 ${isDark ? 'opacity-100' : 'opacity-0'} transition-opacity text-teal-400`} />
    </button>
  );
}

export function ProfileActions() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <button 
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
        aria-label="View favorites"
      >
        <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      <div className="relative">
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
          aria-label="View calendar"
        >
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        {showCalendar && (
          <CalendarComponent onClose={() => setShowCalendar(false)} />
        )}
      </div>
      <button 
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
        aria-label="View cart"
      >
        <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      <Link 
        to="/notifications"
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <NotificationBadge count={3} />
      </Link>
      <Link
        to="/profile"
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
        aria-label="View profile"
      >
        {user?.profile?.avatar ? (
          <img
            src={user.profile.avatar}
            alt={user.username}
            className="w-5 h-5 rounded-full object-cover"
          />
        ) : (
          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </Link>
      <ThemeToggle />
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-paper transition-colors duration-200">
      <nav className="border-b dark:border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                className="sm:hidden p-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 dark:text-gray-400" />
              </button>
              <Link to="/" className="flex items-center">
                <LogoWithText className="h-8" />
              </Link>
            </div>
            
            <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for unique items..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-dark focus:outline-none focus:border-teal-500 dark:bg-dark-card dark:text-dark-primary dark:placeholder-gray-500"
                  aria-label="Search"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <WalletConnect />
              <div className="h-6 w-px bg-gray-200 dark:bg-dark-light" />
              <ProfileActions />
            </div>
          </div>
        </div>
      </nav>
      <SecondaryNav />
    </header>
  );
}