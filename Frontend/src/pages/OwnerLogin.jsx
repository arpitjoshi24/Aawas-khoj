import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(' Login successful!');
         localStorage.setItem('isLoggedIn', 'true');
        setTimeout(() => navigate('/'), 1000); 
      } else {
        setMessage(` ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold border-b-1 py-2 mb-6 text-center">Owner Login</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
      Please enter your credentials to access your dashboard.
    </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && (
          <p className="mt-4 text-sm text-center text-blue-500">{message}</p>
        )}
        <p className="mt-4 text-sm text-center text-gray-500">
      Don’t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
    </p>
      </div>
    </div>
  );
}
