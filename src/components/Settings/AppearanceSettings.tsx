import React, { useState } from 'react';
import { Moon, Sun, Monitor, Loader2, CheckCircle2 } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export function AppearanceSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme>('system');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
    } finally {
      setIsSaving(false);
    }
  };

  const themes: Array<{ id: Theme; label: string; icon: typeof Sun }> = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Appearance</h2>
        <p className="text-sm text-gray-500">
          Customize how Kooki3 looks on your device
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTheme(id)}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors ${
                selectedTheme === id ? 'border-teal-600 bg-teal-50' : ''
              }`}
            >
              <Icon className={`w-6 h-6 ${
                selectedTheme === id ? 'text-teal-600' : 'text-gray-500'
              }`} />
              <span className={`text-sm font-medium ${
                selectedTheme === id ? 'text-teal-600' : 'text-gray-900'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        {saveStatus === 'success' && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Saved successfully</span>
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}