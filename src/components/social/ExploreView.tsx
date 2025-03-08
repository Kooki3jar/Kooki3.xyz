import React from 'react';
import { Search } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';

export function ExploreView() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discover Creators</h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search creators..."
            className="w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUsers.slice(0, 6).map((user) => (
            <div key={user.id} className="bg-gray-50 dark:bg-dark-hover rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{user.displayName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{user.bio}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{user.followers} followers</span>
                <button className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
          Show more creators
        </button>
      </div>
    </div>
  );
}