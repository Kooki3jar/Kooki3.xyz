import React, { useState } from 'react';
import { Phone, MapPin, Globe, Bell, Shield, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface FormData {
  phone: string;
  address: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  privacy: {
    hideLocation: boolean;
    hideContact: boolean;
    hideSocial: boolean;
  };
}

export function PreferencesForm() {
  const [formData, setFormData] = useState<FormData>({
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    timezone: 'America/New_York',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    privacy: {
      hideLocation: false,
      hideContact: false,
      hideSocial: false,
    },
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.timezone) {
      newErrors.timezone = 'Please select a timezone';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrivacyChange = (setting: keyof FormData['privacy']) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: !prev.privacy[setting],
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Contact & Preferences</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Manage your contact information and privacy settings
      </p>

      <div className="grid gap-6 mt-6">
        {/* Privacy Controls */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            Privacy Settings
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-active transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hide Location</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hide your address and timezone from your public profile</p>
              </div>
              <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-teal-400 dark:focus:ring-offset-dark bg-gray-200 dark:bg-dark-active"
                onClick={() => handlePrivacyChange('hideLocation')}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.privacy.hideLocation ? 'translate-x-5 bg-teal-500' : 'translate-x-0'
                  }`}
                />
              </div>
            </label>

            <label className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-active transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hide Contact Information</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hide your email and phone number from your public profile</p>
              </div>
              <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-teal-400 dark:focus:ring-offset-dark bg-gray-200 dark:bg-dark-active"
                onClick={() => handlePrivacyChange('hideContact')}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.privacy.hideContact ? 'translate-x-5 bg-teal-500' : 'translate-x-0'
                  }`}
                />
              </div>
            </label>

            <label className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-active transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hide Social Media</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hide your connected social media accounts from your public profile</p>
              </div>
              <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-teal-400 dark:focus:ring-offset-dark bg-gray-200 dark:bg-dark-active"
                onClick={() => handlePrivacyChange('hideSocial')}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.privacy.hideSocial ? 'translate-x-5 bg-teal-500' : 'translate-x-0'
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
              placeholder="Enter phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Timezone
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={formData.timezone}
              onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t dark:border-dark-border">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="w-4 h-4 text-teal-600 dark:text-teal-500 border-gray-300 dark:border-dark-border rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your account activity</p>
              </div>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.pushNotifications}
                onChange={(e) => setFormData(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                className="w-4 h-4 text-teal-600 dark:text-teal-500 border-gray-300 dark:border-dark-border rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new messages and updates</p>
              </div>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.marketingEmails}
                onChange={(e) => setFormData(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                className="w-4 h-4 text-teal-600 dark:text-teal-500 border-gray-300 dark:border-dark-border rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive news about products and feature updates</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t dark:border-dark-border mt-6">
        {submitStatus === 'success' && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Preferences updated successfully</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <XCircle className="w-5 h-5" />
            <span className="text-sm">Failed to update preferences</span>
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}