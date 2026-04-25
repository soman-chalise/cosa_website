import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 1. Title Wipe — unchanged
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
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h2 style={{ ...textStyle, color: '#e0e0e0' }}>{text}</h2>
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
            <h2 style={{ ...textStyle, color: '#000' }}>{text}</h2>
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
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.12em',
        margin: '0 0 8px 0',
        whiteSpace: 'nowrap' as const,
      }
    : {
        fontSize: '2rem',
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        whiteSpace: 'nowrap' as const,
      };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ ...textStyle, color: '#e0e0e0' }}>{text}</div>
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
            color: '#000',
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
// Photo: 22vw wide, 4:5 ratio → height = 27.5vw, capped at 260×325px
interface MemberProps {
  name: string;
  role: string;
  photo: string;
  side: 'left' | 'right';
  top: string;
  xImage: any;
  scrollYProgress: any;
  textEntry: [number, number];
}

const MemberCard: React.FC<MemberProps> = ({
  name,
  role,
  photo,
  side,
  top,
  xImage,
  scrollYProgress,
  textEntry,
}) => {
  const photoW = 'min(18vw, 210px)';
  const photoH = 'min(22.5vw, 262px)';

  const containerLeft  = side === 'left'  ? '7vw'  : 'auto';
  const containerRight = side === 'right' ? '7vw'  : 'auto';

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
      }}
    >
      {/* Photo */}
      <motion.div
        style={{
          width: photoW,
          height: photoH,
          flexShrink: 0,
          x: xImage,
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '3px',
            backgroundColor: '#ddd',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Vertical accent line */}
      <div
        style={{
          width: '3px',
          alignSelf: 'stretch',
          backgroundColor: '#000',
          flexShrink: 0,
          margin: '0 2vw',
          borderRadius: '2px',
        }}
      />

      {/* Text block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        <TextWipe
          text={role}
          isRole
          scrollYProgress={scrollYProgress}
          delay={textEntry}
          align={wipeAlign}
        />
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
// Photos are taller now so spacing is adjusted:
//   HOD:    top 3vh
//   Pramod: top 34vh
//   Gauri:  top 65vh
const ZFacultyPanel: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const xHod    = useTransform(scrollYProgress, [0.00, 0.15], ['-110%', '0%']);
  const xPramod = useTransform(scrollYProgress, [0.28, 0.43], ['110%',  '0%']);
  const xGauri  = useTransform(scrollYProgress, [0.56, 0.71], ['-110%', '0%']);

  return (
    <div ref={ref} style={{ height: '500vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <MemberCard
          name="Dr. Neta Thakre"
          role="Head of Department"
          photo="photo.jpg"
          side="left"
          top="3vh"
          xImage={xHod}
          scrollYProgress={scrollYProgress}
          textEntry={[0.15, 0.28]}
        />

        <MemberCard
          name="Pramod Patil"
          role="Coordinator I"
          photo="image.png"
          side="right"
          top="34vh"
          xImage={xPramod}
          scrollYProgress={scrollYProgress}
          textEntry={[0.43, 0.56]}
        />

        <MemberCard
          name="Gauri Pauranic"
          role="Coordinator II"
          photo="team.jpeg"
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
    <section style={{ backgroundColor: '#fff' }}>
      <TitleWipe text="FACULTY" />
      <ZFacultyPanel />
      <div style={{ height: '30vh' }} />
    </section>
  );
};

export default Faculty;