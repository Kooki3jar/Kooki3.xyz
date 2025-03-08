import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { MarketplacePage } from './components/marketplace/MarketplacePage';
import { StorePage } from './components/marketplace/StorePage';
import { ProductPage } from './components/marketplace/ProductPage';
import { NewsDashboard } from './components/news/NewsDashboard';
import { MapView } from './components/map/MapView';
import { SocialHub } from './components/social/SocialHub';
import { EventsPage } from './components/events/EventsPage';
import { NFTLibrary } from './components/NFTLibrary';
import { UserProfile } from './components/UserProfile';
import { ThemeTest } from './components/ThemeTest';
import { WelcomeModal } from './components/WelcomeModal';
import { AuthCallback } from './components/Auth/AuthCallback';
import { TestSupabaseConnection } from './components/TestSupabaseConnection';
import { Loader2 } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { useFirstVisit } from './hooks/useFirstVisit';
import { testSupabaseConnection } from './lib/supabase';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-teal-600 dark:text-teal-400" />
  </div>
);

export default function App() {
  const { isDark } = useTheme();
  const isFirstVisit = useFirstVisit();
  const [showWelcome, setShowWelcome] = useState(isFirstVisit);
  const [showTest, setShowTest] = useState(true);

  useEffect(() => {
    // Test Supabase connection on app load
    testSupabaseConnection().then(isConnected => {
      if (!isConnected && !window.location.hostname.includes('webcontainer')) {
        console.error('Failed to connect to Supabase. Please check your configuration.');
      }
    });

    // Hide test component after 10 seconds
    const timer = setTimeout(() => setShowTest(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeAction = async (action: 'connect' | 'visitor') => {
    setShowWelcome(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-gray-50 dark:bg-dark transition-colors duration-200`}>
      <Navbar />
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/store/:storeId/product/:productId" element={<ProductPage />} />
          <Route path="/news" element={<NewsDashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/social/*" element={<SocialHub />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/nft-collection" element={<NFTLibrary />} />
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/theme-test" element={<ThemeTest />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <WelcomeModal 
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onAction={handleWelcomeAction}
      />

      {showTest && <TestSupabaseConnection />}
    </div>
  );
}