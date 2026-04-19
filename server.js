const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect('mongodb+srv://collegeDB:Devadath2006@cluster0.yz9sgva.mongodb.net/collegeDB?retryWrites=true&w=majority&appName=Cluster0');

// 1. ATTENDANCE SCHEMA
const attendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: String
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// 2. STUDENT SCHEMA
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  phone: String,
  course: String,
  photo: String
});
const Student = mongoose.model('Student', studentSchema);

// 3. COURSE SCHEMA
const courseSchema = new mongoose.Schema({
  id: String,
  name: String,
  credits: Number
});
const Course = mongoose.model('Course', courseSchema);

// 4. FACULTY SCHEMA
const facultySchema = new mongoose.Schema({
  id: String,
  name: String,
  dept: String
});
const Faculty = mongoose.model('Faculty', facultySchema);

// ATTENDANCE ROUTES
app.get('/attendance', async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

app.post('/attendance', async (req, res) => {
  const newItem = new Attendance(req.body);
  await newItem.save();
  res.json({ message: 'Saved to MongoDB!' });
});

// STUDENT ROUTES
app.get('/students', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.post('/students', async (req, res) => {
  const newItem = new Student(req.body);
  await newItem.save();
  res.json({ message: 'Student Saved!' });
});

// COURSE ROUTES
app.get('/courses', async (req, res) => {
  const data = await Course.find();
  res.json(data);
});

app.post('/courses', async (req, res) => {
  const newItem = new Course(req.body);
  await newItem.save();
  res.json({ message: 'Course Saved!' });
});

// FACULTY ROUTES
app.get('/faculty', async (req, res) => {
  const data = await Faculty.find();
  res.json(data);
});

app.post('/faculty', async (req, res) => {
  const newItem = new Faculty(req.body);
  await newItem.save();
  res.json({ message: 'Faculty Saved!' });
});

app.listen(5000, () => console.log('Server running on 5000'));
