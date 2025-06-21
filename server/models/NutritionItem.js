const mongoose = require('mongoose');

const NutritionItemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  image: String, 
}, { timestamps: true });

module.exports = mongoose.model('NutritionItem', NutritionItemSchema);
