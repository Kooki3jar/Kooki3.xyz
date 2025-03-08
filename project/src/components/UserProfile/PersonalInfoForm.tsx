import React, { useState } from 'react';
import { User, Mail, Upload, Twitter, Link2, Unlink, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface FormData {
  name: string;
  email: string;
  avatar: string;
}

export function PersonalInfoForm() {
  const { user, updateProfile } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: user?.username || '',
    email: user?.email || '',
    avatar: user?.profile?.avatar || '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isLinkingTwitter, setIsLinkingTwitter] = useState(false);
  const [twitterError, setTwitterError] = useState<string | null>(null);
  const [twitterSuccess, setTwitterSuccess] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
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
      updateProfile({
        username: formData.name,
        email: formData.email,
        profile: {
          ...user?.profile,
          avatar: formData.avatar,
        }
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleTwitterLink = async () => {
    setIsLinkingTwitter(true);
    setTwitterError(null);
    setTwitterSuccess(null);

    try {
      // Simulate Twitter OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await updateProfile({
        ...user,
        profile: {
          ...user?.profile,
          socialLinks: {
            ...user?.profile?.socialLinks,
            twitter: '@username'
          }
        }
      });

      setTwitterSuccess('Successfully linked Twitter account');
    } catch (err) {
      setTwitterError(err instanceof Error ? err.message : 'Failed to link Twitter account');
    } finally {
      setIsLinkingTwitter(false);
    }
  };

  const handleTwitterUnlink = async () => {
    setIsLinkingTwitter(true);
    setTwitterError(null);
    setTwitterSuccess(null);

    try {
      await updateProfile({
        ...user,
        profile: {
          ...user?.profile,
          socialLinks: {
            ...user?.profile?.socialLinks,
            twitter: undefined
          }
        }
      });

      setTwitterSuccess('Successfully unlinked Twitter account');
    } catch (err) {
      setTwitterError(err instanceof Error ? err.message : 'Failed to unlink Twitter account');
    } finally {
      setIsLinkingTwitter(false);
    }
  };

  const isTwitterLinked = user?.profile?.socialLinks?.twitter;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>

      <div className="grid gap-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={formData.avatar || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="absolute -bottom-2 -right-2">
              <label className="p-2 bg-white dark:bg-dark-hover rounded-full shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-active">
                <Upload className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Profile Photo</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG up to 2MB. A square image works best.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:border-dark-border dark:text-white dark:focus:ring-teal-400 ${
                errors.name ? 'border-red-500 dark:border-red-500' : ''
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:border-dark-border dark:text-white dark:focus:ring-teal-400 ${
                errors.email ? 'border-red-500 dark:border-red-500' : ''
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Twitter Connection */}
        <div className="border-t dark:border-dark-border pt-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Connected Accounts</h3>
          
          <div className="flex items-center justify-between p-4 rounded-lg border dark:border-dark-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-900/30">
                <Twitter className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Twitter</h3>
                {isTwitterLinked ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.profile?.socialLinks?.twitter}</p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={isTwitterLinked ? handleTwitterUnlink : handleTwitterLink}
              disabled={isLinkingTwitter}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isTwitterLinked
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  : 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50'
              }`}
            >
              {isLinkingTwitter ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isTwitterLinked ? (
                <>
                  <Unlink className="w-4 h-4" />
                  Disconnect
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Connect
                </>
              )}
            </button>
          </div>

          {(twitterError || twitterSuccess) && (
            <div className={`mt-2 p-2 rounded-lg flex items-center gap-2 text-sm ${
              twitterError ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
            }`}>
              {twitterError ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <p>{twitterError || twitterSuccess}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t dark:border-dark-border">
        <div className="flex items-center gap-2">
          {submitStatus === 'success' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400">Changes saved successfully</span>
            </>
          )}
          {submitStatus === 'error' && (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-600 dark:text-red-400">Failed to save changes</span>
            </>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}