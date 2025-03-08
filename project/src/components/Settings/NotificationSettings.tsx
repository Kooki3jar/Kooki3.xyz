import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Globe, Loader2, CheckCircle2 } from 'lucide-react';

export function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | null>(null);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    newMessages: true,
    orderUpdates: true,
    newsAndUpdates: false,
  });

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

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h2>
        <p className="text-sm text-gray-500">
          Choose how and when you want to be notified
        </p>
      </div>

      <div className="space-y-6">
        {/* Delivery Methods */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Delivery Methods</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Email Notifications</div>
                  <div className="text-sm text-gray-500">Get updates in your inbox</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Push Notifications</div>
                  <div className="text-sm text-gray-500">Get notified on your device</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Notification Types</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">New Messages</div>
                  <div className="text-sm text-gray-500">When you receive a new message</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.newMessages}
                onChange={(e) => setSettings(prev => ({ ...prev, newMessages: e.target.checked }))}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Order Updates</div>
                  <div className="text-sm text-gray-500">Status changes and shipping updates</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.orderUpdates}
                onChange={(e) => setSettings(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>
          </div>
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