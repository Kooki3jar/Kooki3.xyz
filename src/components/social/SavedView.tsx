import React from 'react';
import { Bookmark } from 'lucide-react';
import { PostCard } from './PostCard';
import { useSocial } from '../../context/SocialContext';

export function SavedView() {
  const { posts } = useSocial();
  const savedPosts = posts.filter(post => post.hasLiked).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Posts</h2>
        </div>

        {savedPosts.length > 0 ? (
          <div className="space-y-6">
            {savedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => {}}
                onComment={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved posts yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Posts you save will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}