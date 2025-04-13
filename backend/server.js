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
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.post('/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

app.put('/events/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Goals & Tasks
app.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

app.post('/goals', async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    const saved = await newGoal.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal' });
  }
});

app.delete('/goals/:id', async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully', deletedGoal });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

// === START SERVER ===
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
