import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NutritionSearch from './components/NutritionSearch';
import SavedCaloriesList from './components/SavedCaloriesList';
import SavedFullNutritionList from './components/SavedFullNutritionList';



const App = () => {
  return (
    <Router>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">🍽️ NutriTracker</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved">Saved Calories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/full-details">Full Details</Link>
            </li>
          </ul>
        </div>
      </nav>

      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<NutritionSearch />} />
          <Route path="/saved" element={<SavedCaloriesList />} />
          <Route path="/full-details" element={<SavedFullNutritionList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
