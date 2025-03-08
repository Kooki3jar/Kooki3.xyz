import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NavDropdownProps {
  items: {
    name: string;
    description?: string;
    icon?: React.ElementType;
    to: string;
  }[];
}

export function NavDropdown({ items }: NavDropdownProps) {
  return (
    <div className="absolute top-full left-0 w-screen bg-white dark:bg-dark-paper shadow-lg border-b dark:border-dark z-50 transform translate-y-0.5 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors group focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-dark"
              >
                {Icon && (
                  <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm">
                      {item.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}