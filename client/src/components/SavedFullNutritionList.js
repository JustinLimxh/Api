import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedFullNutritionList = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    calories: '',
    protein: '',
    fat: '',
    carbs: ''
  });

  useEffect(() => {
    fetchFullDetails();
  }, []);

  const fetchFullDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/fullnutrition');
      setItems(res.data);
    } catch {
      alert('Failed to fetch full nutrition data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fullnutrition/${id}`);
      fetchFullDetails();
    } catch {
      alert('Failed to delete');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/fullnutrition/${id}`, editForm);
      setEditingId(null);
      setEditForm({ calories: '', protein: '', fat: '', carbs: '' });
      fetchFullDetails();
    } catch {
      alert('Failed to update');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">📊 Full Nutrition Records</h2>

        {items.length === 0 && <p>No full nutrition data saved yet.</p>}

        {items.map((item) => (
          <div key={item._id} className="card mb-3 p-3 bg-light">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5>{item.name}</h5>
                <p className="text-muted">{item.calories} calories</p>
              </div>
              <img src={item.image} alt={item.name} className="img-thumbnail" style={{ width: '60px' }} />
            </div>

            {editingId === item._id ? (
              <div className="mt-3">
                <input
                  type="number"
                  className="form-control mb-1"
                  placeholder="Calories"
                  value={editForm.calories}
                  onChange={(e) => setEditForm({ ...editForm, calories: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-1"
                  placeholder="Protein"
                  value={editForm.protein}
                  onChange={(e) => setEditForm({ ...editForm, protein: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-1"
                  placeholder="Fat"
                  value={editForm.fat}
                  onChange={(e) => setEditForm({ ...editForm, fat: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Carbs"
                  value={editForm.carbs}
                  onChange={(e) => setEditForm({ ...editForm, carbs: e.target.value })}
                />
                <button className="btn btn-success me-2" onClick={() => handleUpdate(item._id)}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <ul className="list-group list-group-flush mt-2">
                  <li className="list-group-item"><strong>Protein:</strong> {item.protein} g</li>
                  <li className="list-group-item"><strong>Fat:</strong> {item.fat} g</li>
                  <li className="list-group-item"><strong>Carbohydrates:</strong> {item.carbs} g</li>
                </ul>
                <div className="mt-3">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setEditingId(item._id);
                      setEditForm({
                        calories: item.calories,
                        protein: item.protein,
                        fat: item.fat,
                        carbs: item.carbs
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedFullNutritionList;
