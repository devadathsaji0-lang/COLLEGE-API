const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: String,
  timestamp: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.get('/', (req, res) => {
  res.send('COLLEGE API is Live 🎉');
});

// Save attendance
app.post('/attendance', async (req, res) => {
  try {
    const { name, status, date } = req.body;
    const newAttendance = new Attendance({ name, status, date });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance saved', data: newAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Error saving attendance', error });
  }
});

// Get all attendance
app.get('/attendance', async (req, res) => {
  try {
    const data = await Attendance.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
