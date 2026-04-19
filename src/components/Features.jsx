import React from 'react';
import { Banknote, Clock, Headset, Camera } from 'lucide-react';

const features = [
  { name: 'Affordable Pricing', icon: <Banknote size={32} /> },
  { name: '24/7 Availability', icon: <Clock size={32} /> },
  { name: 'Professional Support', icon: <Headset size={32} /> },
  { name: 'Latest Equipment', icon: <Camera size={32} /> }
];

const Features = () => {
  return (
    <section id="features" style={{ 
      background: 'rgba(15, 15, 15, 0.6)', 
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '35px',
      margin: '0 5% 4rem 5%',
      padding: '3.5rem 2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '2rem',
        textAlign: 'center'
      }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ color: 'var(--primary)' }}>{f.icon}</div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '2px', color: '#fff' }}>{f.name.toUpperCase()}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
