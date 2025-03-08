import React from 'react';
import { useTheme } from '../context/ThemeContext';

export function ThemeTest() {
  const { isDark } = useTheme();

  return (
    <div className="p-8 space-y-6">
      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-bold">Theme Test Component</h2>
        <p className="text-gray-600 dark:text-dark-secondary">
          Current theme: {isDark ? 'Dark' : 'Light'}
        </p>
        
        {/* Test Buttons */}
        <div className="space-y-2">
          <button className="btn-primary w-full py-2 px-4 rounded-lg">
            Primary Button
          </button>
          <button className="btn-secondary w-full py-2 px-4 rounded-lg">
            Secondary Button
          </button>
        </div>

        {/* Test Form Elements */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Test Input"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500"
          />
          <select className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500">
            <option>Test Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>

        {/* Test Card */}
        <div className="bg-gray-50 dark:bg-dark-card p-4 rounded-lg">
          <p className="text-sm">
            This is a nested card to test background contrast
          </p>
        </div>
      </div>

      {/* Color Palette Test */}
      <div className="card p-6">
        <h3 className="font-bold mb-4">Color Palette Test</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-4 bg-dark-paper text-dark-primary rounded">Dark Paper</div>
          <div className="p-4 bg-dark-card text-dark-primary rounded">Dark Card</div>
          <div className="p-4 bg-dark-hover text-dark-primary rounded">Dark Hover</div>
          <div className="p-4 bg-dark-active text-dark-primary rounded">Dark Active</div>
        </div>
      </div>

      {/* Typography Test */}
      <div className="card p-6 space-y-2">
        <h1 className="text-2xl font-bold">Heading 1</h1>
        <h2 className="text-xl font-bold">Heading 2</h2>
        <p className="text-gray-600 dark:text-dark-secondary">Secondary Text</p>
        <p className="text-gray-500 dark:text-dark-muted">Muted Text</p>
        <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Link Text</a>
      </div>
    </div>
  );
}