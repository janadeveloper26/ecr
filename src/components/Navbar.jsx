import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/', hash: '#home' },
    { name: 'Gear', path: '/', hash: '#gear' },
    { name: 'Features', path: '/', hash: '#features' },
    { name: 'Pricing', path: '/', hash: '#pricing' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/', hash: '#contact' },
  ];

  return (
    <nav style={{ padding: '1rem 2rem' }}>
      <Link to="/" className="brand" style={{ fontSize: '1.2rem' }}>ECR RENTAL STUDIO</Link>
      
      {/* Desktop Links */}
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.name}>
            {link.hash && isHome ? (
              <a href={link.hash}>{link.name}</a>
            ) : (
              <Link to={link.path + (link.hash || '')}>{link.name}</Link>
            )}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/booking" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', display: isOpen ? 'none' : 'block' }}>
          Rent Now
        </Link>
        
        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} style={{ color: '#fff', display: 'none' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
              background: 'rgba(10,10,10,0.98)', zIndex: 2000, 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem'
            }}
          >
            <button onClick={toggleMenu} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#fff' }}>
              <X size={35} />
            </button>
            {navLinks.map((link) => (
              <li key={link.name} style={{ listStyle: 'none' }}>
                <Link 
                  to={link.path + (link.hash || '')} 
                  onClick={toggleMenu}
                  style={{ fontSize: '1.5rem', fontWeight: '700', textTransform: 'uppercase' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <Link to="/booking" onClick={toggleMenu} className="btn-primary" style={{ marginTop: '1rem' }}>
              Rent Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
