import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Compass, Layers, Minimize } from 'lucide-react';

const gearItems = [
  { title: 'DSLR Cameras', icon: <Camera size={40} />, desc: 'High resolution stills and video.' },
  { title: 'Cinema Cameras', icon: <Video size={40} />, desc: 'Netflix-approved production gear.' },
  { title: 'Drones', icon: <Compass size={40} />, desc: 'Aerial perspectives in 4K.' },
  { title: 'Lenses', icon: <Layers size={40} />, desc: 'Sharp glass for every shot.' },
  { title: 'Accessories', icon: <Minimize size={40} />, desc: 'Gimbals, lights, and audio.' },
];

const GearCard = ({ item }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="glass-card gear-card"
      style={{ textAlign: 'center', cursor: 'pointer' }}
    >
      <div className="card-icon" style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
        {item.icon}
      </div>
      <h3 style={{ marginBottom: '1rem' }}>{item.title}</h3>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{item.desc}</p>
    </motion.div>
  );
};

const GearShowcase = () => {
  return (
    <section id="gear">
      <h2 className="section-title">3D <span className="gradient-text">GEAR</span> SHOWCASE</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {gearItems.map((item, index) => (
          <GearCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default GearShowcase;
