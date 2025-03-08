import React from 'react';
import { TrendingUp } from 'lucide-react';

const trendingTopics = [
  { tag: '#ArtisanCrafts', posts: 1234 },
  { tag: '#Sustainability', posts: 987 },
  { tag: '#LocalArtists', posts: 856 },
  { tag: '#HandmadeJewelry', posts: 743 },
  { tag: '#VintageFinds', posts: 632 },
  { tag: '#StudioLife', posts: 521 }
];

export function TrendingSidebar() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        <h3 className="font-bold text-gray-900 dark:text-white">Trending Topics</h3>
      </div>
      
      <div className="space-y-4">
        {trendingTopics.map((topic) => (
          <div key={topic.tag} className="group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {topic.tag}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {topic.posts.toLocaleString()} posts
                </p>
              </div>
              <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
        Show more topics
      </button>
    </div>
  );
}