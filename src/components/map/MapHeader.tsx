import React from 'react';
import { Search, Store, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

interface MapHeaderProps {
  showEvents: boolean;
  showBusinesses: boolean;
  searchQuery: string;
  onToggleEvents: () => void;
  onToggleBusinesses: () => void;
  onSearchChange: (query: string) => void;
}

export function MapHeader({
  showEvents,
  showBusinesses,
  searchQuery,
  onToggleEvents,
  onToggleBusinesses,
  onSearchChange
}: MapHeaderProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Title and Toggle Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Explore Map</h1>
            <div className="flex items-center gap-3">
              <VisibilityToggle
                icon={Calendar}
                label="Events"
                isActive={showEvents}
                onClick={onToggleEvents}
              />
              <VisibilityToggle
                icon={Store}
                label="Businesses"
                isActive={showBusinesses}
                onClick={onToggleBusinesses}
              />
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events and businesses..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 h-11 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisibilityToggle({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 h-11 rounded-lg transition-colors ${
        isActive 
          ? 'bg-teal-50 text-teal-600 hover:bg-teal-100' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label={`Toggle ${label} visibility`}
      aria-pressed={isActive}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
    </button>
  );
}