import React from 'react';
import BookingSystem from '../components/BookingSystem';
import { motion } from 'framer-motion';

const BookingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '100px', minHeight: '100vh' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>RESERVE YOUR <span className="gradient-text">GEAR</span></h1>
          <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>
            Select from our professional collection of cameras, drones, and accessories. 
            Build your custom rental package and book instantly.
          </p>
        </div>
        
        <BookingSystem />
      </div>
    </motion.div>
  );
};

export default BookingPage;
