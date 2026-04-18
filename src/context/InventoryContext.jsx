import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

const API_URL = 'http://localhost:5000/api/gear';

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from MongoDB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addItem = async (item) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const newItem = await response.json();
      setItems(prev => [...prev, newItem]);
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const updateItem = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      const updatedItem = await response.json();
      setItems(prev => prev.map(item => item._id === id ? updatedItem : item));
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, deleteItem, updateItem, loading }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
