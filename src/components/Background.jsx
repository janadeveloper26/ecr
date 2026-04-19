import React, { useEffect, useRef } from 'react';

const Background = () => {
  return (
    <div className="bg-gradient-mesh">
      {/* Dynamic Glow Orbs */}
      <div className="glow-orb" style={{ top: '-10%', left: '20%', opacity: 0.25, width: '800px', height: '800px' }}></div>
      <div className="glow-orb" style={{ bottom: '-10%', right: '10%', opacity: 0.2, width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(255,106,0,0.15) 0%, transparent 70%)' }}></div>
      <div className="glow-orb" style={{ top: '40%', left: '40%', opacity: 0.1, background: 'radial-gradient(circle, #444 0%, transparent 70%)' }}></div>

      {/* "Liteta" - Floating light points/dots */}
      <div className="liteta-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="liteta-dot" 
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: i % 3 === 0 ? 'var(--primary)' : '#fff',
              borderRadius: '50%',
              opacity: Math.random() * 0.4 + 0.1,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${i % 3 === 0 ? 'var(--primary)' : '#fff'}`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(-10px) translateX(-20px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Background;
