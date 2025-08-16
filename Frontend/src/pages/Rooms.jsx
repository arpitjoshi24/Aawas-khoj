import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Topbar from '../components/Topbar';
import Topbtn from '../components/Topbtn';

import Loader from '../components/Loader'; // 👈 Import the loader


export default function Rooms() {
  const [roomList, setRoomList] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true); // 👈 Loader state

  const [filters, setFilters] = useState({
    price: 30000,
    amenities: [],
    location: '',
    pgType: '',
    sharingType: '',
    genderReference: '',
    smokingAllowed: '',
    guestAllowed: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true); // 👈 Show loader while fetching
        const response = await axios.get('http://localhost:5000/api/rooms', {
          params: filters, // 👈 send filters to backend
        });
        setRoomList(response.data);        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false); // 👈 Hide loader after fetch
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    let filtered = roomList.filter((room) => {
      const underPrice = room.rent <= filters.price;
      const hasAllAmenities = filters.amenities.every((key) => room.facilities?.[key]);
      const matchLocation =
        filters.location === '' || room.address?.toLowerCase().includes(filters.location.toLowerCase());
      const matchPgType = filters.pgType === '' || room.pgType === filters.pgType;
      const matchSharing = filters.sharingType === '' || room.sharingType === filters.sharingType;
      const matchGender =
        filters.genderReference === '' || room.rules?.genderReference === filters.genderReference;
      const matchSmoking =
        filters.smokingAllowed === '' || String(room.rules?.smokingAllowed) === filters.smokingAllowed;
      const matchGuest =
        filters.guestAllowed === '' || String(room.rules?.guestAllowed) === filters.guestAllowed;

      return (
        underPrice &&
        hasAllAmenities &&
        matchLocation &&
        matchPgType &&
        matchSharing &&
        matchGender &&
        matchSmoking &&
        matchGuest
      );
    });

    // ✅ Sort the filtered rooms
    if (sortOption === 'lowToHigh') {
      filtered.sort((a, b) => a.rent - b.rent);
    } else if (sortOption === 'highToLow') {
      filtered.sort((a, b) => b.rent - a.rent);
    }

    setFilteredRooms(filtered);
  }, [filters, roomList, sortOption]);

  return (
  <>
    <div className="flex flex-col md:flex-row py-2 px-6 min-h-screen">
      <Sidebar filters={filters} setFilters={setFilters} />

      <div className="w-full ml-8 md:w-3/4 p-4">
  {loading ? (
    <div className="flex justify-center items-center h-[80vh] w-full">
      <Loader />
    </div>
  ) : filteredRooms.length === 0 ? (
    <p className="text-center text-gray-600 mt-10">No rooms available.</p>
  ) : (
    filteredRooms.map((room, index) => (
      <div
        key={index}
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden mb-6 border border-gray-100 hover:border-gray-200"
      >
        {/* Status Badge */}
        <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full z-20 shadow-lg">
          {room.pgType || 'Available'}
        </span>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-1/3 h-64 md:h-80 overflow-hidden">
            {room.images && room.images.length > 0 ? (
              <img
                src={`http://localhost:5000${room.images[0]}`}
                alt={room.pgTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 opacity-50">📍</div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="relative flex-1 p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {room.pgTitle}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {room.address}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-bold">
                  <span className="text-2xl text-emerald-600">₹{room.rent}</span>
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </p>
              </div>

              {/* Room Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Beds:</strong> {room.totalBeds} | <strong>Sharing:</strong> {room.sharingType}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Available From:</strong> {room.availableFrom}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Gender:</strong> {room.rules?.genderReference}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Guests:</strong> {room.rules?.guestAllowed ? 'Allowed' : 'Not allowed'}
                  </p>
                </div>
              </div>

              {/* Facilities */}
              <div className="flex flex-wrap gap-2">
                {room.facilities?.wifi && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">WiFi</span>
                )}
                {room.facilities?.hasAC && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">AC</span>
                )}
                {room.facilities?.laundry && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">Laundry</span>
                )}
                {room.facilities?.mealsIncluded && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">Meals</span>
                )}
                {room.facilities?.powerBackup && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">Power Backup</span>
                )}
                {room.facilities?.roomCleaning && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">Cleaning</span>
                )}
                {room.facilities?.cctv && (
                  <span className="text-xs px-3 py-2 bg-[#f6eac6] text-[#876030] rounded-full font-medium">CCTV</span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="absolute right-6 bottom-6">
              <button
                onClick={() => navigate(`/roomdetails/${room._id}`)}
                className="px-6 py-3 text-sm text-white rounded-xl bg-emerald-600 hover:bg-emerald-700 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                More Details
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      <Topbtn />
    </div>
  </>
);
}
