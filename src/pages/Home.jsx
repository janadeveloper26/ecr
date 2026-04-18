import React from 'react';
import Hero from '../components/Hero';
import GearShowcase from '../components/GearShowcase';
import Features from '../components/Features';
import BookingSystem from '../components/BookingSystem';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => (
  <section id="pricing">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-title">EXCLUSIVE <span className="gradient-text">DEALS</span></motion.h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {[
        { plan: 'Starter', price: '₹999', features: ['DSLR Body', 'Basic Kit Lens', '1 Battery'], accent: false },
        { plan: 'Pro Mapper', price: '₹2499', features: ['Cinema Camera', 'Prime Lens', '3 Batteries', 'Gimbal'], accent: true },
        { plan: 'Elite Drone', price: '₹4999', features: ['4K Drone', 'Operator Support', 'Extra Propellers'], accent: false }
      ].map((p, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className={`glass-card pricing-card ${p.accent ? 'active' : ''}`} style={{ 
          textAlign: 'center', 
          border: p.accent ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
          transform: p.accent ? 'scale(1.05)' : 'none'
        }}>
          <h3>{p.plan}</h3>
          <h2 style={{ fontSize: '3rem', margin: '1.5rem 0' }}>{p.price}<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/day</span></h2>
          <ul style={{ listStyle: 'none', marginBottom: '2rem', color: 'var(--text-dim)' }}>
            {p.features.map((f, j) => <li key={j} style={{ marginBottom: '0.5rem' }}>✔ {f}</li>)}
          </ul>
          <Link to="/booking" className={p.accent ? 'btn-primary' : 'btn-outline'}>Rent Now</Link>
        </motion.div>
      ))}
    </div>
  </section>
);

const VideoSection = () => (
  <section id="video" style={{ padding: '4rem 0' }}>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{ position: 'relative', width: '100%', height: '60vh', background: '#000', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>CINEMATIC EXCELLENCE</h2>
        <p style={{ opacity: 0.8 }}>Watch our gear in action</p>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, #0a0a0a)', zIndex: 0 }}></div>
      <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80" alt="Cinematic" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
    </motion.div>
  </section>
);

const Contact = () => (
  <section id="contact">
    <h2 className="section-title">VISIT <span className="gradient-text">OUR STUDIO</span></h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
      <div className="contact-info">
        <h3>ECR RENTAL STUDIO</h3>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Erode, Tamil Nadu, India</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Phone color="var(--primary)" />
            <span>+91 97867 87873</span>
          </div>
          <a href="https://wa.me/919786787873" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MessageSquare color="var(--primary)" />
            <span>WhatsApp Us</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MapPin color="var(--primary)" />
            <span>Erode Central, Tamil Nadu</span>
          </div>
        </div>
      </div>
      <div className="map-embed" style={{ borderRadius: '20px', overflow: 'hidden', height: '300px', border: '1px solid var(--glass-border)' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.41160492862!2d77.63273611311545!3d11.277876840748133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4c845427b3%3A0x6a0a09c2a233543d!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1713090000000!5m2!1sen!2sin" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials">
    <h2 className="section-title">CLIENT <span className="gradient-text">VOICES</span></h2>
    <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '2rem 1rem' }}>
      {[
        { name: 'Arun Kumar', role: 'Wedding Photographer', text: 'The gear was in top-notch condition. Truly professional service.' },
        { name: 'Sonia Raj', role: 'Vlogger', text: 'Rented a Sony A7S III for my travel vlog. Best experience ever!' },
        { name: 'Vijay', role: 'Indie Filmmaker', text: 'Affordable and reliable. The RED Komodo package is a steal.' }
      ].map((t, i) => (
        <motion.div key={i} whileHover={{ y: -10 }} className="glass-card" style={{ minWidth: '300px', flex: '0 0 auto' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', opacity: 0.8 }}>"{t.text}"</p>
          <h4>{t.name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{t.role}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <GearShowcase />
      <VideoSection />
      <Testimonials />
      <Pricing />
      <section id="booking" style={{ padding: '8rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-card" style={{ 
          maxWidth: '1000px', 
          width: '100%', 
          padding: '5rem 2rem', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', margin: '0' }}>READY TO <span className="gradient-text">CAPTURE?</span></h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px' }}>
            Explore our full catalog of premium cameras, drones, and professional cinema gear.
          </p>
          <Link to="/booking" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
            Browse Catalog & Book Now
          </Link>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default Home;
