import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Camera, Video, Plane, Layers, CheckCircle, ArrowRight, X } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

const BookingSystem = () => {
  const { items, loading } = useInventory();
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [booked, setBooked] = useState(false);
  const [filter, setFilter] = useState('All');
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    date: '',
    duration: '1'
  });

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Format message
    let message = `Hello ECR Rental Studio!%0A%0A`;
    message += `*NEW BOOKING REQUEST*%0A`;
    message += `---------------------------%0A`;
    message += `*Name:* ${checkoutData.name}%0A`;
    message += `*Phone:* ${checkoutData.phone}%0A`;
    message += `*Rental Date:* ${checkoutData.date}%0A`;
    message += `*Duration:* ${checkoutData.duration} Day(s)%0A%0A`;
    message += `*Equipment Selected:*%0A`;
    
    cart.forEach(item => {
      message += `• ${item.name} x ${item.quantity} (₹${item.price * item.quantity})%0A`;
    });
    
    message += `---------------------------%0A`;
    message += `*Final Total: ₹${totalPrice}*%0A%0A`;
    message += `Please confirm availability for these dates. Thanks!`;

    const whatsappUrl = `https://wa.me/919786787873?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setBooked(true);
  };

  const filteredProducts = filter === 'All' 
    ? items 
    : items.filter(p => p.category === filter);

  // Helper to get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'DSLR': return <Camera size={20} />;
      case 'Cinema': return <Video size={20} />;
      case 'Drone': return <Plane size={20} />;
      default: return <Layers size={20} />;
    }
  };

  if (booked) {
    return (
      <section id="booking" className="reveal active">
        <div className="glass-card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '4rem' }}>
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            style={{ color: 'var(--primary)', marginBottom: '2rem' }}
          >
            <CheckCircle size={80} style={{ margin: '0 auto' }} />
          </motion.div>
          <h2 style={{ marginBottom: '1rem' }}>Request Sent!</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
            Your booking details have been sent to our WhatsApp. We will get back to you immediately to confirm.
          </p>
          <button className="btn-primary" onClick={() => { setBooked(false); setCart([]); setIsCheckout(false); }}>
            Back to Catalog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title">EQUIPMENT <span className="gradient-text">CATALOG</span></h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          {['All', 'DSLR', 'Cinema', 'Drone', 'Lens'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                background: filter === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: filter === cat ? '#000' : '#fff',
                border: '1px solid var(--glass-border)',
                fontWeight: '600'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary)', fontWeight: '700' }}>LOADING PROFESSIONAL GEAR...</div>}

      <div className={isCheckout ? '' : 'booking-container'}>
        
        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <motion.div 
              key={product._id}
              layout
              className="glass-card"
              style={{ padding: '1rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ height: '200px', borderRadius: '15px', overflow: 'hidden', marginBottom: '1rem' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {getCategoryIcon(product.category)} {product.category}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{product.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>₹{product.price}<span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/day</span></div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn-primary" 
                    style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {!isCheckout && (
          <aside className="glass-card booking-sidebar" style={{ position: 'sticky', top: '100px', padding: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <ShoppingCart size={24} /> My Cart ({cart.length})
            </h3>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem 0' }}>Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item._id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', textTransform: 'none' }}>{item.name}</h4>
                      <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>₹{item.price}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                        <button onClick={() => updateQuantity(item._id, -1)} style={{ color: 'var(--text-dim)' }}><Minus size={14}/></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} style={{ color: 'var(--text-dim)' }}><Plus size={14}/></button>
                        <button onClick={() => removeFromCart(item._id)} style={{ color: '#ff4444', marginLeft: 'auto' }}><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>₹{totalPrice}</span>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                  onClick={() => setIsCheckout(true)}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </>
            )}
          </aside>
        )}

        {/* Checkout Overlay/Flow */}
        {isCheckout && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card" 
            style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Checkout Details</h2>
              <button onClick={() => setIsCheckout(false)} style={{ color: 'var(--text-dim)' }}><X /></button>
            </div>
            
            <form style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }} onSubmit={handleCheckoutSubmit}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                  placeholder="Your Name" 
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>WhatsApp Number</label>
                <input 
                  required 
                  type="tel" 
                  value={checkoutData.phone}
                  onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                  placeholder="+91 00000 00000" 
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Rental Date</label>
                <input 
                  required 
                  type="date" 
                  value={checkoutData.date}
                  onChange={(e) => setCheckoutData({...checkoutData, date: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Duration (Days)</label>
                <input 
                  required 
                  type="number" 
                  min="1" 
                  value={checkoutData.duration}
                  onChange={(e) => setCheckoutData({...checkoutData, duration: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '10px' }} 
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '15px', marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Order Summary</h4>
                {cart.map(item => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: '800' }}>
                  <span>Final Total</span>
                  <span style={{ color: 'var(--primary)' }}>₹{totalPrice}</span>
                </div>
              </div>

              <button className="btn-primary" style={{ gridColumn: '1 / -1', padding: '1.2rem' }}>Confirm & Send via WhatsApp</button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BookingSystem;
