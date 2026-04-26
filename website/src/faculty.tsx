import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Shared Theme ────────────────────────────────────────────────────────────

const theme = {
  bg: '#fdfbf7',
  textBase: '#efe8dd',
  textDark: '#1a1a1a',
  gold: '#c9a063',
  goldLight: 'rgba(201, 160, 99, 0.2)',
};

// 1. Title Wipe — unchanged logic, just updated colors
const TitleWipe: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const wipeWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%']);

  const textStyle: React.CSSProperties = {
    fontSize: '10vw',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    margin: 0,
    whiteSpace: 'nowrap',
  };

  return (
    <div ref={ref} style={{ height: '200vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10vw',
          overflow: 'hidden',
          backgroundColor: theme.bg,
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h2 style={{ ...textStyle, color: theme.textBase }}>{text}</h2>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: wipeWidth,
              overflow: 'hidden',
            }}
          >
            <h2 style={{ ...textStyle, color: theme.textDark }}>{text}</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// 2. Text wipe
const TextWipe: React.FC<{
  text: string;
  isRole?: boolean;
  scrollYProgress: any;
  delay: [number, number];
  align?: 'left' | 'right';
}> = ({ text, isRole, scrollYProgress, delay, align = 'left' }) => {
  const wipeWidth = useTransform(scrollYProgress, delay, ['0%', '100%']);

  const textStyle: React.CSSProperties = isRole
    ? {
      fontSize: '0.85rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      margin: '0 0 12px 0',
      whiteSpace: 'nowrap',
    }
    : {
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
      fontWeight: 900,
      lineHeight: 1.1,
      margin: 0,
      whiteSpace: 'nowrap',
    };

  const baseColor = isRole ? theme.goldLight : theme.textBase;
  const revealColor = isRole ? theme.gold : theme.textDark;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ ...textStyle, color: baseColor }}>{text}</div>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: align === 'left' ? 0 : 'auto',
          right: align === 'right' ? 0 : 'auto',
          width: wipeWidth,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            ...textStyle,
            color: revealColor,
            position: 'absolute',
            top: 0,
            left: align === 'left' ? 0 : 'auto',
            right: align === 'right' ? 0 : 'auto',
          }}
        >
          {text}
        </div>
      </motion.div>
    </div>
  );
};

// 3. Member card
interface MemberProps {
  name: string;
  role: string;
  desc: string;
  photo: string;
  side: 'left' | 'right';
  top: string;
  xImage: any;
  scrollYProgress: any;
  textEntry: [number, number];
  index: string;
}

