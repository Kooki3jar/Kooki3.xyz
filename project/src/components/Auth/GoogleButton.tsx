import React from 'react';

export function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <img
        className="h-5 w-5"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
      />
      <span className="ml-2">Continue with Google</span>
    </button>
  );
}