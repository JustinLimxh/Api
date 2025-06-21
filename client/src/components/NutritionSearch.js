import React, { useState } from 'react';
import axios from 'axios';

const NutritionSearch = () => {
  const [query, setQuery] = useState('');
  const [nutrition, setNutrition] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/nutrition/search?q=${query}`);
      setNutrition(res.data);
      setError('');
      setShowDetails(false);
    } catch (err) {
      setNutrition(null);
      setError('No data found or an error occurred');
    }
  };
const handleSaveFullDetails = async () => {
  try {
    await axios.post('http://localhost:5000/api/fullnutrition', {
      name: nutrition.name,
      calories: nutrition.calories,
      protein: nutrition.protein,
      fat: nutrition.fat,
      carbs: nutrition.carbs,
      image: nutrition.image
    });
    alert('Full details saved!');
  } catch {
    alert('Error saving full details.');
  }
};

  const handleSave = async () => {
  try {
    await axios.post('http://localhost:5000/api/saved', {
      name: nutrition.name,
      calories: nutrition.calories,
      image: nutrition.image 
    });
    alert('Saved!');
  } catch {
    alert('Error saving.');
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title mb-4 text-center">🍎 Nutrition Info Search</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a food (e.g., rice)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {nutrition && (
          <div className="card p-3 mt-4 bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{nutrition.name}</h5>
                <small className="text-muted">{nutrition.calories} calories</small>
              </div>
              <img src={nutrition.image} alt={nutrition.name} className="img-thumbnail" style={{ width: '60px' }} />
            </div>

            <button
              className="btn btn-link mt-2 p-0"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details ▲' : 'Show Details ▼'}
            </button>

            {showDetails && (
              <ul className="list-group list-group-flush mt-2">
                <li className="list-group-item"><strong>Protein:</strong> {nutrition.protein} g</li>
                <li className="list-group-item"><strong>Fat:</strong> {nutrition.fat} g</li>
                <li className="list-group-item"><strong>Carbohydrates:</strong> {nutrition.carbs} g</li>
              </ul>
            )}

            <button
              className="btn btn-success mt-3"
              onClick={handleSave}
            >
              Save to My List
            </button>

            <button
  className="btn btn-secondary mt-2"
  onClick={handleSaveFullDetails}
>
  Save Full Details
</button>

          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionSearch;
