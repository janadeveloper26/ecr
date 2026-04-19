import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mobileHeroImg from '../assets/hero_mobile.png';

const CameraModel = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group rotation={[Math.PI / 8, -Math.PI / 4, 0]}>
        {/* Main Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.4, 1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Lens */}
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Lens Rim (Orange Accent) */}
        <mesh position={[0, 0, 0.81]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.05, 32]} />
          <meshStandardMaterial color="#ff6a00" emissive="#ff6a00" emissiveIntensity={2} />
        </mesh>
        {/* Shutter Button */}
        <mesh position={[-0.7, 0.75, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </Float>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero-section" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '120px 0 60px 0',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '100vw',
      minHeight: '85vh',
      margin: '0'
    }}>
      <div className="hero-content" style={{ 
        flex: 1.2, 
        paddingLeft: '8%', 
        zIndex: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
            lineHeight: '0.9', 
            fontWeight: '900', 
            letterSpacing: '-2px', 
            marginBottom: '1.5rem',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          CAPTURE <br /> <span className="gradient-text" style={{ filter: 'drop-shadow(0 0 20px var(--accent-glow))' }}>LIKE A PRO</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ fontSize: '1.25rem', color: 'var(--text-dim)', margin: '1rem 0 2.5rem 0', maxWidth: '550px', lineHeight: '1.6' }}
        >
          Premium Camera & Drone Rentals in Erode. Experience world-class professional gear.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
        >
          <Link to="/booking" className="btn-primary" style={{ padding: '1.2rem 2.8rem', fontSize: '1rem' }}>RENT NOW</Link>
          <a href="#gear" className="btn-outline" style={{ padding: '1.2rem 2.8rem', fontSize: '1rem' }}>EXPLORE GEAR</a>
        </motion.div>
      </div>

      <div className="hero-3d" style={{ 
        flex: 1, 
        height: '600px', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}>
        <Suspense fallback={
          <div className="loading-3d" style={{ color: 'var(--primary)', letterSpacing: '2px', padding: '2rem' }}>
            PREVIEWING...
          </div>
        }>
          <Canvas 
            shadows 
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 5], fov: 40 }}
            style={{ background: 'transparent', height: '100%', width: '100%' }}
          >
            <ambientLight intensity={1} />
            <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={3} castShadow />
            <pointLight position={[-5, -5, -5]} color="#ff6a00" intensity={1} />
            
            <group scale={0.8} rotation={[0, -Math.PI / 8, 0]}>
              <CameraModel />
            </group>
            
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.6} 
              scale={10} 
              blur={2} 
              far={4} 
            />
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </Suspense>
      </div>

      <motion.img 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        src={mobileHeroImg} 
        alt="Camera" 
        className="hero-mobile-img" 
      />
    </section>
  );
};

export default Hero;

