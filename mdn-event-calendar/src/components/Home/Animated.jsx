import React, { useEffect } from 'react';
import Typed from 'typed.js';

const AnimatedText = () => {
  useEffect(() => {
    
    const options = {
      strings: ['Welcome to Europe Sound Events', 'Your home for music events across Europe'],
      typeSpeed: 50, 
      backSpeed: 25, 
      loop: true, 
    };

    const typed = new Typed('.typed-text', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="content">
      <h1>
        <span className="typed-text"></span>
      </h1>
    </div>
  );
};

export default AnimatedText;
