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
        const response = await axios.get('http://localhost:5000/api/rooms');
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
    <div className='my-8'>
  <Topbar sortOption={sortOption} setSortOption={setSortOption} />
</div>

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
              className="relative flex flex-col md:flex-row bg-[#fafafa] rounded-lg overflow-hidden mb-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <span className="absolute top-3 right-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full z-20 shadow">
                {room.pgType || 'Available'}
              </span>

              <div className="w-full md:w-1/3 h-52 md:h-auto overflow-hidden relative">
                {room.images && room.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000${room.images[0]}`}
                    alt={room.pgTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
              </div>

              <div className="relative flex-1 p-4 ml-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{room.pgTitle}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {room.address}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Rent:</strong> ₹{room.rent}/month
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Beds:</strong> {room.totalBeds} | <strong>Sharing:</strong> {room.sharingType}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Available From:</strong> {room.availableFrom}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Gender:</strong> {room.rules?.genderReference}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Guests:</strong> {room.rules?.guestAllowed ? 'Allowed' : 'Not allowed'}
                  </p>

                  <div className="flex flex-wrap mt-2 gap-2">
                    {room.facilities?.wifi && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">WiFi</span>
                    )}
                    {room.facilities?.hasAC && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">AC</span>
                    )}
                    {room.facilities?.laundry && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">Laundry</span>
                    )}
                    {room.facilities?.mealsIncluded && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">Meals</span>
                    )}
                    {room.facilities?.powerBackup && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">Power Backup</span>
                    )}
                    {room.facilities?.roomCleaning && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">Cleaning</span>
                    )}
                    {room.facilities?.cctv && (
                      <span className="text-xs px-2 py-1 bg-[#f6eac6] text-[#876030] rounded">CCTV</span>
                    )}
                  </div>
                </div>

                <div className="absolute right-4 bottom-0 transform -translate-y-1/2">
                  <button
                    onClick={() => navigate(`/roomdetails/${room._id}`)}
                    className="text-sm text-white p-2 rounded bg-emerald-600 hover:bg-emerald-700 font-medium"
                  >
                    More Details →
                  </button>
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
