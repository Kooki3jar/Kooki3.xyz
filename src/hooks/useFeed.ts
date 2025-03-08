import { useState, useEffect, useCallback } from 'react';
import { Post, SortOption, FeedState } from '../types/social';
import { generateMockPosts } from '../data/mockUsers';

const POSTS_PER_PAGE = 10;

export function useFeed() {
  const [state, setState] = useState<FeedState>({
    posts: [],
    loading: true,
    error: null,
    hasMore: true,
    page: 1
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const fetchPosts = useCallback(async (page: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allPosts = generateMockPosts();
      const sortedPosts = sortPosts(allPosts, sortBy);
      const start = (page - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const paginatedPosts = sortedPosts.slice(start, end);
      
      setState(prev => ({
        posts: page === 1 ? paginatedPosts : [...prev.posts, ...paginatedPosts],
        loading: false,
        error: null,
        hasMore: end < sortedPosts.length,
        page
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load posts. Please try again.'
      }));
    }
  }, [sortBy]);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchPosts(state.page + 1);
    }
  }, [state.loading, state.hasMore, state.page, fetchPosts]);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setState(prev => ({ ...prev, page: 1, posts: [], hasMore: true }));
  };

  useEffect(() => {
    fetchPosts(1);
  }, [sortBy]);

  return {
    ...state,
    loadMore,
    sortBy,
    handleSort
  };
}

function sortPosts(posts: Post[], sortBy: SortOption): Post[] {
  return [...posts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // For trending, use a combination of likes and comments as the metric
    const trendScoreA = a.likes * 1.5 + a.comments * 2;
    const trendScoreB = b.likes * 1.5 + b.comments * 2;
    return trendScoreB - trendScoreA;
  });
}