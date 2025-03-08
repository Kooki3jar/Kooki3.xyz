import React, { useState } from 'react';
import { KeyRound, Shield, Smartphone, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    deviceHistory: true,
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
    <div className="p-6 space-y-8 bg-white dark:bg-dark-card rounded-xl shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Security Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account security and authentication preferences
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
          <label className="flex items-center justify-between p-4 border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Enable 2FA</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
              className="w-4 h-4 text-teal-600 dark:text-teal-500 rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover dark:border-dark-border"
            />
          </label>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Login Notifications</h3>
          <label className="flex items-center justify-between p-4 border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <KeyRound className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">New Login Alerts</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when someone logs into your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.loginNotifications}
              onChange={(e) => setSettings(prev => ({ ...prev, loginNotifications: e.target.checked }))}
              className="w-4 h-4 text-teal-600 dark:text-teal-500 rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover dark:border-dark-border"
            />
          </label>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Device Management</h3>
          <label className="flex items-center justify-between p-4 border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Device History</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Track devices that have accessed your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.deviceHistory}
              onChange={(e) => setSettings(prev => ({ ...prev, deviceHistory: e.target.checked }))}
              className="w-4 h-4 text-teal-600 dark:text-teal-500 rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover dark:border-dark-border"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t dark:border-dark-border">
        {saveStatus === 'success' && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Saved successfully</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <XCircle className="w-5 h-5" />
            <span className="text-sm">Failed to save changes</span>
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