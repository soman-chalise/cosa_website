import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Event {
  index:       string;
  title:       string;
  date:        string;
  place:       string;
  description: string;
  image:       string;
  color:       string;
}

const EVENTS: Event[] = [
  {
    index:       '01',
    title:       'Bappagraphy',
    date:        'September 2025',
    place:       'Nashik, Maharashtra',
    description: 'A celebration of creativity and devotion, Bappagraphy brought together photography enthusiasts to capture the spirit of Ganesh Chaturthi. Students roamed the streets of Nashik, framing the vibrant idols, decorations, and the energy of the festival through their lenses.',
    image:       'photo.jpg',
    color:       '#e8761a',
  },
  {
    index:       '02',
    title:       "Teacher's Day",
    date:        'September 5, 2025',
    place:       'College Auditorium, Nashik',
    description: "A heartfelt tribute to the mentors who shape futures. Students organized performances, speeches, and personalized gestures to honor the faculty. The celebration reflected the deep bond between COSA members and the teachers who guide them every day.",
    image:       'event2.jpg',
    color:       '#4a90d9',
  },
  {
    index:       '03',
    title:       "Freshers' Party",
    date:        'August 2025',
    place:       'College Auditorium, Nashik',
    description: "The grand welcome for the incoming batch of computer engineering students. Packed with games, performances, and introductions, the Freshers' Party set the tone for a year of camaraderie, creativity, and unforgettable memories with COSA 2025–26.",
    image:       'event3.jpg',
    color:       '#9b59b6',
  },
  {
    index:       '04',
    title:       'Faral Distribution',
    date:        'October 2025',
    place:       'Nashik City',
    description: 'Rooted in the tradition of sharing during Diwali, COSA organized a community Faral distribution drive. Members visited underprivileged areas of Nashik to distribute homemade sweets and snacks, spreading the warmth and joy of the festival beyond the campus.',
    image:       'event4.jpg',
    color:       '#f39c12',
  },
  {
    index:       '05',
    title:       'River Cleaning',
    date:        'February 2026',
    place:       'Godavari Riverbank, Nashik',
    description: 'In collaboration with Nashik Ploggers, COSA members took to the banks of the Godavari for a river cleaning drive. The initiative combined environmental responsibility with community spirit, removing waste from the riverbanks and raising awareness about water conservation.',
    image:       'event5.jpg',
    color:       '#27ae60',
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────

const Achievements: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToEvent = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  const active = EVENTS[activeIndex];

  return (
    <>
      <style>{`
        .events-container {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background-color: #fff;
        }
        .events-left {
          flex: 1;
          position: relative;
          overflow: hidden;
          background-color: #111;
        }
        .events-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background-color: #fff;
        }
        .events-header {
          padding: 36px 52px 24px;
        }
        .accordion-btn {
          padding: 0 52px;
          min-height: 68px;
        }
        .accordion-content {
          padding: 0 52px 28px;
          padding-left: calc(52px + 3px + 1.2rem + 28px + 1.2rem);
        }

        @media (max-width: 768px) {
          .events-container {
            flex-direction: column;
          }
          .events-left {
            flex: 0 0 45vh; /* Fixed height for image on mobile */
          }
          .events-right {
            flex: 1;
          }
          .events-header {
            padding: 24px 24px 16px;
          }
          .accordion-btn {
            padding: 0 24px;
            min-height: 54px;
          }
          .accordion-content {
            padding: 0 24px 24px;
            padding-left: calc(24px + 3px + 1.2rem + 28px + 1.2rem);
          }
        }
      `}</style>
      <div id="events" className="events-container">
        {/* ════════════════════════════════════════
            LEFT — full-height image panel
        ════════════════════════════════════════ */}
        <div className="events-left">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* Placeholder background in event color */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: active.color,
                opacity: 0.25,
              }} />
              <img
                src={active.image}
                alt={active.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'absolute',
                  inset: 0,
                }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Bottom gradient for legibility */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '35%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
            </motion.div>
          </AnimatePresence>

          {/* Bottom-left: event counter */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '36px',
            zIndex: 10,
            color: '#fff',
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
          }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.1em' }}>
              / {String(EVENTS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Accent color strip at bottom */}
          <motion.div
            key={`strip-${activeIndex}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: active.color,
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* ════════════════════════════════════════
            RIGHT — accordion list
        ════════════════════════════════════════ */}
        <div className="events-right">
          {/* Section header */}
          <div className="events-header" style={{
            borderBottom: '1px solid #ebebeb',
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#bbb',
              marginBottom: '6px',
            }}>
              Events & Achievements
            </div>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#000',
              margin: 0,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              What We Did<br />This Year
            </h2>
          </div>

          {/* Accordion rows */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            // hide scrollbar
            scrollbarWidth: 'none',
          }}>
            {EVENTS.map((ev, i) => (
              <AccordionRow
                key={i}
                event={ev}
                isOpen={activeIndex === i}
                onOpen={() => goToEvent(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

// ─── Accordion Row ────────────────────────────────────────────────────────────

const AccordionRow: React.FC<{
  event:   Event;
  isOpen:  boolean;
  onOpen:  () => void;
}> = ({ event, isOpen, onOpen }) => {

  return (
    <div
      style={{
        borderBottom: '1px solid #ebebeb',
      }}
    >
      {/* Header */}
      <button
        onClick={onOpen}
        className="accordion-btn"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          textAlign: 'left',
        }}
      >
        {/* Animated accent bar */}
        <motion.div
          animate={{
            height: isOpen ? '44px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '3px',
            backgroundColor: event.color,
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />

        {/* Index */}
        <span style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: isOpen ? event.color : '#ccc',
          transition: 'color 0.3s',
          minWidth: '28px',
          flexShrink: 0,
        }}>
          [{event.index}]
        </span>

        {/* Title */}
        <span style={{
          flex: 1,
          fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: isOpen ? '#000' : '#aaa',
          transition: 'color 0.3s',
        }}>
          {event.title}
        </span>

        {/* Date — only when collapsed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ccc',
                flexShrink: 0,
              }}
            >
              {event.date}
            </motion.span>
          )}
        </AnimatePresence>

        {/* +/× */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '24px',
            height: '24px',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: '1.5px',
            backgroundColor: isOpen ? event.color : '#bbb',
            transform: 'translateY(-50%)',
            transition: 'background-color 0.3s',
            borderRadius: '1px',
          }} />
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1.5px',
            backgroundColor: isOpen ? event.color : '#bbb',
            transform: 'translateX(-50%)',
            transition: 'background-color 0.3s',
            borderRadius: '1px',
          }} />
        </motion.div>
      </button>

      {/* Expanded content — description only (image is on the left panel) */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: isOpen ? 0 : 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="accordion-content"
        >
          {/* Date + place */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '14px',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#aaa',
          }}>
            <span>{event.date}</span>
            <div style={{ width: '1px', height: '8px', backgroundColor: '#ddd' }} />
            <span>{event.place}</span>
          </div>

          {/* Accent line */}
          <div style={{
            width: '32px',
            height: '2px',
            backgroundColor: event.color,
            borderRadius: '1px',
            marginBottom: '14px',
          }} />

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
            lineHeight: 1.8,
            color: '#555',
            margin: 0,
            maxWidth: '420px',
          }}>
            {event.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Achievements;