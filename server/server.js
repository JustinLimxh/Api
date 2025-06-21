const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Existing routes
const recipeRoutes = require('./routes/recipeRoutes');
const nutritionixRoutes = require('./routes/nutritionixRoutes');
app.use('/api/recipes', recipeRoutes);
app.use('/api/nutrition', nutritionixRoutes);

const nutritionDetailsRoutes = require('./routes/nutritionDetailsRoutes');
app.use('/api/fullnutrition', nutritionDetailsRoutes);

const nutritionDataRoutes = require('./routes/nutritionDataRoutes');
app.use('/api/saved', nutritionDataRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
