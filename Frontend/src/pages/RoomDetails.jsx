import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MapPin } from 'lucide-react';
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

  if (!room) return <p className="text-center py-10">Loading...</p>;

  // Filter out current room from recommended
  const filteredPGs = recommendedPGs.filter(pg => pg._id !== id);
const roomsFacilities = [
    { key: 'wifi', label: 'WiFi'},
    { key: 'hasAC', label: 'Air Conditioning'  },
    { key: 'mealsIncluded', label: 'Meals Included'},
    { key: 'cctv', label: 'CCTV'},
    { key: 'laundry', label: 'Laundry' },
    { key: 'roomCleaning', label: 'Cleaning' },
    { key: 'powerBackup', label: 'Power Backup' },
];
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 p-6 mx-12 my-2">
        {/* Left side details */}
        <div className="md:w-2/5 space-y-3">
          <h2 className=" flex justify-between mx-2"> <span className='text-2xl font-bold'>{room.pgTitle} </span> <span className='flex text-sm'> <MapPin/> {room.address}</span> </h2>
          
          <p><strong>Owner Name:</strong> {room.ownerName}</p>
          <p><strong>Phone Number:</strong> {room.phoneNumber}</p>
          <p><strong>Address:</strong> {room.address}</p>
          <p><strong>Rent:</strong> ₹{room.rent}</p>
          <p><strong>Available From:</strong> {room.availableFrom}</p>
          <p><strong>Gender:</strong> {room.rules.genderReference}</p>
          <p>
          <strong>Facilities:</strong>{' '}
          {roomsFacilities
            .filter(fac => room.facilities[fac.key])
            .map(fac => fac.label)
            .join(', ')
          }
        </p>
          
          <p>
            <strong>Rules:</strong>{' '}
            Guests: {room.rules.guestAllowed ? 'Allowed' : 'No'}, Smoking: {room.rules.smokingAllowed ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Additional Details :  </strong>
            
              {room.additionalNotes}

          </p>
         <a 
  href={`tel:${room.phoneNumber}`} 
  className="inline-block mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition"
>
  📞 Contact Owner
</a>
        </div>
        
        {/* Right side images */}
        <div className="md:w-1/2 ml-20">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="rounded shadow"
          >
            {room.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`http://localhost:5000${img}`}
                  alt={`Room ${index + 1}`}
                  className="w-full h-[350px] object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Recommended PGs */}
      {/* Recommended PGs Swiper */}
      <div className="px-6 py-10 relative">
        <h3 className="text-xl font-bold mb-4">Recommended PGs</h3>

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
          className="relative"
        >
          {recommendedPGs.map((pg) => (
            <SwiperSlide key={pg._id}>
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col">
                <img
                  src={`http://localhost:5000${pg.images[0]}`}
                  alt={pg.pgTitle}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-semibold text-lg">{pg.pgTitle}</h4>
                  <p className="text-gray-600">₹{pg.rent}/month </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{pg.address}</span>
                  </p>
                  <div className="mt-auto flex justify-center">
                    <Link to={`/roomDetails/${pg._id}`}>
                      <button className="w-auto mt-2 text-sm text-white p-2 rounded bg-emerald-700 hover:bg-emerald-800 font-medium">
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons */}
        </Swiper>
          <button className="swiper-button-prev-custom absolute h-10 w-10 left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/70 z-10">
            &#10094;
          </button>
          <button className="swiper-button-next-custom absolute right-2 h-10 w-10 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/70 z-10">
            &#10095;
          </button>
      </div>
      
    </>
  );
}
