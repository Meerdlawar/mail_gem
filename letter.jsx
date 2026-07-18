import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Envelope.css';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="page-container">
      <div 
        className="envelope-wrapper" 
        onClick={() => setIsOpen(true)}
      >
        <div className="envelope-back"></div>
        
        {/* The Letter */}
        <motion.div 
          className="letter"
          initial={false}
          animate={{ 
            y: isOpen ? -180 : 0, 
            zIndex: isOpen ? 10 : 2 
          }}
          transition={{ 
            delay: isOpen ? 0.4 : 0, 
            duration: 0.8, 
            type: "spring", 
            bounce: 0.3 
          }}
        >
          <h1>My Dearest,</h1>
          <p>This is where you write the sweetest letter you can think of. The text will cleanly reveal itself as it slides up from the envelope.</p>
        </motion.div>

        <div className="envelope-front"></div>

        {/* The Flap */}
        <motion.div 
          className="envelope-flap"
          initial={false}
          animate={{ 
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 1 : 5
          }}
          transition={{ 
            duration: 0.6, 
            type: "tween", 
            ease: "easeInOut" 
          }}
        />

        {/* The Wax Seal */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="wax-seal"
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              L {/* Replace with her initial */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}