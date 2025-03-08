import React, { useState } from 'react';
import { Wallet, Link2, Unlink, ExternalLink, Copy, Check, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { MetaMaskLogo } from './icons/MetaMaskLogo';
import { PhantomLogo } from './icons/PhantomLogo';
import { SolflareLogo } from './icons/SolflareLogo';

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wallet = useWallet();
  
  const handleConnect = async (type: 'metamask' | 'phantom' | 'solflare') => {
    try {
      setError(null);
      switch (type) {
        case 'metamask':
          await wallet.connectMetaMask();
          break;
        case 'phantom':
          await wallet.connectPhantom();
          break;
        case 'solflare':
          await wallet.connectSolflare();
          break;
      }
      setIsOpen(false);
    } catch (error: any) {
      setError(error.message);
      // Keep the menu open when there's an error
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const getWalletIcon = () => {
    switch (wallet.type) {
      case 'metamask':
        return <MetaMaskLogo className="w-6 h-6" />;
      case 'phantom':
        return <PhantomLogo className="w-6 h-6" />;
      case 'solflare':
        return <SolflareLogo className="w-6 h-6" />;
      default:
        return <Wallet className="w-6 h-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
        aria-label={wallet.isConnected ? "Wallet options" : "Connect wallet"}
      >
        {getWalletIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-paper rounded-xl shadow-xl border border-gray-200 dark:border-dark-border z-50 overflow-hidden">
          {!wallet.isConnected ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect Wallet</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {wallet.isMetaMaskInstalled && (
                <button
                  onClick={() => handleConnect('metamask')}
                  disabled={wallet.isConnecting}
                  className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <MetaMaskLogo className="w-6 h-6" />
                    <span className="font-medium">
                      {wallet.isConnecting ? 'Connecting...' : 'MetaMask'}
                    </span>
                  </div>
                  {wallet.isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </button>
              )}

              {wallet.isPhantomInstalled && (
                <button
                  onClick={() => handleConnect('phantom')}
                  disabled={wallet.isConnecting}
                  className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <PhantomLogo className="w-6 h-6" />
                    <span className="font-medium">
                      {wallet.isConnecting ? 'Connecting...' : 'Phantom'}
                    </span>
                  </div>
                  {wallet.isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </button>
              )}

              {wallet.isSolflareInstalled && (
                <button
                  onClick={() => handleConnect('solflare')}
                  disabled={wallet.isConnecting}
                  className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <SolflareLogo className="w-6 h-6" />
                    <span className="font-medium">
                      {wallet.isConnecting ? 'Connecting...' : 'Solflare'}
                    </span>
                  </div>
                  {wallet.isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </button>
              )}

              {(!wallet.isMetaMaskInstalled || !wallet.isPhantomInstalled || !wallet.isSolflareInstalled) && (
                <div className="mt-4 pt-4 border-t dark:border-dark-border">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Install wallet:</p>
                  <div className="space-y-2">
                    {!wallet.isMetaMaskInstalled && (
                      <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-dark-hover text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-active transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MetaMaskLogo className="w-6 h-6" />
                          <span className="font-medium">Install MetaMask</span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {!wallet.isPhantomInstalled && (
                      <a
                        href="https://phantom.app/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-dark-hover text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-active transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <PhantomLogo className="w-6 h-6" />
                          <span className="font-medium">Install Phantom</span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {!wallet.isSolflareInstalled && (
                      <a
                        href="https://solflare.com/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-dark-hover text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-active transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <SolflareLogo className="w-6 h-6" />
                          <span className="font-medium">Install Solflare</span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="p-4 border-b dark:border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Wallet</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {getWalletIcon()}
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{wallet.type}</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Address</p>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-dark-hover px-3 py-2 rounded-lg">
                    <code className="text-sm font-mono dark:text-gray-300">{formatAddress(wallet.address)}</code>
                    <button
                      onClick={copyAddress}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-active rounded-md transition-colors"
                      title={copied ? 'Copied!' : 'Copy address'}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Balance</p>
                  <p className="font-medium text-lg dark:text-white">
                    {wallet.balance} {wallet.type === 'metamask' ? 'ETH' : 'SOL'}
                  </p>
                </div>

                <button
                  onClick={wallet.disconnect}
                  className="w-full px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium mt-2"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}