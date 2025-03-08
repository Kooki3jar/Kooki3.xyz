import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post, Comment } from '../types/social';
import { mockUsers, generateMockPosts } from '../data/mockUsers';

interface SocialContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (content: string, images?: string[]) => void;
}

const SocialContext = createContext<SocialContextType | null>(null);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(generateMockPosts());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likePost = useCallback((postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !post.hasLiked
          };
        }
        return post;
      })
    );
  }, []);

  const addComment = useCallback((postId: string, content: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1
          };
        }
        return post;
      })
    );
  }, []);

  const createPost = useCallback((content: string, images?: string[]) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      images,
      author: mockUsers[0], // Use first mock user as current user
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      hasLiked: false
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  return (
    <SocialContext.Provider value={{
      posts,
      loading,
      error,
      likePost,
      addComment,
      createPost
    }}>
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}