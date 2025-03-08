import React from 'react';
import { Search, Edit } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';

export function MessagesView() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm overflow-hidden">
      <div className="flex h-[600px]">
        {/* Conversations List */}
        <div className="w-80 border-r dark:border-dark-border">
          <div className="p-4 border-b dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">Messages</h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full">
                <Edit className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(600px-89px)]">
            {mockUsers.slice(0, 10).map((user) => (
              <button
                key={user.id}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900 dark:text-white">{user.displayName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Click to start a conversation</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}