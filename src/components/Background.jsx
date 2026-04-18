import React, { useEffect, useRef } from 'react';

const Background = () => {
  return (
    <div className="bg-gradient-mesh">
      <div className="glow-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="glow-orb" style={{ bottom: '20%', right: '5%', background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, transparent 70%)' }}></div>
      <div className="glow-orb" style={{ top: '50%', left: '40%', opacity: 0.1 }}></div>
    </div>
  );
};

export default Background;
