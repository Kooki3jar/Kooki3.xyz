import React from 'react';

interface SolflareLogoProps {
  className?: string;
}

export function SolflareLogo({ className = "w-6 h-6" }: SolflareLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="128" height="128" rx="64" fill="#FC9D0F"/>
      <path
        d="M89.0132 64.0009L73.0082 96.0013H38.9983L54.9941 64.0009L38.9983 32.0005H73.0082L89.0132 64.0009Z"
        fill="white"
      />
    </svg>
  );
}