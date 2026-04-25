import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const MarqueeText: React.FC<{ direction: 'left' | 'right'; scrollYProgress: any; entryOffset: number }> = ({ direction, scrollYProgress, entryOffset }) => {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? ['0%', '-120%'] : ['-120%', '0%']
  );

  return (
    <motion.div 
      initial={{ y: entryOffset, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
    >
      <div style={{ width: '100%', borderTop: '3px dotted #000', margin: '4px 0' }} />
      <div style={{ overflow: 'hidden', width: '100%', padding: '0.4rem 0' }}>
        <motion.div style={{ 
          fontSize: '1.8vw', fontWeight: '700', color: '#000', 
          whiteSpace: 'nowrap', textTransform: 'uppercase', 
          display: 'flex', gap: '2.5rem', x 
        }}>
          {[...Array(30)].map((_, i) => (
            <span key={i}>Computer Engineering Students Association •</span>
          ))}
        </motion.div>
      </div>
      <div style={{ width: '100%', borderTop: '3px dotted #000', margin: '4px 0' }} />
    </motion.div>
  );
};

const ScrollTextFill: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const width = useTransform(scrollYProgress, [0, 0.8], ["100%", "0%"]);

  // Use a smaller scale range with a much larger base size for stability
  const whiteCircleScale = useTransform(scrollYProgress, [0.8, 0.98], [0, 1]);

  const textStyle: React.CSSProperties = {
    fontWeight: '900', fontSize: '22vw', letterSpacing: '-0.07em',
    lineHeight: '0.9', margin: 0, padding: 0,
    textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: 'center',
  };

  const handleStart = () => {
    setIsExpanding(true);
    setTimeout(() => setHasStarted(true), 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed', inset: 0, backgroundColor: '#fff', zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}
          >
            <motion.div
              onClick={handleStart}
              initial={{ scale: 1 }}
              animate={isExpanding ? { scale: 150 } : { scale: [1, 1.05, 1] }}
              transition={
                isExpanding 
                  ? { duration: 1.5, ease: [0.65, 0, 0.35, 1] } 
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
              style={{
                width: '130px', height: '130px', backgroundColor: '#048eff',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', zIndex: 101,
              }}
            >
              {!isExpanding && (
                <motion.span
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ color: '#000', fontSize: '14px', fontWeight: '900', letterSpacing: '0.1em' }}
                >
                  CLICK ME
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={containerRef} 
        style={{ 
          height: '400vh', // More height makes the scroll feel more controlled
          backgroundColor: '#048eff',
          display: hasStarted ? 'block' : 'none'
        }}
      >
        <div style={{ 
          position: 'sticky', top: 0, height: '100vh', 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', overflow: 'hidden' 
        }}>
          
          <div style={{ position: 'absolute', top: '7vh', width: '100%' }}>
            <MarqueeText direction="left" scrollYProgress={scrollYProgress} entryOffset={-150} />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.6 }}
            style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          >
            <h1 style={{ ...textStyle, color: '#ebebeb' }}>COSA</h1>
            <motion.div
              style={{
                width, position: 'absolute', top: 0, right: 0, bottom: 0,
                height: '100%', overflow: 'hidden', backgroundColor: '#048eff',
                zIndex: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
              }}
            >
              <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ ...textStyle, color: '#048eff' }}>COSA</h1>
              </div>
            </motion.div>
          </motion.div>

          {/* WHITE CIRCLE WIPE - THE FIXED VERSION */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              // 350vmax is huge enough to cover the screen from a corner scale of 1
              width: '350vmax',
              height: '350vmax',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              // We anchor the center of this huge circle exactly to the bottom-right corner
              left: '100%',
              top: '100%',
              x: '-50%',
              y: '-50%',
              scale: whiteCircleScale,
              zIndex: 10,
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          <div style={{ position: 'absolute', bottom: '7vh', width: '100%' }}>
            <MarqueeText direction="right" scrollYProgress={scrollYProgress} entryOffset={150} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollTextFill;