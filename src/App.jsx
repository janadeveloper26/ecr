import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import Cursor from './components/Cursor';
import Background from './components/Background';
import { Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InventoryProvider } from './context/InventoryContext';

const LoadingScreen = () => (
  <motion.div 
    exit={{ opacity: 0 }}
    style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      background: '#0a0a0a', zIndex: 9999, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center'
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ color: '#ff6a00' }}
    >
      <Camera size={60} />
    </motion.div>
    <h2 style={{ marginTop: '2rem', letterSpacing: '4px', fontSize: '1rem', color: '#ff6a00' }}>ECR STUDIO</h2>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <InventoryProvider>
      <Router>
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>
        <div className="app-container">
          <Background />
          <Cursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;
