const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Room = require('../models/Room');

// Ensure 'uploads/' folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST /api/rooms
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const {
      ownerName,
      phoneNumber,
      pgTitle,
      pgType,
      address,
      googleMapLocation,
      rent,
      securityDeposit,
      availableFrom,
      sharingType,
      totalBeds,
      facilities,
      rules,
      additionalNotes
    } = req.body;

    if (!ownerName || !phoneNumber || !pgTitle || !pgType || !address || !availableFrom || !rent || !sharingType || !totalBeds || !rules) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedFacilities = {};
    let parsedRules = {};
    try {
      parsedFacilities = typeof facilities === 'string' ? JSON.parse(facilities) : facilities;
      parsedRules = typeof rules === 'string' ? JSON.parse(rules) : rules;
    } catch (parseError) {
      return res.status(400).json({ message: 'Invalid JSON in facilities or rules' });
    }

    const newRoom = new Room({
      ownerName,
      phoneNumber,
      pgTitle,
      pgType,
      address,
      googleMapLocation: googleMapLocation === 'true',
      rent: Number(rent),
      securityDeposit: Number(securityDeposit || 0),
      availableFrom,
      sharingType,
      totalBeds: Number(totalBeds),
      images: req.files.map(file => `/uploads/${file.filename}`),
      facilities: parsedFacilities,
      rules: parsedRules,
      additionalNotes
    });

    await newRoom.save();
    return res.status(201).json({ message: 'Room registered successfully', room: newRoom });
  } catch (error) {
    console.error('Error saving room:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

// 👇 NEW: GET single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Error fetching room' });
  }
});

module.exports = router;
