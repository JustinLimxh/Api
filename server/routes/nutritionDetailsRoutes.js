const express = require('express');
const router = express.Router();
const NutritionDetails = require('../models/NutritionDetails');

// Save full details
router.post('/', async (req, res) => {
  try {
    const { name, calories, protein, fat, carbs, image } = req.body;
    const newItem = new NutritionDetails({ name, calories, protein, fat, carbs, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save full nutrition details' });
  }
});

// Get all full details
router.get('/', async (req, res) => {
  try {
    const items = await NutritionDetails.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nutrition details' });
  }
});

// Update full details by ID
router.put('/:id', async (req, res) => {
  try {
    const { calories, protein, fat, carbs } = req.body;
    const updatedItem = await NutritionDetails.findByIdAndUpdate(
      req.params.id,
      { calories, protein, fat, carbs },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update nutrition details' });
  }
});

// Delete full details by ID
router.delete('/:id', async (req, res) => {
  try {
    await NutritionDetails.findByIdAndDelete(req.params.id);
    res.json({ message: 'Nutrition details deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete nutrition details' });
  }
});

module.exports = router;
