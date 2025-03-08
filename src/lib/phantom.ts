import { PublicKey, Connection } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

// Initialize Solana connection (using devnet for development)
export const connection = new Connection('https://api.devnet.solana.com');

// Initialize Phantom wallet adapter
export const phantomWallet = new PhantomWalletAdapter();

export const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    
    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
  throw new Error('Please install Phantom wallet');
};

export const getBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
};