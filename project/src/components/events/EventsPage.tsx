import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { EventCard } from './EventCard';
import { EventFilters } from './EventFilters';
import { useEvents } from '../../hooks/useEvents';
import { Event } from '../../types/event';

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNFTOnly, setShowNFTOnly] = useState(false);
  const { events, isLoading, error } = useEvents();

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesNFTFilter = !showNFTOnly || event.nftRequired;

      return matchesSearch && matchesCategory && matchesNFTFilter;
    });
  }, [events, searchQuery, selectedCategory, showNFTOnly]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover and join events from our community
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name, description, or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:border-dark-border dark:text-white"
              />
            </div>
          </div>

          <EventFilters
            selectedCategory={selectedCategory}
            showNFTOnly={showNFTOnly}
            onCategoryChange={setSelectedCategory}
            onNFTFilterChange={setShowNFTOnly}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-teal-600 dark:border-teal-400 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 dark:text-red-400 mb-2">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
            >
              Try again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}