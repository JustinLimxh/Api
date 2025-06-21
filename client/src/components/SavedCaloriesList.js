import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedCaloriesList = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newCalories, setNewCalories] = useState('');

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    const res = await axios.get('http://localhost:5000/api/saved');
    setSavedItems(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/saved/${id}`);
    fetchSaved();
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/saved/${id}`, {
      calories: Number(newCalories),
    });
    setEditingId(null);
    setNewCalories('');
    fetchSaved();
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.header}>📋 My Saved Calories</h2>
      {savedItems.length === 0 && <p>No data saved yet.</p>}
      {savedItems.map((item) => (
        <div key={item._id} style={styles.item}>
          <div style={styles.info}>
            {item.image && (
              <img src={item.image} alt={item.name} style={styles.image} />
            )}
            <div>
              <div><strong>{item.name}</strong></div>
              <div>{item.calories} cal</div>
            </div>
          </div>

          <div>
            {editingId === item._id ? (
              <>
                <input
                  type="number"
                  value={newCalories}
                  onChange={(e) => setNewCalories(e.target.value)}
                  placeholder="New calories"
                  style={styles.input}
                />
                <button onClick={() => handleUpdate(item._id)} style={styles.save}>Save</button>
                <button onClick={() => setEditingId(null)} style={styles.cancel}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => {
                  setEditingId(item._id);
                  setNewCalories(item.calories);
                }} style={styles.edit}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={styles.delete}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '700px',
    margin: '2rem auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  input: {
    padding: '5px',
    width: '80px',
  },
  edit: {
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: '5px',
  },
  save: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: '5px',
  },
  cancel: {
    background: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: '5px',
  },
  delete: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: '5px',
  },
};

export default SavedCaloriesList;
