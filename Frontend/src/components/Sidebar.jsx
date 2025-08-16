import React, { useState } from 'react';
import { Wifi, AirVent, WashingMachine, Utensils, PlugZap, BrushCleaning, Cctv } from 'lucide-react';

export default function Sidebar({ filters, setFilters }) {
  const defaultPrice = 8000;
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [price, setPrice] = useState(defaultPrice);

  const amenitiesOptions = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={14}/>},
    { key: 'hasAC', label: 'Air Conditioning' , icon: <AirVent size={14} />  },
    { key: 'mealsIncluded', label: 'Meals Included' , icon: <Utensils size={14} />  },
    { key: 'cctv', label: 'CCTV' , icon:  <Cctv size={14}/> },
    { key: 'laundry', label: 'Laundry'  , icon: <WashingMachine size={14}/> },
    { key: 'roomCleaning', label: 'Room Cleaning' , icon: <BrushCleaning size={14}/>  },
    { key: 'powerBackup', label: 'Power Backup' , icon: <PlugZap size={14}/>  },
  ];

  const handleAmenityClick = (amenityKey) => {
    const updated = selectedAmenities.includes(amenityKey)
      ? selectedAmenities.filter(a => a !== amenityKey)
      : [...selectedAmenities, amenityKey];

    setSelectedAmenities(updated);
    setFilters({ ...filters, amenities: updated });
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    setFilters({ ...filters, price: newPrice });
  };

  const handleSelectChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleResetFilters = () => {
    setSelectedAmenities([]);
    setPrice(defaultPrice);
    setFilters({
      price: defaultPrice,
      amenities: [],
      location: '',
      pgType: '',
      sharingType: '',
      genderReference: '',
      smokingAllowed: '',
      guestAllowed: '',
    });
  };

  return (
    <div className="w-72 p-4 px-8 bg-white shadow-md rounded-md mt-2 space-y-6 sticky top-4 h-fit self-start border border-gray-200">
      
      {/* Location */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Location</label>
        <input
          type="text"
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="Enter location"
          onChange={(e) => handleSelectChange('location', e.target.value)}
        />
      </div>

      {/* Room Type */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Room Type</label>
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('pgType', e.target.value)}
        >
          <option value="">Select</option>
          <option value="PG">PG</option>
          <option value="flat">Flat</option>
          <option value="shared room">Shared Room</option>
        </select>
      </div>

      {/* Sharing Type */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Sharing Type</label>
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('sharingType', e.target.value.toLowerCase())}
        >
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
          <option value="quad">Quad</option>
          <option value="dormitory">Dormitory</option>
        </select>
      </div>

      {/* Gender Reference */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Gender</label>
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('genderReference', e.target.value)}
        >
          <option value="">Any</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      {/* Guest Allowed */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Guest Allowed</label>
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('guestAllowed', e.target.value)}
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Max Price</label>
        <input
          type="range"
          min="2000"
          max="30000"
          step="500"
          value={price}
          onChange={handlePriceChange}
          className="w-full accent-emerald-600"
        />
        <div className="text-center text-sm">₹{price}</div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block mb-2 text-sm font-semibold">Amenities</label>
        <div className="flex flex-wrap gap-2 text-sm">
          {amenitiesOptions.map(({ key, label, icon }) => {
            const selected = selectedAmenities.includes(key);
            return (
              <button
                  key={key}
                  onClick={() => handleAmenityClick(key)}
                  className={`flex items-center gap-1 border px-2 py-1 rounded-full cursor-pointer  text-xs ${
                    selected
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-gray-400 text-gray-700'
                  }`}
                >
                  {icon}
                  {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-4">
        <button
          onClick={handleResetFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
