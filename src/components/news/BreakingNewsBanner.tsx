import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  url: string;
}

interface BreakingNewsBannerProps {
  news: NewsItem[];
}

export function BreakingNewsBanner({ news }: BreakingNewsBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="bg-teal-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 relative">
          <div className="flex items-center gap-2 font-medium pr-4 border-r border-teal-500">
            <AlertCircle className="w-5 h-5" />
            Breaking
          </div>
          
          <div className="flex-1 overflow-hidden ml-4">
            <div
              ref={scrollRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${news.length * 100}%` }}
            >
              {news.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="flex items-center justify-between w-full px-4 hover:text-teal-100 transition-colors"
                  style={{ width: `${100 / news.length}%` }}
                >
                  <span className="font-medium truncate">{item.title}</span>
                  <div className="flex items-center gap-2 text-sm text-teal-100">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-1 ml-4">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-white' : 'bg-teal-500 hover:bg-teal-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}