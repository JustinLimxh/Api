const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Load from .env
const appId = process.env.NUTRITIONIX_APP_ID;
const appKey = process.env.NUTRITIONIX_APP_KEY;

console.log(' App ID:', appId);
console.log(' App Key:', appKey);  // Note: Never log in production

router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query ?q=' });

  try {
    const response = await axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query },
      {
        headers: {
          'x-app-id': appId,
          'x-app-key': appKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const food = response.data.foods[0];

    const result = {
      name: food.food_name,
      calories: food.nf_calories,
      protein: food.nf_protein,
      fat: food.nf_total_fat,
      carbs: food.nf_total_carbohydrate,
      image: food.photo.thumb,
    };

    res.json(result);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch Nutritionix data' });
  }
});

module.exports = router;
