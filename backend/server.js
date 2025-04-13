const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// === INIT ===
const app = express();
app.use(cors());
app.use(express.json());

// === CONNECT TO MONGODB ===
mongoose.connect('mongodb://localhost:27017/calendarApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// === SCHEMAS & MODELS ===

// Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  category: {
    type: String,
    enum: ['exercise', 'eating', 'work', 'relax', 'family', 'social'],
  },
  start: Date,
  end: Date,
  color: String, // Optional: for color-coding by category or goal
});

const Event = mongoose.model('Event', eventSchema);

// Goal + Tasks Schema
const goalSchema = new mongoose.Schema({
  name: String,
  color: String,
  tasks: [String], // List of task names under the goal
});

const Goal = mongoose.model('Goal', goalSchema);

// === ROUTES ===

// Events
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  const newEvent = new Event(req.body);
  const saved = await newEvent.save();
  res.json(saved);
});

app.put('/events/:id', async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

// Goals & Tasks
app.get('/goals', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

app.post('/goals', async (req, res) => {
  const newGoal = new Goal(req.body);
  const saved = await newGoal.save();
  res.json(saved);
});

// === START SERVER ===
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
