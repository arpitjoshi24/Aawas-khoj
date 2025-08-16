const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
   ownerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  pgTitle: String,
  pgType: String,
  address: String,
  googleMapLocation: Boolean,
  rent: Number,
  securityDeposit: Number,
  availableFrom: String,
  sharingType: String,
  totalBeds: Number,
  images: [String], 

  facilities: {
    wifi: Boolean,
    hasAC: Boolean,
    laundry: Boolean,
    mealsIncluded: Boolean,
    powerBackup: Boolean,
    roomCleaning: Boolean,
    cctv: Boolean
  },

  rules: {
    entryTime: String,
    exitTime: String,
    smokingAllowed: Boolean,
    genderReference: String,
    guestAllowed: Boolean
  },
  additionalNotes: String
});

module.exports = mongoose.model('Room', roomSchema);
