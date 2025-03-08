import React, { useState } from 'react';
import { KeyRound, Shield, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';

export function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | null>(null);
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
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Security Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your account security and authentication preferences
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Enable 2FA</div>
                <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
          </label>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Login Notifications</h3>
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <KeyRound className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">New Login Alerts</div>
                <div className="text-sm text-gray-500">Get notified when someone logs into your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.loginNotifications}
              onChange={(e) => setSettings(prev => ({ ...prev, loginNotifications: e.target.checked }))}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
          </label>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Device Management</h3>
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Device History</div>
                <div className="text-sm text-gray-500">Track devices that have accessed your account</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.deviceHistory}
              onChange={(e) => setSettings(prev => ({ ...prev, deviceHistory: e.target.checked }))}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
          </label>
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