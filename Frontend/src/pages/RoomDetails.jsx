import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MapPin, Phone, User, Calendar, Shield, Users, FileText, Check, X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [recommendedPGs, setRecommendedPGs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current room
    axios.get(`http://localhost:5000/api/rooms/${id}`)
      .then(res => setRoom(res.data))
      .catch(err => console.error(err));

    // Fetch all rooms for recommended PGs
    axios.get(`http://localhost:5000/api/rooms`)
      .then(res => setRecommendedPGs(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!room) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
    </div>
  );

  // Filter out current room from recommended
  const filteredPGs = recommendedPGs.filter(pg => pg._id !== id);
  
  const roomsFacilities = [
    { key: 'wifi', label: 'WiFi'},
    { key: 'hasAC', label: 'Air Conditioning'},
    { key: 'mealsIncluded', label: 'Meals Included'},
    { key: 'cctv', label: 'CCTV'},
    { key: 'laundry', label: 'Laundry'},
    { key: 'roomCleaning', label: 'Cleaning'},
    { key: 'powerBackup', label: 'Power Backup'},
  ];

  const availableFacilities = roomsFacilities.filter(fac => room.facilities[fac.key]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{room.pgTitle}</h1>
                <div className="flex items-center text-emerald-100">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{room.address}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">₹{room.rent}</div>
                <div className="text-emerald-100">per month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Owner Information Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Owner Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Owner Name</p>
                    <p className="font-semibold text-gray-800">{room.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                    <p className="font-semibold text-gray-800">{room.phoneNumber}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a 
                  href={`tel:${room.phoneNumber}`} 
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Owner
                </a>
              </div>
            </div>

            {/* Room Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                Room Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Available From</p>
                    <p className="font-semibold text-gray-800">{room.availableFrom}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Gender Preference</p>
                    <p className="font-semibold text-gray-800">{room.rules.genderReference}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Facilities Available</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableFacilities.map((facility) => (
                  <div key={facility.key} className="flex items-center p-3 bg-[#f6eac6] text-[#876030] rounded-lg">
                    <Check className="w-4 h-4 mr-2" />
                    <span className="font-medium">{facility.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                House Rules
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Guests</p>
                    <div className="flex items-center">
                      {room.rules.guestAllowed ? (
                        <>
                          <Check className="w-4 h-4 text-green-600 mr-1" />
                          <span className="font-semibold text-green-600">Allowed</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-600 mr-1" />
                          <span className="font-semibold text-red-600">Not Allowed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 text-gray-500 mr-3">🚭</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Smoking</p>
                    <div className="flex items-center">
                      {room.rules.smokingAllowed ? (
                        <>
                          <Check className="w-4 h-4 text-green-600 mr-1" />
                          <span className="font-semibold text-green-600">Allowed</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-600 mr-1" />
                          <span className="font-semibold text-red-600">Not Allowed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            {room.additionalNotes && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                  Additional Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{room.additionalNotes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Room Gallery</h3>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="rounded-xl shadow-lg"
              >
                {room.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:5000${img}`}
                      alt={`Room ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended PGs Section */}
      <div className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Recommended PGs</h3>
            <p className="text-gray-600">Discover other great options in your area</p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {recommendedPGs.map((pg) => (
                <SwiperSlide key={pg._id}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={`http://localhost:5000${pg.images[0]}`}
                        alt={pg.pgTitle}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {pg.pgTitle}
                      </h4>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm">{pg.address}</span>
                      </div>
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-emerald-600">₹{pg.rent}</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <Link to={`/roomDetails/${pg._id}`}>
                        <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                          View Details →
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-600 z-10 flex items-center justify-center transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-600 z-10 flex items-center justify-center transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}