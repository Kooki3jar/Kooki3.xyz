import React, { useState } from 'react';
import { Calendar, DollarSign, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EventMapFiltersProps {
  onFilterChange: (filters: EventFilters) => void;
  isCollapsed?: boolean;
}

export interface EventFilters {
  categories: string[];
  startDate: Date | null;
  endDate: Date | null;
  priceRange: [number, number];
  radius: number;
}

export function EventMapFilters({ onFilterChange, isCollapsed = false }: EventMapFiltersProps) {
  const [filters, setFilters] = useState<EventFilters>({
    categories: [],
    startDate: null,
    endDate: null,
    priceRange: [0, 500],
    radius: 25,
  });

  const categories = [
    { id: 'meetup', label: 'Meetups' },
    { id: 'conference', label: 'Conferences' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'exhibition', label: 'Exhibitions' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRadiusChange = (value: number) => {
    const newFilters = { ...filters, radius: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (isCollapsed) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-80">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Event Type</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category.id}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Date Range</h4>
          <div className="space-y-2">
            <DatePicker
              selected={filters.startDate}
              onChange={date => {
                const newFilters = { ...filters, startDate: date };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              placeholderText="Start date"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <DatePicker
              selected={filters.endDate}
              onChange={date => {
                const newFilters = { ...filters, endDate: date };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              placeholderText="End date"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
          <div className="px-2">
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange([filters.priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Search Radius</h4>
          <div className="px-2">
            <input
              type="range"
              min={1}
              max={50}
              value={filters.radius}
              onChange={(e) => handleRadiusChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>1 mile</span>
              <span>{filters.radius} miles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}