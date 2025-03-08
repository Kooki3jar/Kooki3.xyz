import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface CreatePostProps {
  onPost: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onPost(content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <img
            src={user?.profile?.avatar || 'https://via.placeholder.com/40'}
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something with the community..."
              className="w-full min-h-[80px] bg-gray-100 dark:bg-dark-hover rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:text-white dark:placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
              >
                <Image className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}