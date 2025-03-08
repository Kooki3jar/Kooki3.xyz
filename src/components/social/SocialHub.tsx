import React, { useState } from 'react';
import { Feed } from './Feed';
import { SocialSidebar, SocialTab } from './SocialSidebar';
import { TrendingSidebar } from './TrendingSidebar';
import { ExploreView } from './ExploreView';
import { GroupsView } from './GroupsView';
import { MessagesView } from './MessagesView';
import { SavedView } from './SavedView';

export function SocialHub() {
  const [activeTab, setActiveTab] = useState<SocialTab>('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'explore':
        return <ExploreView />;
      case 'groups':
        return <GroupsView />;
      case 'messages':
        return <MessagesView />;
      case 'saved':
        return <SavedView />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64">
            <SocialSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>

          {/* Trending Section */}
          <div className="md:w-80">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}