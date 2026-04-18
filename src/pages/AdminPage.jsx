import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Camera, Video, Plane, Layers, X, Save, Upload } from 'lucide-react';

const AdminPage = () => {
  const { items, addItem, deleteItem } = useInventory();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'DSLR',
    price: '',
    desc: '',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' // Default placeholder
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({
      ...newItem,
      price: parseInt(newItem.price)
    });
    setNewItem({
      name: '',
      category: 'DSLR',
      price: '',
      desc: '',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    });
    setShowAddModal(false);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem' }}>INVENTORY <span className="gradient-text">MANAGER</span></h1>
            <p style={{ color: 'var(--text-dim)' }}>Manage your rental catalog items</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Add New Item
          </button>
        </div>

        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1.5rem' }}>Item</th>
                <th>Category</th>
                <th>Price/Day</th>
                <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.desc.substring(0, 30)}...</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                      {item.category}
                    </span>
                  </td>
                  <td>₹{item.price}</td>
                  <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                    <button 
                      onClick={() => deleteItem(item._id)} 
                      style={{ color: '#ff4444', padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,68,68,0.1)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,68,68,0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div style={{ 
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 2000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
            }}>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card" 
                style={{ maxWidth: '600px', width: '100%', position: 'relative' }}
              >
                <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-dim)' }}>
                  <X size={24} />
                </button>
                <h2 style={{ marginBottom: '2rem' }}>Add New <span className="gradient-text">Gear</span></h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Gear Name</label>
                    <input 
                      required 
                      type="text" 
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="e.g. Sony A7S III"
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Category</label>
                      <select 
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }}
                      >
                        <option value="DSLR">DSLR</option>
                        <option value="Cinema">Cinema</option>
                        <option value="Drone">Drone</option>
                        <option value="Lens">Lens</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Price/Day (₹)</label>
                      <input 
                        required 
                        type="number" 
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                        placeholder="1500"
                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Description</label>
                    <textarea 
                      required 
                      rows="3"
                      value={newItem.desc}
                      onChange={(e) => setNewItem({...newItem, desc: e.target.value})}
                      placeholder="Brief description of the gear..."
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px', resize: 'none' }} 
                    />
                  </div>

                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Image URL</label>
                    <input 
                      type="text" 
                      value={newItem.image}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                    />
                  </div>

                  <button className="btn-primary" style={{ padding: '1.2rem', marginTop: '1rem' }}>
                    Save to Catalog
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
