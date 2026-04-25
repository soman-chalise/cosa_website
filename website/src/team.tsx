import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// ─── Data Structure ───────────────────────────────────────────────────────────

interface TeamMember {
  firstName: string;
  lastName:  string;
  pos:       string;
  color:     string;
  image:     string;
  sticker:   string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { firstName: "Vishal",  lastName: "Perdasi", pos: "President",      color: "#a1d6fc", image: "team.jpeg",  sticker: "nishant-sticker.png" },
  { firstName: "Vishal",  lastName: "Perdasi", pos: "President",      color: "#a1d6fc", image: "team.jpeg",  sticker: "nishant-sticker.png" },
  { firstName: "Nishant", lastName: "Nair",    pos: "Vice President", color: "#f8a0bd", image: "image.png",  sticker: "nishant-sticker.png" },
  { firstName: "Varneet", lastName: "Kaur",    pos: "Secretary",      color: "#9bf1a2", image: "photo.jpg",  sticker: "sticker_varneet.png" },
  { firstName: "Soman",   lastName: "Chalise", pos: "Tech Head",      color: "#f7d49d", image: "team.jpeg",  sticker: "nishant-sticker.png" },
  { firstName: "Aditya",  lastName: "Tiwari",  pos: "Tech Head",      color: "#f8d090", image: "photo.jpg",  sticker: "sticker_aditya.png"  },
  { firstName: "Bhakti",  lastName: "Pawar",   pos: "Cultural Head",  color: "#ec8f8f", image: "team.jpg",   sticker: "sticker_bhakti.png"  },
  { firstName: "Bhakti",  lastName: "Pawar",   pos: "Cultural Head",  color: "#ec8f8f", image: "team.jpg",   sticker: "sticker_bhakti.png"  },

];

const CARD_W = '55vh';
const CARD_H = '82vh';
const STICKER_ROTATIONS = [6, -8, 5, -6, 9, -5, 7];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const splitWords = (text: string): string[] => text.split(' ');

