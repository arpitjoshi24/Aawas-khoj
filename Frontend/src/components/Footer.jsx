import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About AawasKhoj</h3>
          <p className="text-sm text-gray-300">
            AawasKhoj is your go-to platform for finding PGs and rooms quickly and easily. 
            We help you discover verified properties at your convenience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/rooms" className="hover:text-white">PGs</a></li>
            <li><a href="/rooms" className="hover:text-white">Rooms</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300 mb-4">Email: support@aawaskhoj.com</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emerald-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-emerald-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-emerald-400"><Instagram size={20} /></a>
            <a href="mailto:support@aawaskhoj.com" className="hover:text-emerald-400"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} AawasKhoj. All rights reserved.
      </div>
    </footer>
  );
}
