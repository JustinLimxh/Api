const express = require('express');
const router = express.Router();
const NutritionItem = require('../models/NutritionItem');

// Get all saved items
router.get('/', async (req, res) => {
  try {
    const items = await NutritionItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
});

// Save new item
router.post('/', async (req, res) => {
  const { name, calories, image } = req.body; 

  try {
    const newItem = new NutritionItem({ name, calories, image });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Update only the calories field
router.put('/:id', async (req, res) => {
  const { calories } = req.body;

  try {
    const updatedItem = await NutritionItem.findByIdAndUpdate(
      req.params.id,
      { calories },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await NutritionItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
