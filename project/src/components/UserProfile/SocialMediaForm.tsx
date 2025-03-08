import React, { useState } from 'react';
import { Twitter, Link2, Unlink, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface SocialAccount {
  provider: 'twitter';
  connected: boolean;
  username?: string;
  lastSync?: string;
}

interface SocialMediaFormProps {
  onConnect: (provider: SocialAccount['provider']) => Promise<void>;
  onDisconnect: (provider: SocialAccount['provider']) => Promise<void>;
}

export function SocialMediaForm() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { provider: 'twitter', connected: false }
  ]);
  const [isLoading, setIsLoading] = useState<SocialAccount['provider'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConnect = async (provider: SocialAccount['provider']) => {
    setIsLoading(provider);
    setError(null);
    setSuccess(null);

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAccounts(prev => prev.map(account => 
        account.provider === provider
          ? { 
              ...account, 
              connected: true, 
              username: `user_${provider}`,
              lastSync: new Date().toISOString(),
            }
          : account
      ));
      setSuccess(`Successfully connected to ${provider}`);
    } catch (err) {
      setError(`Failed to connect to ${provider}`);
    } finally {
      setIsLoading(null);
    }
  };

  const handleDisconnect = async (provider: SocialAccount['provider']) => {
    setIsLoading(provider);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccounts(prev => prev.map(account => 
        account.provider === provider
          ? { provider, connected: false }
          : account
      ));
      setSuccess(`Successfully disconnected from ${provider}`);
    } catch (err) {
      setError(`Failed to disconnect from ${provider}`);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Accounts</h2>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.provider}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                account.provider === 'twitter' ? 'text-sky-500 bg-sky-50 hover:bg-sky-100' : ''
              }`}>
                <Twitter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {account.provider}
                </h3>
                {account.connected ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Connected as @{account.username}
                    </span>
                    <span className="text-xs text-gray-400">
                      • Last synced {new Date(account.lastSync!).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Not connected</p>
                )}
              </div>
            </div>

            <button
              onClick={() => account.connected 
                ? handleDisconnect(account.provider)
                : handleConnect(account.provider)
              }
              disabled={isLoading !== null}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${account.connected
                  ? 'text-gray-700 hover:bg-gray-100'
                  : `${account.provider === 'twitter' ? 'text-sky-500 bg-sky-50 hover:bg-sky-100' : ''} font-medium`
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isLoading === account.provider ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {account.connected ? 'Disconnecting...' : 'Connecting...'}
                </>
              ) : (
                <>
                  {account.connected ? (
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
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {(error || success) && (
        <div className="mt-4 flex items-center gap-2">
          {error && (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-600">{error}</span>
            </>
          )}
          {success && (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600">{success}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}