const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brevodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(' MongoDB connected');
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});

// Routes
app.use('/', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
