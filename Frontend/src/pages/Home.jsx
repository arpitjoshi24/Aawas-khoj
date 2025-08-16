import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Home() {
  const [pgData, setPgData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Fetch PG data
    axios.get('http://localhost:5000/api/rooms?type=PG') 
      .then(res => setPgData(res.data))
      .catch(err => console.error(err));

    // Fetch room data
    axios.get('http://localhost:5000/api/rooms?type=Room') 
      .then(res => setRoomData(res.data))
      .catch(err => console.error(err));
  }, []);

const renderCards = (items) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
    {items.map((item, index) => (
      <div
        key={index}
        className="bg-[#fafafa] rounded-xl shadow hover:shadow-lg transition duration-300"
      >
        <img
          src={`http://localhost:5000${item.images[0]}`}
          alt={item.pgTitle}
          className="w-full h-40 object-cover rounded-t-xl"
        />
        <div className="p-3">
          <h3 className="text-md font-semibold text-gray-800">
            {item.pgTitle || item.name}
          </h3>

          {/* Location */}
          <p className="text-sm text-gray-600 gap-1 mt-1 flex ">
            <MapPin className='h-4 w-4 mt-0.5 text-gray-500'/> {item.address || "Location not available"}
          </p>

          {/* Details link */}
            <Link
            to={`/roomDetails/${item._id}`}
            className="text-sm text-blue-500 hover:underline cursor-pointer mt-1"
          >
            Click here for details
          </Link>
        </div>
      </div>
    ))}
  </div>
);


  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-screen h-[90vh] overflow-hidden">
  {/* Background Image with Parallax Zoom */}
  <img
    src="./hero1.jpg"
    alt="Hero"
    className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 flex justify-center items-center">
    <div className="text-center px-4">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fadeInUp">
        Welcome to <span className="text-emerald-400">AawasKhoj</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-2xl text-gray-200 font-medium drop-shadow animate-fadeInUp delay-200">
        Finding your perfect PG or Room is now easier than ever.
      </p>

      {/* CTA Button */}
      <button className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeInUp delay-400">
        <Link to='./rooms'>Explore Now</Link>
      </button>
    </div>
  </div>
</div>


      {/* Explore PGs Section */}
      <section className="bg-white py-10">
      <div className="flex justify-between items-center px-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Explore PGs</h2>
        <Link 
          to="/rooms" 
          className="text-blue-600 hover:underline text-sm"
        >
          View all
        </Link>
      </div>
      {renderCards(pgData.slice(0,4))}
    </section>

      {/* Features Section */}
      <section className="bg-[#fafafa] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-[#b38b59]">AawasKhoj?</span>
          </h2>

          <section className="h-[300px] w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-emerald-900 text-white flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Safe & Verified Stays</h2>
                <p className="text-sm max-w-md mx-auto">
                  At <span className="text-[#b38b59] font-semibold">AawasKhoj</span>, every PG and room listed goes through a verification process to ensure safety, comfort, and transparency.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#b38b59] text-white flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Smart Search. Easy Booking.</h2>
                <p className="text-sm max-w-md mx-auto">
                  Use our intelligent filters to explore PGs and rooms by location, budget, and preferences — then book with confidence in seconds!
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Explore Rooms Section */}
      <section className="bg-white py-10">
        <div className="flex justify-between items-center px-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Explore Rooms</h2>
          <Link 
          to="/rooms" 
          className="text-blue-600 hover:underline text-sm"
        >
          View all
        </Link>
        </div>
        {renderCards(roomData.slice(0,4))}
      </section>
    </div>
  );
}
