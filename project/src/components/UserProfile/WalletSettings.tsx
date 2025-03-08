import React, { useState } from 'react';
import { Wallet, Link2, Unlink, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { useUser } from '../../context/UserContext';
import { MetaMaskLogo } from '../icons/MetaMaskLogo';
import { PhantomLogo } from '../icons/PhantomLogo';

export function WalletSettings() {
  const wallet = useWallet();
  const { user, updateProfile } = useUser();
  const [isLinking, setIsLinking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLinkWallet = async (type: 'metamask' | 'phantom') => {
    setIsLinking(type);
    setError(null);
    setSuccess(null);

    try {
      if (type === 'metamask') {
        await wallet.connectMetaMask();
      } else if (type === 'phantom') {
        await wallet.connectPhantom();
      }

      // Update user profile with linked wallet
      await updateProfile({
        ...user,
        linkedWallets: {
          ...user?.linkedWallets,
          [type]: wallet.address
        }
      });

      setSuccess(`Successfully linked ${type} wallet`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to link wallet');
    } finally {
      setIsLinking(null);
    }
  };

  const handleUnlinkWallet = async (type: 'metamask' | 'phantom') => {
    setIsLinking(type);
    setError(null);
    setSuccess(null);

    try {
      // Update user profile to remove linked wallet
      await updateProfile({
        ...user,
        linkedWallets: {
          ...user?.linkedWallets,
          [type]: undefined
        }
      });

      if (wallet.type === type) {
        wallet.disconnect();
      }

      setSuccess(`Successfully unlinked ${type} wallet`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlink wallet');
    } finally {
      setIsLinking(null);
    }
  };

  const isWalletLinked = (type: 'metamask' | 'phantom') => {
    return user?.linkedWallets?.[type];
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Connected Wallets</h2>
      </div>

      {(error || success) && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          error ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
        }`}>
          {error ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          <p className="text-sm">{error || success}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Ethereum/MetaMask */}
        <div className="flex items-center justify-between p-4 rounded-lg border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <MetaMaskLogo className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">MetaMask</h3>
              {isWalletLinked('metamask') ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.linkedWallets?.metamask?.slice(0, 6)}...
                  {user?.linkedWallets?.metamask?.slice(-4)}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
              )}
            </div>
          </div>

          <button
            onClick={() => isWalletLinked('metamask') 
              ? handleUnlinkWallet('metamask')
              : handleLinkWallet('metamask')
            }
            disabled={isLinking !== null}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isWalletLinked('metamask')
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
            }`}
          >
            {isLinking === 'metamask' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isWalletLinked('metamask') ? (
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

        {/* Solana/Phantom */}
        <div className="flex items-center justify-between p-4 rounded-lg border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <PhantomLogo className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Phantom</h3>
              {isWalletLinked('phantom') ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.linkedWallets?.phantom?.slice(0, 6)}...
                  {user?.linkedWallets?.phantom?.slice(-4)}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
              )}
            </div>
          </div>

          <button
            onClick={() => isWalletLinked('phantom')
              ? handleUnlinkWallet('phantom')
              : handleLinkWallet('phantom')
            }
            disabled={isLinking !== null}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isWalletLinked('phantom')
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30'
            }`}
          >
            {isLinking === 'phantom' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isWalletLinked('phantom') ? (
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
      </div>
    </div>
  );
}