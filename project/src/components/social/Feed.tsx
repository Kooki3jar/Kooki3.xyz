import React, { useState } from 'react';
import { FeedFilters } from './FeedFilters';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { useSocial } from '../../context/SocialContext';

export function Feed() {
  const { posts, loading, error, likePost, addComment, createPost } = useSocial();
  const [activeFilter, setActiveFilter] = useState<'all' | 'following' | 'nft'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('recent');

  const filteredPosts = React.useMemo(() => {
    let filtered = [...posts];

    // Apply filters
    if (activeFilter === 'following') {
      filtered = filtered.filter(post => post.author.isFollowing);
    } else if (activeFilter === 'nft') {
      filtered = filtered.filter(post => post.nftRequired);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // For trending, use a combination of likes and comments
      const scoreA = a.likes * 1.5 + a.comments * 2;
      const scoreB = b.likes * 1.5 + b.comments * 2;
      return scoreB - scoreA;
    });
  }, [posts, activeFilter, sortBy]);

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPost={createPost} />
      
      <FeedFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={likePost}
            onComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}