const MemberCard: React.FC<Omit<MemberProps, 'desc'>> = ({
  name,
  role,
  photo,
  side,
  top,
  xImage,
  scrollYProgress,
  textEntry,
  index,
}) => {
  const photoW = 'clamp(140px, 16vw, 220px)';
  const photoH = 'clamp(180px, 20vw, 280px)';

  const containerLeft = side === 'left' ? '12vw' : 'auto';
  const containerRight = side === 'right' ? '6vw' : 'auto';

  const wipeAlign: 'left' | 'right' = side === 'left' ? 'left' : 'right';

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: containerLeft,
        right: containerRight,
        height: photoH,
        display: 'flex',
        flexDirection: side === 'left' ? 'row' : 'row-reverse',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {/* Background Number */}
      <div style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [side === 'left' ? 'left' : 'right']: '15vw',
        fontSize: '18vw',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: `1px rgba(201, 160, 99, 0.15)`,
        zIndex: 0,
        pointerEvents: 'none',
        lineHeight: 0.8,
      }}>
        {index}
      </div>

      {/* Photo Container */}
      <motion.div
        style={{
          width: photoW,
          height: photoH,
          flexShrink: 0,
          position: 'relative',
          x: xImage,
          zIndex: 2,
        }}
      >
        {/* Shadow offset box */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#d0a266',
          transform: side === 'left' ? 'translate(-15px, 15px)' : 'translate(15px, 15px)',
          borderRadius: '8px',
          zIndex: 0
        }} />
        <img
          src={photo}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </motion.div>

      {/* Vertical accent line */}
      <div
        style={{
          width: '2px',
          height: '110%',
          backgroundColor: theme.textDark,
          flexShrink: 0,
          margin: '0 4vw',
          zIndex: 2,
        }}
      />

      {/* Text block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: side === 'left' ? 'flex-start' : 'flex-end',
          textAlign: side === 'left' ? 'left' : 'right',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: theme.gold, color: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
            {side === 'left' ? '👤' : '👥'}
          </div>
          <TextWipe
            text={role}
            isRole
            scrollYProgress={scrollYProgress}
            delay={textEntry}
            align={wipeAlign}
          />
        </div>

        <TextWipe
          text={name}
          scrollYProgress={scrollYProgress}
          delay={[textEntry[0] + 0.03, textEntry[1] + 0.03]}
          align={wipeAlign}
        />
      </div>
    </div>
  );
};

// 4. Z-Layout Panel
const ZFacultyPanel: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const xHod = useTransform(scrollYProgress, [0.00, 0.15], ['-110%', '0%']);
  const xPramod = useTransform(scrollYProgress, [0.28, 0.43], ['110%', '0%']);
  const xGauri = useTransform(scrollYProgress, [0.56, 0.71], ['-110%', '0%']);

  return (
    <div ref={ref} style={{ height: '500vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: theme.bg,
        }}
      >
        {/* Side decorative text */}
        <div style={{ position: 'absolute', top: '5vh', left: '2vw', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: theme.textDark, fontWeight: 700, letterSpacing: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.6 }}>
          <span>OUR FACULTY</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.gold }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.textDark, opacity: 0.3 }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.textDark, opacity: 0.3 }} />
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '5vh', left: '2vw', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: theme.textDark, fontWeight: 600, letterSpacing: '2px', fontSize: '0.7rem', opacity: 0.4 }}>
          THE TEAM BEHIND OUR SUCCESS
        </div>

        {/* Decorative Background Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', border: `1px solid ${theme.goldLight}`, opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-5%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', border: `1px solid ${theme.goldLight}`, opacity: 0.3, pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '40vw', height: '40vw', borderRadius: '50%', background: `radial-gradient(circle, ${theme.goldLight} 0%, transparent 60%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', border: `1px solid ${theme.goldLight}`, opacity: 0.4, pointerEvents: 'none' }} />

        {/* Dotted Grid Decoration */}
        <div style={{ position: 'absolute', top: '40%', left: '5%', width: '100px', height: '100px', backgroundImage: `radial-gradient(${theme.gold} 1px, transparent 1px)`, backgroundSize: '15px 15px', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '100px', height: '100px', backgroundImage: `radial-gradient(${theme.gold} 1px, transparent 1px)`, backgroundSize: '15px 15px', opacity: 0.2, pointerEvents: 'none' }} />

        {/* Curved Abstract Lines matching reference */}
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '40vw', height: '40vw', pointerEvents: 'none', opacity: 0.3 }} viewBox="0 0 100 100" fill="none">
          <circle cx="100" cy="0" r="80" stroke={theme.gold} strokeWidth="0.5" />
          <circle cx="100" cy="0" r="60" stroke={theme.gold} strokeWidth="0.3" />
          <circle cx="100" cy="0" r="40" stroke={theme.gold} strokeWidth="0.2" />
        </svg>

        <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '50vw', height: '50vw', pointerEvents: 'none', opacity: 0.3 }} viewBox="0 0 100 100" fill="none">
          <circle cx="0" cy="100" r="80" stroke={theme.gold} strokeWidth="0.5" />
          <circle cx="0" cy="100" r="60" stroke={theme.gold} strokeWidth="0.3" />
          <circle cx="0" cy="100" r="40" stroke={theme.gold} strokeWidth="0.2" />
        </svg>

        <MemberCard
          index="01"
          name="Dr. Nita Thakare"
          role="Head of Department"
          photo="hod.png"
          side="left"
          top="8vh"
          xImage={xHod}
          scrollYProgress={scrollYProgress}
          textEntry={[0.15, 0.28]}
        />

        <MemberCard
          index="02"
          name="Pramod Patil"
          role="Coordinator I"
          photo="pramodsir.png"
          side="right"
          top="34vh"
          xImage={xPramod}
          scrollYProgress={scrollYProgress}
          textEntry={[0.43, 0.56]}
        />

        <MemberCard
          index="03"
          name="Gauri Puranic"
          role="Coordinator II"
          photo="gaurimam.png"
          side="left"
          top="60vh"
          xImage={xGauri}
          scrollYProgress={scrollYProgress}
          textEntry={[0.71, 0.84]}
        />
      </div>
    </div>
  );
};

// 5. Main Page
const Faculty: React.FC = () => {
  return (
    <section style={{ backgroundColor: theme.bg }}>
      <TitleWipe text="FACULTY" />
      <ZFacultyPanel />
    </section>
  );
};

export default Faculty;