import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from "react-icons/fa";
export default function RegisterRooms() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  const [formData, setFormData] = useState({
      ownerName: '',
  phoneNumber: '',
    pgTitle: '',
    pgType: '',
    address: '',
    googleMapLocation: false,
    rent: '',
    securityDeposit: '',
    availableFrom: '',
    sharingType: '',
    totalBeds: '',
    images: [],
    facilities: {
      wifi: false,
      hasAC: false,
      laundry: false,
      mealsIncluded: false,
      powerBackup: false,
      roomCleaning: false,
      cctv: false
    },
    rules: {
      entryTime: '',
      exitTime: '',
      smokingAllowed: false,
      genderReference: '',
      guestAllowed: false
    },

    additionalNotes: " "

  });

 const onSubmit = async (data) => {
  const valid = await trigger([
    'rules.entryTime',
    'rules.exitTime',
    'rules.smokingAllowed',
    'rules.guestAllowed',
    'additionalNotes'
  ]);

  if (!valid) {
    alert("Please complete all required fields in Step 4 before submitting.");
    return;
  }

  try {
    const formDataToSend = new FormData();

    // Add images (from state, not from `data`)
   formData.images.forEach((imgObj) => {
  formDataToSend.append('images', imgObj.file);
});


    // Add other fields
    for (let key in formData) {
      if (key === 'images') continue; // already added
      if (typeof formData[key] === 'object') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    const res = await axios.post('http://localhost:5000/api/rooms', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Room registered successfully!');
    navigate('/rooms');
  } catch (error) {
    console.error(error);
    alert('Something went wrong!');
  }
};



  const handleNext = async () => {
    // Validate current step before proceeding
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger([  'ownerName','phoneNumber','pgTitle', 'pgType', 'address', 'rules.genderReference']);
    } else if (step === 2) {
      isValid = await trigger(['rent', 'availableFrom', 'sharingType', 'totalBeds']);
    } else if (step === 3) {
      // No required fields in facilities step
      isValid = true;
    }

    if (isValid && step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

 const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const newImages = [];

  for (let i = 0; i < files.length && formData.images.length + newImages.length < 5; i++) {
    const file = files[i];
    newImages.push({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...newImages],
  }));
};
 

const removeImage = (index) => {
  const updatedImages = [...formData.images];
  URL.revokeObjectURL(updatedImages[index].preview); // clean memory
  updatedImages.splice(index, 1);

  setFormData((prev) => ({
    ...prev,
    images: updatedImages,
  }));
};


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register Your Room</h1>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12 relative">
        {/* Step 1 */}
        <div className={`flex flex-col items-center z-10 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 border-4 ${step >= 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}`}>
            1
          </div>
          <div className={`text-sm ${step >= 1 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Basic Details</div>
        </div>
        
        {/* Connector */}
        <div className={`flex-grow h-1 mx-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        
        {/* Step 2 */}
        <div className={`flex flex-col items-center z-10 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 border-4 ${step >= 2 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}`}>
            2
          </div>
          <div className={`text-sm ${step >= 2 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Rent & Room</div>
        </div>
        
        {/* Connector */}
        <div className={`flex-grow h-1 mx-4 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        
        {/* Step 3 */}
        <div className={`flex flex-col items-center z-10 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 border-4 ${step >= 3 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}`}>
            3
          </div>
          <div className={`text-sm ${step >= 3 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Facilities</div>
        </div>
        
        {/* Connector */}
        <div className={`flex-grow h-1 mx-4 ${step >= 4 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        
        {/* Step 4 */}
        <div className={`flex flex-col items-center z-10 ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 border-4 ${step >= 4 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}`}>
            4
          </div>
          <div className={`text-sm ${step >= 4 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Rules</div>
        </div>
      </div>

     <form
  onSubmit={handleSubmit(onSubmit)}
  onKeyDown={e => {
    if (e.key === 'Enter' && step < 4) {
      e.preventDefault();
    }
  }}
  className="bg-white rounded-lg shadow-md p-6 mb-6"
>
        {/* Step 1: Basic Details */}
      {step === 1 && (
      <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Basic Details</h2>
      <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Owner Name*</label>
      <input
        type="text"
        {...register("ownerName", { required: "Owner name is required" })}
        value={formData.ownerName}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.ownerName && <span className="text-sm text-red-600">{errors.ownerName.message}</span>}
    </div>

    {/* Phone Number */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
      <input
        type="tel"
        {...register("phoneNumber", {
          required: "Phone number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter a valid 10-digit Indian phone number"
          }
        })}
        value={formData.phoneNumber}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.phoneNumber && <span className="text-sm text-red-600">{errors.phoneNumber.message}</span>}
    </div>
            <div className="space-y-2">

              <label className="block text-sm font-medium text-gray-700">PG Title*</label>
              <input
                type="text"
                {...register("pgTitle", { required: "PG Title is required" })}
                value={formData.pgTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.pgTitle && <span className="text-sm text-red-600">{errors.pgTitle.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">PG Type*</label>
              <select
                {...register("pgType", { required: "PG Type is required" })}
                value={formData.pgType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="PG">PG</option>
                <option value="flat">Flat</option>
                <option value="shared room">Shared Room</option>
              </select>
              {errors.pgType && <span className="text-sm text-red-600">{errors.pgType.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender Type*</label>
              <select
                {...register("rules.genderReference", { required: "Gender Type is required" })}
                value={formData.rules.genderReference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="co-live">Co-live</option>
              </select>
              {errors.rules?.genderReference && <span className="text-sm text-red-600">{errors.rules.genderReference.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address*</label>
              <textarea
                {...register("address", { required: "Address is required" })}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street, City, State"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              {errors.address && <span className="text-sm text-red-600">{errors.address.message}</span>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="googleMapLocation"
                {...register("googleMapLocation")}
                checked={formData.googleMapLocation}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="googleMapLocation" className="ml-2 block text-sm text-gray-700">
                Not available on Google Maps
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Rent and Room Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Rent and Room Details</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Rent (₹)*</label>
              <input
                type="number"
                {...register("rent", { 
                  required: "Rent is required",
                  min: { value: 1, message: "Rent must be at least ₹1" }
                })}
                value={formData.rent}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.rent && <span className="text-sm text-red-600">{errors.rent.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Security Deposit (₹)</label>
              <input
                type="number"
                {...register("securityDeposit")}
                value={formData.securityDeposit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Available From*</label>
              <input
                type="date"
                {...register("availableFrom", { required: "Available date is required" })}
                value={formData.availableFrom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.availableFrom && <span className="text-sm text-red-600">{errors.availableFrom.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sharing Type*</label>
              <select
                {...register("sharingType", { required: "Sharing type is required" })}
                value={formData.sharingType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
                <option value="quad">Quad</option>
                <option value="dormitory">Dormitory</option>
              </select>
              {errors.sharingType && <span className="text-sm text-red-600">{errors.sharingType.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Beds in Room*</label>
              <input
                type="number"
                {...register("totalBeds", { 
                  required: "Total beds is required",
                  min: { value: 1, message: "Must have at least 1 bed" }
                })}
                value={formData.totalBeds}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.totalBeds && <span className="text-sm text-red-600">{errors.totalBeds.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload Images (Max 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {formData.images.length > 0 && (
  <div className="mt-2 text-sm text-gray-600">
    {formData.images.length} images selected
  </div>
)}
{formData.images.length > 0 && (
  <div className="mt-2 text-sm text-gray-600">
    
    <div className="flex flex-wrap gap-4 mt-2">
      {formData.images.map((img, idx) => (
        <div key={idx} className="relative w-24 h-24">
          <img
            src={img.preview}
            alt={`preview-${idx}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute w-5 h-5 justify-center top-0 right-1 text-white rounded-full p-1 text-xs"
          >
          <FaTimesCircle className="w-5 h-5 " />
          </button>
        </div>
      ))}
    </div>
  </div>
)}

            </div>
          </div>
        )}

        {/* Step 3: Facilities */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wifi"
                  {...register("facilities.wifi")}
                  checked={formData.facilities.wifi}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="wifi" className="ml-2 block text-sm text-gray-700">
                  WiFi
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasAC"
                  {...register("facilities.hasAC")}
                  checked={formData.facilities.hasAC}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasAC" className="ml-2 block text-sm text-gray-700">
                  Air Conditioning
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="laundry"
                  {...register("facilities.laundry")}
                  checked={formData.facilities.laundry}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="laundry" className="ml-2 block text-sm text-gray-700">
                  Laundry Service
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mealsIncluded"
                  {...register("facilities.mealsIncluded")}
                  checked={formData.facilities.mealsIncluded}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="mealsIncluded" className="ml-2 block text-sm text-gray-700">
                  Meals Included
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="powerBackup"
                  {...register("facilities.powerBackup")}
                  checked={formData.facilities.powerBackup}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="powerBackup" className="ml-2 block text-sm text-gray-700">
                  Power Backup
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="roomCleaning"
                  {...register("facilities.roomCleaning")}
                  checked={formData.facilities.roomCleaning}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="roomCleaning" className="ml-2 block text-sm text-gray-700">
                  Room Cleaning
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cctv"
                  {...register("facilities.cctv")}
                  checked={formData.facilities.cctv}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="cctv" className="ml-2 block text-sm text-gray-700">
                  CCTV Surveillance
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Rules and Timing */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Rules and Timing</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Entry Time</label>
              <input
                type="time"
               {...register("rules.entryTime", { required: "Entry time is required" })}
                value={formData.rules.entryTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Exit Time</label>
              <input
                type="time"
                {...register("rules.exitTime", { required: "Exit time is required" })}
                value={formData.rules.exitTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="smokingAllowed"
                {...register("rules.smokingAllowed")}
                checked={formData.rules.smokingAllowed}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="smokingAllowed" className="ml-2 block text-sm text-gray-700">
                Smoking Allowed
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="guestAllowed"
                {...register("rules.guestAllowed")}
                checked={formData.rules.guestAllowed}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="guestAllowed" className="ml-2 block text-sm text-gray-700">
                Guests Allowed
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea

                {...register("additionalNotes")}
                checked={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional rules or information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}

              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Register Property
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 


