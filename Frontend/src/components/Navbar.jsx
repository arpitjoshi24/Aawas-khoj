import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/logo.png'
export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="sticky  top-0 z-50 w-full flex items-center justify-between px-6 py-3 bg-emerald-900 ">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={bg} alt="Logos" className="w-12 h-10 object-contain" />
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">AawasKhoj</Link>
      </div>

     
      {isAuthenticated && (
        <div className="flex items-center h-10 px-4 py-1 rounded-full bg-white w-[350px] text-gray-700 focus-within:ring-2 focus-within:ring-emerald-600">
          <input
            type="text"
            placeholder="Search for PG/Room"
            className="flex-grow outline-none bg-transparent text-sm placeholder-gray-500"
          />
          <Search className="w-5 h-5 text-gray-500 ml-2 cursor-pointer" />
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex space-x-6 text-white text-lg font-medium">
        <Link to="/rooms" className="transition duration-200 px-3 py-1 rounded-md hover:bg-emerald-800">Rooms</Link>

        {isAuthenticated ? (
          <>
            <Link to="/registerroom" className="transition duration-200 px-3 py-1 rounded-md hover:bg-emerald-800">Register Room</Link>
            <button onClick={handleLogout} className="transition duration-200 px-3 py-1 rounded-md hover:bg-red-700">Logout</button>
          </>
        ):(
          <Link to="/signup" className="transition duration-200 px-3 py-1 rounded-md hover:bg-emerald-800">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
