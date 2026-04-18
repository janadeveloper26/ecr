import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  'Affordable Pricing',
  '24/7 Availability',
  'Professional Support',
  'Latest Equipment'
];

const Features = () => {
  return (
    <section id="features" style={{ background: 'rgba(255,106,0,0.03)', borderRadius: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle color="var(--primary)" size={32} />
            <h4 style={{ fontSize: '1.2rem' }}>{f}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
