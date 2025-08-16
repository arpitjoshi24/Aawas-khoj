import React from 'react';
import './Loader.css';

export default function SearchLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-32 h-32">
       
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-emerald-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3l9 8h-3v9h-4v-5H10v5H6v-9H3l9-8z" />
          </svg>
        </div>

        <div className="absolute top-12 left-1/2 w-8 h-8 -translate-x-1/2 z-10">
          <div className="w-full h-full animate-orbit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
