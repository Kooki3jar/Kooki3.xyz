import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider, getBalance } from '../lib/phantom';
import { PublicKey } from '@solana/web3.js';

interface Transaction {
  hash: string;
  type: 'incoming' | 'outgoing';
  value: string;
  timestamp: number;
}

interface Token {
  address: string;
  symbol: string;
  balance: string;
  logo: string;
  value: number;
}

interface Network {
  name: string;
  chainId: number;
  isTestnet: boolean;
}

type WalletType = 'metamask' | 'phantom' | 'solflare' | null;

interface WalletState {
  isConnected: boolean;
  address: string;
  type: WalletType;
  balance: string;
  network: Network | null;
  transactions: Transaction[];
  tokens: Token[];
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    type: null,
    balance: '0',
    network: null,
    transactions: [],
    tokens: [],
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask;
  };

  const checkIfPhantomInstalled = () => {
    return typeof window !== 'undefined' && 
           (window.phantom?.solana?.isPhantom || window.solana?.isPhantom) || false;
  };

  const checkIfSolflareInstalled = () => {
    const provider = window?.solflare;
    return provider?.isSolflare || false;
  };

  const connectMetaMask = async () => {
    // Prevent multiple connection attempts
    if (isConnecting) {
      console.log('Connection already in progress, please wait...');
      return;
    }

    if (!checkIfMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      setIsConnecting(true);
      
      // In WebContainer environment, simulate a successful connection
      if (window.location.hostname.includes('webcontainer')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          type: 'metamask',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          balance: '1.234',
          network: {
            name: 'Ethereum',
            chainId: 1,
            isTestnet: false
          }
        }));
        return;
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        type: 'metamask',
        address: accounts[0],
      }));

    } catch (error: any) {
      // Handle user rejection (code 4001) gracefully
      if (error.code === 4001) {
        console.log('User declined to connect wallet');
        return; // Don't throw error for user rejection
      }
      
      // Handle other specific errors
      if (error.code === -32002) {
        console.log('MetaMask is already processing a connection request. Please check your MetaMask window.');
        return; // Don't throw error for pending request
      }
      
      // Log error for debugging but show user-friendly message
      console.error('MetaMask connection error:', error);
      throw new Error('Failed to connect to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    // Prevent multiple connection attempts
    if (isConnecting) {
      console.log('Connection already in progress, please wait...');
      return;
    }

    if (!checkIfPhantomInstalled()) {
      throw new Error('Phantom wallet is not installed');
    }

    try {
      setIsConnecting(true);
      
      // In WebContainer environment, simulate a successful connection
      if (window.location.hostname.includes('webcontainer')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          type: 'phantom',
          address: 'Phantom12345abcdef67890abcdef12345abcdef67890',
          balance: '10.5',
          network: {
            name: 'Solana',
            chainId: 101,
            isTestnet: false,
          },
        }));
        return;
      }
      
      const provider = getProvider();
      
      // First try to reconnect if already authorized
      try {
        await provider.connect({ onlyIfTrusted: true });
      } catch (error) {
        // If not already authorized, proceed with new connection
        await provider.connect();
      }

      const publicKey = provider.publicKey;
      if (!publicKey) {
        throw new Error('Failed to get Phantom wallet public key');
      }

      const address = publicKey.toString();
      const balance = await getBalance(publicKey);

      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        type: 'phantom',
        address,
        balance: balance.toString(),
        network: {
          name: 'Solana',
          chainId: 101,
          isTestnet: false,
        },
      }));

    } catch (error: any) {
      // Handle user rejection gracefully
      if (error.code === 4001) {
        console.log('User declined to connect wallet');
        return; // Don't throw error for user rejection
      }

      console.error('Phantom connection error:', error);
      
      if (error.code === -32603) {
        throw new Error('Phantom wallet is locked. Please unlock your wallet and try again.');
      }
      
      if (error.message?.includes('wallet adapter not found')) {
        throw new Error('Phantom wallet not found. Please install Phantom and try again.');
      }
      
      throw new Error('Failed to connect to Phantom wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectSolflare = async () => {
    // Prevent multiple connection attempts
    if (isConnecting) {
      console.log('Connection already in progress, please wait...');
      return;
    }

    if (!checkIfSolflareInstalled()) {
      throw new Error('Solflare is not installed');
    }

    try {
      setIsConnecting(true);
      
      // In WebContainer environment, simulate a successful connection
      if (window.location.hostname.includes('webcontainer')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          type: 'solflare',
          address: 'Solflare12345abcdef67890abcdef12345abcdef67890',
          balance: '5.75',
          network: {
            name: 'Solana',
            chainId: 101,
            isTestnet: false,
          },
        }));
        return;
      }

      const resp = await window.solflare.connect();
      if (!resp.publicKey) {
        throw new Error('Failed to get Solflare wallet public key');
      }

      const address = resp.publicKey.toString();
      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        type: 'solflare',
        address,
      }));

    } catch (error: any) {
      // Handle user rejection gracefully
      if (error.code === 4001) {
        console.log('User declined to connect wallet');
        return; // Don't throw error for user rejection
      }

      console.error('Solflare connection error:', error);
      
      if (error.code === -32603) {
        throw new Error('Solflare wallet is locked. Please unlock your wallet and try again.');
      }
      
      throw new Error('Failed to connect to Solflare. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    if (walletState.type === 'phantom') {
      const provider = getProvider();
      provider.disconnect();
    } else if (walletState.type === 'solflare' && window.solflare) {
      window.solflare.disconnect();
    }

    setWalletState({
      isConnected: false,
      address: '',
      type: null,
      balance: '0',
      network: null,
      transactions: [],
      tokens: [],
    });
  };

  // Update wallet data when connected
  useEffect(() => {
    const updateWalletData = async () => {
      if (!walletState.isConnected || !walletState.address) return;

      try {
        if (walletState.type === 'metamask') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(walletState.address);
          const network = await provider.getNetwork();

          setWalletState(prev => ({
            ...prev,
            balance: ethers.formatEther(balance),
            network: {
              name: network.name,
              chainId: Number(network.chainId),
              isTestnet: network.name !== 'mainnet',
            },
          }));
        } else if (walletState.type === 'phantom') {
          const provider = getProvider();
          if (provider.publicKey) {
            const balance = await getBalance(provider.publicKey);
            setWalletState(prev => ({
              ...prev,
              balance: balance.toString(),
            }));
          }
        }
      } catch (error) {
        console.error('Error updating wallet data:', error);
      }
    };

    updateWalletData();
  }, [walletState.isConnected, walletState.address, walletState.type]);

  // Setup event listeners
  useEffect(() => {
    if (checkIfMetaMaskInstalled()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (walletState.isConnected && walletState.type === 'metamask') {
          setWalletState(prev => ({ ...prev, address: accounts[0] }));
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => {});
      };
    }

    if (checkIfPhantomInstalled()) {
      const provider = getProvider();
      const handlePhantomDisconnect = () => {
        if (walletState.type === 'phantom') {
          disconnect();
        }
      };

      provider.on('disconnect', handlePhantomDisconnect);

      return () => {
        provider.removeListener('disconnect', handlePhantomDisconnect);
      };
    }
  }, [walletState.isConnected, walletState.type]);

  return {
    ...walletState,
    connectMetaMask,
    connectPhantom,
    connectSolflare,
    disconnect,
    isConnecting,
    isMetaMaskInstalled: checkIfMetaMaskInstalled(),
    isPhantomInstalled: checkIfPhantomInstalled(),
    isSolflareInstalled: checkIfSolflareInstalled(),
  };
}