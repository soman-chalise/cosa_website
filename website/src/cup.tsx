import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ─── Text Wipe ────────────────────────────────────────────────────────────────

const TextWipe: React.FC<{
  text: string;
  style?: React.CSSProperties;
  baseColor?: string;
  revealColor?: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({
  text,
  style = {},
  baseColor = '#06060f',
  revealColor = '#fff',
  progress,
  range,
}) => {
    const wipeWidth = useTransform(progress, range, ['0%', '100%']);

    return (
      <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
        {/* Base layer — always renders, color = baseColor */}
        <div style={{ ...style, color: baseColor, display: 'block' }}>{text}</div>
        {/* Reveal layer — clips from left to right */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: wipeWidth,
            overflow: 'hidden',
            display: 'block',
          }}
        >
          <div style={{
            ...style,
            color: revealColor,
            whiteSpace: 'nowrap',
            display: 'block',
          }}>
            {text}
          </div>
        </motion.div>
      </div>
    );
  };

// ─── Main Section ─────────────────────────────────────────────────────────────
//
// Strict sequential scroll timeline (600vh):
//
//  [0.00 – 0.10]  "HOUSE"  wipes in
//  [0.08 – 0.18]  "CUP"    wipes in  (slight stagger after HOUSE)
//  [0.18]         text fully done → cup.png begins rising
//  [0.18 – 0.35]  cup.png  rises slowly from below, settles
//  [0.35]         cup settled → member.png begins rising
//  [0.35 – 0.55]  member.png rises at medium pace, settles
//  [0.55]         members settled → trophy.png begins rising
//  [0.55 – 0.70]  trophy.png rises fastest, snaps into place
//  [0.70 – 1.00]  full scene holds, slow drift upward

const HouseCup: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Cup rises slowly after text wipe done
  const cupY = useTransform(scrollYProgress, [0.05, 0.25], ['110vh', '0vh']);

  // Members rise at medium pace after cup settles
  const memberY = useTransform(scrollYProgress, [0.25, 0.48], ['110vh', '0vh']);

  // Trophy snaps up last and fastest
  const trophyY = useTransform(scrollYProgress, [0.48, 0.62], ['110vh', '0vh']);

  // Slow drift once everything is in, giving room for the button at the bottom
  const sceneDrift = useTransform(scrollYProgress, [0.70, 1.00], ['0vh', '-8vh']);

  // Spotlight blooms as cup arrives
  const glowOp = useTransform(scrollYProgress, [0.18, 0.40], [0, 1]);

  // Button slides up and fades in after trophies settle
  const buttonOp = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.65, 0.75], ['40px', '0px']);

  return (
    <div
      ref={ref}
      style={{ height: '600vh', position: 'relative', backgroundColor: '#06060f' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        backgroundColor: '#06060f',
      }}>

        {/* ── TITLE — wipes in on scroll, always on top ── */}
        <div style={{
          position: 'absolute',
          top: '5vh',
          left: 0,
          right: 0,
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '0.2em',
          pointerEvents: 'none',
        }}>
          <TextWipe
            text="HOUSE"
            progress={scrollYProgress}
            range={[0.00, 0.06]}
            baseColor="#06060f"
            revealColor="#ffffff"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          />
          <TextWipe
            text="CUP"
            progress={scrollYProgress}
            range={[0.04, 0.10]}
            baseColor="#06060f"
            revealColor="#c9a84c"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          />
        </div>

        {/* ── RADIAL SPOTLIGHT ── */}
        <motion.div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 105%, rgba(201,168,76,0.22) 0%, transparent 65%)',
          opacity: glowOp,
          pointerEvents: 'none',
          zIndex: 3,
        }} />

        {/* ── SCENE WRAPPER — drifts up once all settled, clips PNGs ── */}
        <motion.div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          y: sceneDrift,
        }}>

          {/* LAYER 1: cup.png — arrives after text, top-center, furthest back */}
          <motion.div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            x: '-50%',
            width: 'clamp(220px, 32vw, 480px)',
            y: cupY,
            zIndex: 5,
            pointerEvents: 'none',
          }}>
            <img
              src="cup.png"
              alt="House Cup"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 16px 48px rgba(201,168,76,0.4))',
              }}
            />
          </motion.div>

          {/* LAYER 2: member.png — arrives after cup settles */}
          <motion.div style={{
            position: 'absolute',
            bottom: '1vh',
            left: '50%',
            x: '-50%',
            width: 'clamp(420px, 62vw, 880px)',
            y: memberY,
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <img
              src="member.png"
              alt="COSA Team"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>

          {/* LAYER 3: trophy.png — arrives last, snaps into place */}
          <motion.div style={{
            position: 'absolute',
            bottom: '-10vh',
            left: '50%',
            x: '-50%',
            width: 'clamp(380px, 56vw, 800px)',
            y: trophyY,
            zIndex: 15,
            pointerEvents: 'none',
          }}>
            <img
              src="trophy.png"
              alt="Trophies"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>

        </motion.div>

        {/* LAYER 4: Explore More Button — slides up and fades in at the very end */}
        {/* Kept outside the scene wrapper so it stays locked at the bottom while elements drift up */}
        <motion.div style={{
          position: 'absolute',
          bottom: '2vh',
          left: '50%',
          x: '-50%',
          y: buttonY,
          zIndex: 20,
          opacity: buttonOp,
          pointerEvents: 'auto',
        }}>
          <button
            onClick={onExplore}
            style={{
              padding: '1rem 3rem',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: '#c9a84c',
              backgroundColor: 'rgba(6, 6, 15, 0.7)',
              border: '1px solid rgba(201,168,76,0.5)',
              borderRadius: '50px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 20px rgba(201,168,76,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(201,168,76,0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(6, 6, 15, 0.9)';
              e.currentTarget.style.border = '1px solid rgba(201,168,76,0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)';
              e.currentTarget.style.backgroundColor = 'rgba(6, 6, 15, 0.7)';
              e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)';
            }}
          >
            Explore More
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default HouseCup;