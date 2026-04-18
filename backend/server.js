const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Gear Model
const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Gear = mongoose.model('Gear', gearSchema);

// API Routes
// 1. Get all gear
app.get('/api/gear', async (req, res) => {
  try {
    const gear = await Gear.find();
    res.json(gear);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add new gear
app.post('/api/gear', async (req, res) => {
  const gear = new Gear(req.body);
  try {
    const newGear = await gear.save();
    res.status(201).json(newGear);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Delete gear
app.delete('/api/gear/:id', async (req, res) => {
  try {
    await Gear.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Update gear (Optional)
app.put('/api/gear/:id', async (req, res) => {
  try {
    const updatedGear = await Gear.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGear);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
