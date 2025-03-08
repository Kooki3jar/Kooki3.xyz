import React from 'react';
import { Filter, Lock } from 'lucide-react';

interface EventFiltersProps {
  selectedCategory: string;
  showNFTOnly: boolean;
  onCategoryChange: (category: string) => void;
  onNFTFilterChange: (show: boolean) => void;
}

export function EventFilters({
  selectedCategory,
  showNFTOnly,
  onCategoryChange,
  onNFTFilterChange
}: EventFiltersProps) {
  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'meetup', label: 'Meetups' },
    { id: 'conference', label: 'Conferences' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'exhibition', label: 'Exhibitions' },
  ];

  return (
    <div className="flex gap-4">
      <div className="w-48">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:border-dark-border dark:text-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onNFTFilterChange(!showNFTOnly)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          showNFTOnly
            ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
            : 'border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
        }`}
      >
        <Lock className="w-4 h-4" />
        NFT Required
      </button>
    </div>
  );
}