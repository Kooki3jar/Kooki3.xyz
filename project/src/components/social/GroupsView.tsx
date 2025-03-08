import React from 'react';
import { Users, Lock } from 'lucide-react';

const mockGroups = [
  {
    id: '1',
    name: 'Ceramic Artists Network',
    members: 1234,
    isPrivate: false,
    description: 'A community for ceramic artists to share techniques and inspiration',
    image: 'https://images.unsplash.com/photo-1565193298357-c5b46b0ac8fb?w=800&q=80'
  },
  {
    id: '2',
    name: 'Digital Art Collectors',
    members: 892,
    isPrivate: true,
    description: 'NFT collectors and digital art enthusiasts',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80'
  }
];

export function GroupsView() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Groups</h2>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Create Group
          </button>
        </div>

        <div className="grid gap-6">
          {mockGroups.map((group) => (
            <div key={group.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-dark-hover rounded-lg">
              <img
                src={group.image}
                alt={group.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{group.name}</h3>
                  {group.isPrivate && (
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>{group.members.toLocaleString()} members</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{group.description}</p>
                <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                  View Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}