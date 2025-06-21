const mongoose = require('mongoose');

const NutritionDetailsSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  image: String
});

module.exports = mongoose.model('NutritionDetails', NutritionDetailsSchema);
