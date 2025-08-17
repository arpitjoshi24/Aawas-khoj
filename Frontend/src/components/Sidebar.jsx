import React, { useState } from 'react';
import {
  Wifi,
  AirVent,
  WashingMachine,
  Utensils,
  PlugZap,
  Sparkles,
  Cctv
} from 'lucide-react';

export default function Sidebar({ filters, setFilters }) {
  const defaultPrice = 30000; // set to max to show all data by default
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [price, setPrice] = useState(defaultPrice);

  const amenitiesOptions = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={14} /> },
    { key: 'hasAC', label: 'Air Conditioning', icon: <AirVent size={14} /> },
    { key: 'laundry', label: 'Laundry Service', icon: <WashingMachine size={14} /> },
    { key: 'mealsIncluded', label: 'Meals Included', icon: <Utensils size={14} /> },
    { key: 'powerBackup', label: 'Power Backup', icon: <PlugZap size={14} /> },
    { key: 'roomCleaning', label: 'Room Cleaning', icon: <Sparkles size={14} /> },
    { key: 'cctv', label: 'CCTV Surveillance', icon: <Cctv size={14} /> },
  ];

  const handleAmenityClick = (amenityKey) => {
    const updated = selectedAmenities.includes(amenityKey)
      ? selectedAmenities.filter((a) => a !== amenityKey)
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
    const resetFilters = {
      price: defaultPrice,
      amenities: [],
      location: '',
      pgType: '',
      sharingType: '',
      genderReference: '',
      guestAllowed: '',
      smokingAllowed: '',
    };

    setSelectedAmenities([]);
    setPrice(defaultPrice);
    setFilters(resetFilters);
  };

  return (
    <div className="w-72 p-4 px-8 bg-white shadow-md rounded-md mt-2 space-y-6 sticky top-4 h-fit self-start border border-gray-200">
      
      {/* Location */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Location</label>
        <input
          type="text"
          value={filters.location}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="Enter location"
          onChange={(e) => handleSelectChange('location', e.target.value)}
        />
      </div>

      {/* PG Type - Updated to match RegisterRooms options */}
      <div>
        <label className="block mb-1 text-sm font-semibold">PG Type</label>
        <select
          value={filters.pgType}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('pgType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="PG">PG</option>
          <option value="flat">Flat</option>
          <option value="shared room">Shared Room</option>
        </select>
      </div>

      {/* Sharing Type - Updated to match RegisterRooms options */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Sharing Type</label>
        <select
          value={filters.sharingType}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('sharingType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
          <option value="quad">Quad</option>
          <option value="dormitory">Dormitory</option>
        </select>
      </div>

      {/* Gender Reference - Updated to match RegisterRooms options */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Gender Type</label>
        <select
          value={filters.genderReference}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('genderReference', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="co-live">Co-live</option>
        </select>
      </div>

      {/* Guest Allowed */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Guests Allowed</label>
        <select
          value={filters.guestAllowed}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('guestAllowed', e.target.value)}
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Smoking Allowed - Added to match RegisterRooms */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Smoking Allowed</label>
        <select
          value={filters.smokingAllowed}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onChange={(e) => handleSelectChange('smokingAllowed', e.target.value)}
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

      {/* Amenities - Updated to match RegisterRooms facilities */}
      <div>
        <label className="block mb-2 text-sm font-semibold">Facilities</label>
        <div className="flex flex-wrap gap-2 text-sm">
          {amenitiesOptions.map(({ key, label, icon }) => {
            const selected = selectedAmenities.includes(key);
            return (
              <button
                key={key}
                onClick={() => handleAmenityClick(key)}
                className={`flex items-center gap-1 border px-2 py-1 rounded-full cursor-pointer text-xs ${
                  selected
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-gray-400 text-gray-700'
                }`}
              >
                {icon} {label}
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