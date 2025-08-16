import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState('enterEmail');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email || !name || !password || !phone) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, phone })
      });

      const data = await res.json();
      setMessage(data.message);
      setStage('enterCode');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Try again.');
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setMessage('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (data.verified) {
        navigate('/login');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error verifying code');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {stage === 'enterEmail' ? (
          <>
            <h2 className="text-2xl font-semibold py-2 mb-8 text-center border-b-1">Owner Signup</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">Create your account to start listing and managing your PGs with ease</p>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-sm text-gray-400 mb-4">
              We will never share your phone number with anyone.
            </p>

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>

            <p className="mt-4 text-sm text-center text-gray-500">
              Already have an account? <a href="./login" className="text-blue-500 hover:underline">Login</a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">Verify Code</h2>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </>
        )}
        {message && <p className="mt-4 text-sm text-blue-500 text-center">{message}</p>}
      </div>
    </div>
  );
}
