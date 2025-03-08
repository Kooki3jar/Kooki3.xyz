import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "w-8 h-8", showText = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          className="fill-teal-600 dark:fill-teal-400"
        />
        <path
          d="M12 14C12 12.8954 12.8954 12 14 12H26C27.1046 12 28 12.8954 28 14V26C28 27.1046 27.1046 28 26 28H14C12.8954 28 12 27.1046 12 26V14Z"
          fill="white"
        />
        <path
          d="M16 18C16 16.8954 16.8954 16 18 16H22C23.1046 16 24 16.8954 24 18V22C24 23.1046 23.1046 24 22 24H18C16.8954 24 16 23.1046 16 22V18Z"
          className="fill-teal-600 dark:fill-teal-400"
        />
      </svg>
      
      {showText && (
        <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
          Digital to Tangible
        </span>
      )}
    </div>
  );
}

export function LogoWithText({ className = "h-8", showTagline = false }: { className?: string, showTagline?: boolean }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <Logo className={className} />
        <span className="ml-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
          Kooki3
        </span>
      </div>
      {showTagline && (
        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
          Digital to Tangible
        </span>
      )}
    </div>
  );
}