const getFontSize = (wordCount: number): string => {
  if (wordCount === 1) return 'clamp(1rem, 12cqi, 5rem)';
  if (wordCount === 2) return 'clamp(0.9rem, 10cqi, 4rem)';
  return 'clamp(0.8rem, 8cqi, 3rem)';
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface MemberTextProps {
  text:           string;
  subText?:       string;
  progress:       MotionValue<number>;
  index:          number;
  total:          number;
  anchor:         'top' | 'bottom';
  align:          'left' | 'right';
  globalProgress: MotionValue<number>;
}

interface StickerProps {
  members:        TeamMember[];
  memberProgress: MotionValue<number>;
  globalProgress: MotionValue<number>;
  introEnd:       number;
}

interface CardDeckProps {
  members:        TeamMember[];
  memberProgress: MotionValue<number>;
  rotationY:      MotionValue<number>;
  cardsOpacity:   MotionValue<number>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TeamIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalHeight  = (TEAM_MEMBERS.length + 2) * 100;

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const introEnd = 1 / (TEAM_MEMBERS.length + 1);

  const introTranslateLeft  = useTransform(smoothProgress, [0, introEnd * 0.8], ['0%', '-150%']);
  const introTranslateRight = useTransform(smoothProgress, [0, introEnd * 0.8], ['0%',  '150%']);
  const introOpacity        = useTransform(smoothProgress, [introEnd * 0.7, introEnd], [1, 0]);

  const memberProgress = useTransform(smoothProgress, [introEnd, 1], [0, 1]);
  const bgColor        = useTransform(
    smoothProgress,
    [0, introEnd, ...TEAM_MEMBERS.map((_, i) => introEnd + (i + 1) * (1 - introEnd) / TEAM_MEMBERS.length)],
    ['#fdfbf7', '#fdfbf7', ...TEAM_MEMBERS.map(m => m.color)],
  );
  const rotationY    = useTransform(memberProgress, [0, 1], [0, (TEAM_MEMBERS.length - 1) * 180]);
  const cardsOpacity = useTransform(smoothProgress, [introEnd - 0.01, introEnd], [0, 1]);

  // ── Circle wipe transition out → HouseCup (#06060f)
  // Fires in the last ~15% of the team scroll
  const circleScale = useTransform(smoothProgress, [0.85, 0.99], [0, 1]);

  return (
    <motion.section
      ref={containerRef}
      style={{ height: `${totalHeight}vh`, backgroundColor: bgColor, position: 'relative' }}
    >
      {/* ── STICKY SCENE ── */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', perspective: '2000px',
        display: 'grid',
        gridTemplateColumns: `1fr ${CARD_W} 1fr`,
        gridTemplateRows: '1fr',
        alignItems: 'center',
        padding: '0 2%',
        boxSizing: 'border-box',
      }}>

        {/* ── INTRO OVERLAY ── */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          opacity: introOpacity, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <motion.h2 style={{ fontSize: '12vw', fontWeight: 900, color: '#de4383', margin: 0, lineHeight: 0.8, x: introTranslateLeft }}>
            TEAM
          </motion.h2>
          <motion.h2 style={{ fontSize: '12vw', fontWeight: 900, color: '#fad4e6', WebkitTextStroke: '3px #de4383', margin: 0, lineHeight: 0.8, x: introTranslateRight }}>
            COSA 2026
          </motion.h2>
        </motion.div>

        {/* ── COLUMN 1: NAME ── */}
        <div style={{
          gridColumn: 1, gridRow: 1,
          position: 'relative', height: '100%',
          containerType: 'inline-size',
          zIndex: 30,
        }}>
          {TEAM_MEMBERS.map((m, i) => (
            <MemberText
              key={`name-${i}`}
              text={m.firstName}
              subText={m.lastName}
              progress={memberProgress}
              index={i}
              total={TEAM_MEMBERS.length}
              anchor="top"
              align="right"
              globalProgress={smoothProgress}
            />
          ))}
        </div>

        {/* ── COLUMN 2: CARDS ── */}
        <div style={{ gridColumn: 2, gridRow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardDeck
            members={TEAM_MEMBERS}
            memberProgress={memberProgress}
            rotationY={rotationY}
            cardsOpacity={cardsOpacity}
          />
        </div>

        {/* ── COLUMN 3: POSITION + STICKER ── */}
        <div style={{
          gridColumn: 3, gridRow: 1,
          position: 'relative', height: '100%',
          containerType: 'inline-size',
          zIndex: 30,
        }}>
          {TEAM_MEMBERS.map((m, i) => (
            <MemberText
              key={`pos-${i}`}
              text={m.pos}
              progress={memberProgress}
              index={i}
              total={TEAM_MEMBERS.length}
              anchor="bottom"
              align="left"
              globalProgress={smoothProgress}
            />
          ))}
          <StickerDisplay
            members={TEAM_MEMBERS}
            memberProgress={memberProgress}
            globalProgress={smoothProgress}
            introEnd={introEnd}
          />
        </div>

        {/* ── CIRCLE WIPE OUT → #06060f (HouseCup bg) ── */}
        {/* Same mechanic as Hero's white circle, anchored bottom-right */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '350vmax',
            height: '350vmax',
            borderRadius: '50%',
            backgroundColor: '#06060f',
            left: '100%',
            top: '100%',
            x: '-50%',
            y: '-50%',
            scale: circleScale,
            zIndex: 200,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />

      </div>
    </motion.section>
  );
};

// ─── CardDeck ─────────────────────────────────────────────────────────────────

const CardDeck: React.FC<CardDeckProps> = ({ members, memberProgress, rotationY, cardsOpacity }) => {
  const total = members.length;

  return (
    <motion.div style={{
      width: CARD_W, height: CARD_H,
      position: 'relative',
      rotateY: rotationY,
      zIndex: 10,
      opacity: cardsOpacity,
    }}>
      {members.map((member, i) => {
        const unit  = 1 / (total - 1);
        const start = i * unit;
        const mid   = start + unit * 0.5;
        const fadeW = unit * 0.04;

        const cardOpacity =
          i === 0
            ? useTransform(memberProgress, [mid - fadeW, mid], [1, 0])
            : i === total - 1
            ? useTransform(memberProgress, [mid - unit - fadeW, mid - unit], [0, 1])
            : useTransform(memberProgress, [mid - unit - fadeW, mid - unit, mid - fadeW, mid], [0, 1, 1, 0]);

        return (
          <motion.div
            key={`card-${i}`}
            style={{
              position: 'absolute', inset: 0,
              opacity: cardOpacity,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              scaleX: i % 2 === 0 ? 1 : -1,
            }}
          >
            <img
              src={member.image}
              alt={`${member.firstName} ${member.lastName}`}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                borderRadius: '2vh', boxShadow: '0 4vh 8vh rgba(0,0,0,0.2)',
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// ─── StickerDisplay ───────────────────────────────────────────────────────────

const StickerDisplay: React.FC<StickerProps> = ({ members, memberProgress, globalProgress, introEnd }) => {
  const total = members.length;

  return (
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      aspectRatio: '1 / 1',
    }}>
      {members.map((member, i) => {
        const unit  = 1 / (total - 1);
        const start = i * unit;
        const mid   = start + unit * 0.5;
        const fadeW = unit * 0.04;

        const stickerOpacity =
          i === 0
            ? useTransform(memberProgress, [mid - fadeW, mid], [1, 0])
            : i === total - 1
            ? useTransform(memberProgress, [mid - unit - fadeW, mid - unit], [0, 1])
            : useTransform(memberProgress, [mid - unit - fadeW, mid - unit, mid - fadeW, mid], [0, 1, 1, 0]);

        const introGuard   = useTransform(globalProgress, [introEnd - 0.01, introEnd], [0, 1]);
        const finalOpacity = useTransform(
          [stickerOpacity, introGuard] as [MotionValue<number>, MotionValue<number>],
          ([s, g]: number[]) => s * g,
        );

        return (
          <motion.div
            key={`sticker-${i}`}
            style={{
              position: 'absolute', inset: 0,
              opacity: finalOpacity,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              rotate: STICKER_ROTATIONS[i],
            }}
          >
            <motion.img
              src={member.sticker}
              alt={`${member.firstName} sticker`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── MemberText ───────────────────────────────────────────────────────────────

const MemberText: React.FC<MemberTextProps> = ({
  text, subText, progress, index, total, anchor, align, globalProgress,
}) => {
  const unit    = 1 / (total - 1);
  const start   = index * unit;
  const fadeIn  = Math.max(0, start - unit * 0.25);
  const fadeOut = start + unit * 0.2;

  const mOpacity =
    index === 0
      ? useTransform(progress, [0, fadeOut * 0.4, fadeOut], [1, 1, 0])
      : useTransform(progress, [fadeIn, start, fadeOut], [0, 1, 0]);

  const introGuard   = useTransform(globalProgress, [0.15, 0.16], [0, 1]);
  const finalOpacity = useTransform(
    [mOpacity, introGuard] as [MotionValue<number>, MotionValue<number>],
    ([m, g]: number[]) => m * g,
  );

  const textWords    = splitWords(text);
  const subTextWords = subText ? splitWords(subText) : [];
  const maxWords     = Math.max(textWords.length, subTextWords.length);
  const fontSize     = getFontSize(maxWords);

  const anchorStyle = anchor === 'top'
    ? { top: 'clamp(3rem, 15vh, 8rem)' }
    : { bottom: 'clamp(3rem, 15vh, 8rem)' };

  const pinStyle = align === 'right'
    ? { right: 0, left: 'auto' }
    : { left: 0, right: 'auto' };

  return (
    <motion.div style={{
      opacity: finalOpacity,
      position: 'absolute',
      width: '100%',
      ...pinStyle,
      ...anchorStyle,
      textAlign: align,
      overflow: 'hidden',
      padding: align === 'right' ? '0 8% 0 0' : '0 0 0 8%',
      boxSizing: 'border-box',
    }}>
      {textWords.map((word, wi) => (
        <h3 key={wi} style={{
          fontSize, fontWeight: 900, color: '#de4383', margin: 0,
          lineHeight: 0.88, textTransform: 'uppercase',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip',
        }}>
          {word}
        </h3>
      ))}
      {subTextWords.map((word, wi) => (
        <h3 key={`sub-${wi}`} style={{
          fontSize, fontWeight: 900, color: '#de4383', margin: 0,
          lineHeight: 0.88, textTransform: 'uppercase',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip',
        }}>
          {word}
        </h3>
      ))}
    </motion.div>
  );
};

export default TeamIntro;