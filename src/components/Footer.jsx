import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', background: '#050505' }}>
      <div className="brand" style={{ marginBottom: '2rem', fontSize: '2rem' }}>ECR RENTAL STUDIO</div>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        Tamil Nadu's premier hub for high-end filmmaking gear. From local weddings to international cinema, we equip your vision.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
          <a key={i} href="#" className="social-icon" style={{ color: 'var(--text-dim)', transition: 'var(--transition)' }}>
            <Icon size={24} />
          </a>
        ))}
      </div>
      <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
        &copy; 2026 ECR Rental Studio. All Rights Reserved. Designed for Professionals.
      </div>
    </footer>
  );
};

export default Footer;
