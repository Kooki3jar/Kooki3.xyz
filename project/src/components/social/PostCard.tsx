import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types/social';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    onComment(post.id, comment);
    setComment('');
    setIsCommenting(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000; // years
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000; // months
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400; // days
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600; // hours
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60; // minutes
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{post.author.displayName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          <img
            src={post.images[0]}
            alt="Post content"
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t dark:border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-2 ${
              post.hasLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                post.hasLiked ? 'fill-red-500 stroke-red-500' : ''
              }`}
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button
            onClick={() => setIsCommenting(!isCommenting)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Comment Form */}
      {isCommenting && (
        <form onSubmit={handleSubmitComment} className="p-4 border-t dark:border-dark-border">
          <div className="flex gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 dark:bg-dark-hover rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </form>
      )}
    </div>
  );
}