import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Topbtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smooth scrolling
    });
  };

  return (
    <button 
      onClick={scrollToTop}
      className="fixed bottom-5 right-1 bg-emerald-600 text-white  px-2 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
    >
      <ArrowUp />
      {/* icon here */}
    </button>
  );
}
