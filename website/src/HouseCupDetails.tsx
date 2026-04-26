import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sportsData from './sports_data.json';

// ============================================================================
// ⚠️ JUNIORS: UPDATE THIS DATA EVERY YEAR ⚠️
// Add images to the 'public' folder and put the file name below (e.g., '/football.jpg').
// ============================================================================
export const houseData = {
  events: [
    { id: 'e1', title: 'Character Day', category: 'COSA', image: '/team.jpeg', participants: ['Darshan Baviskar', 'Pratik Lahare', 'Rushikesh Adke', 'Yogendra Kumbhare', 'Vishal Ippar', 'Manish Alone', 'Rushab Bhavar', 'Ritesh Tayade', 'Janvhi Dange', 'Suhani Rajput', 'Prajakta Jagtap', 'Sanika Dusane', 'Maithili Sonawane', 'Nikita Nakod', 'Ruchika Banait', 'Aditi Avhad'] },
    { id: 'e2', title: 'Traditional Day', category: 'COSA', image: '/team.jpeg', participants: ['Ujjawal Deshmukh', 'Maithili Sonawane', 'Rushabh Bhavar', 'Darshan Baviskar', 'Yogendra Kumbhare', 'Manish Alone', 'Pratik Lahare', 'Ved Bhosale', 'Soham Sabale', 'Rushikesh Adke', 'Nisha Sangle', 'Shravani Velamkar', 'Pawan Darade', 'Lakshika Pawar', 'Sanika Vadje', 'Neelakshi Rahane', 'Dhruv Gharate', 'Gayatri Wagh', 'Soham More', 'Vishal Ippar'] },
    { id: 'e3', title: 'Annual Day', category: 'Participants', image: '/team.jpeg', participants: ['Ruchika Banite', 'Vaibhavi Thakre', 'Asmita Aher', 'Shravani Velamkar', 'Nilakshi Rahane', 'Neha Shelke', 'Samruddhi Bande', 'Bhakti Pawar', 'Gauri Bagad', 'Varda Bhat', 'Nisha Sangle', 'Sanika Dusane', 'Aditi Avhad', 'Sanskruti Patil', 'Sanika Vajde', 'Chanchal Rathod', 'Vishal Pardeshi', 'Pawan Darade', 'Shivam More', 'Shantanu Vispute', 'Soham Sabale', 'Bhavik Pawar', 'Ved Bhosle', 'Dhruv Gharate', 'Nishant Nair', 'Adityan KS', 'Sanskar Bhusal', 'Ritesh Tayade', 'Neeraj Patil'] },
  ],
  sports: sportsData.map((s, index) => ({
    id: `s${index}`,
    title: `${s.sport.replace(' WO', '')}`,
    category: `${s.gender}'s Sports`,
    gender: s.gender,
    image: '/team.jpeg',
    participants: s.players
      .filter((p: string) => p !== 'Sports  Representative')
      .map((p: string) => p.replace(/\b(SE|TE|BE)\b/i, '').replace(/\(\s*c\s*\)/i, '').trim())
  }))
};
// ============================================================================

const theme = {
  bg: '#FAF8F3',
  textDark: '#1A1A1A',
  accent: '#C59A5A',
  accentLight: '#E8DFD1',
  cardBg: '#FFFFFF',
};

// ─── HIGH-VISIBILITY INTERACTIVE BACKGROUND ──────────────────────────────────
const BackgroundElements: React.FC<{ activeTitle: string | null }> = ({ activeTitle }) => {
  const bgText = activeTitle ? activeTitle.toUpperCase() : 'GLORY';
  const isExpanded = !!activeTitle;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

      {/* 1. Dynamic Massive Watermark Text (NOW WRAPPING PROPERLY) */}
      <AnimatePresence>
        <motion.div
          key={bgText}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', position: 'absolute' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(4rem, 14vw, 16rem)', // Scaled down slightly to fit long words
            lineHeight: 0.85,                     // Tight spacing for stacked words
            fontWeight: 900,
            color: 'rgba(197, 154, 90, 0.08)',    // Soft fill tint
            WebkitTextStroke: `3px rgba(197, 154, 90, 0.25)`, // Bold outline
            whiteSpace: 'normal',                 // ALLOWS TEXT TO WRAP
            wordBreak: 'break-word',              // Prevents overflow
            textAlign: 'center',
            width: '90vw',                        // Keeps it inside the screen edges
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {bgText}
        </motion.div>
      </AnimatePresence>

      {/* 2. Reacting Geometric Rings */}
      <motion.div
        animate={{
          rotate: 360,
          scale: isExpanded ? 1.4 : 1,
          opacity: isExpanded ? 0.6 : 0.3
        }}
        transition={{
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.6, ease: "backOut" },
          opacity: { duration: 0.4 }
        }}
        style={{
          position: 'absolute', bottom: '-20vh', right: '-10vw', width: '60vh', height: '60vh',
          borderRadius: '50%', border: `4px solid ${theme.accent}`
        }}
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: isExpanded ? 1.3 : 1,
          opacity: isExpanded ? 0.5 : 0.2
        }}
        transition={{
          rotate: { duration: 100, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.6, ease: "backOut", delay: 0.05 }
        }}
        style={{
          position: 'absolute', bottom: '-10vh', right: '5vw', width: '45vh', height: '45vh',
          borderRadius: '50%', border: `3px dashed ${theme.accent}`
        }}
      />

      <motion.div
        animate={{
          rotate: 360,
          scale: isExpanded ? 1.5 : 1,
          opacity: isExpanded ? 0.8 : 0.4
        }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.6, ease: "backOut" }
        }}
        style={{
          position: 'absolute', top: '-15vh', left: '-5vw', width: '50vh', height: '50vh',
          borderRadius: '50%', border: `4px solid rgba(197, 154, 90, 0.4)`
        }}
      />

      {/* 3. Floating Accents */}
      <div style={{ position: 'absolute', top: '25%', left: '15%', color: theme.accent, opacity: 0.8, fontSize: '2rem', fontWeight: 900 }}>+</div>
      <div style={{ position: 'absolute', bottom: '30%', left: '8%', color: theme.accent, opacity: 0.6, fontSize: '3rem', fontWeight: 900 }}>+</div>
      <div style={{ position: 'absolute', top: '15%', right: '20%', color: theme.accent, opacity: 0.9, fontSize: '2.5rem', fontWeight: 900 }}>+</div>

      {/* Sideways Text */}
      <div style={{
        position: 'absolute', top: '20vh', left: '2vw', transform: 'rotate(-90deg)',
        transformOrigin: 'left top', fontSize: '1.2rem', fontWeight: 800,
        letterSpacing: '6px', color: theme.accent, display: 'flex', alignItems: 'center', gap: '15px',
      }}>
        COSA CHAMPIONS <span style={{ display: 'inline-block', width: '60px', height: '2px', backgroundColor: theme.accent }}></span>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
const HouseCupDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'sports'>('events');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<'All' | 'Men' | 'Women'>('All');

  const handleTabSwitch = (tab: 'events' | 'sports') => {
    setActiveTab(tab);
    setActiveCardId(null);
    setGenderFilter('All');
  };

  let currentData = activeTab === 'events' ? houseData.events : houseData.sports;
  if (activeTab === 'sports' && genderFilter !== 'All') {
    currentData = (currentData as any[]).filter(item => item.gender === genderFilter);
  }
  const activeItem = currentData.find(item => item.id === activeCardId);
  const activeTitle = activeItem ? activeItem.title : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.textDark,
        padding: '8vh 5vw',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* ── BACKGROUND INJECTED HERE (Receives activeTitle) ── */}
      <BackgroundElements activeTitle={activeTitle} />

      {/* ── BACK BUTTON ── */}
      <button
        onClick={onBack}
        style={{
          position: 'relative', zIndex: 10, background: 'transparent', border: 'none',
          color: theme.textDark, cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4vh'
        }}
      >
        ← Return to Trophy
      </button>

      {/* ── HEADER & TOGGLE ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6vh', position: 'relative', zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', color: theme.textDark, marginBottom: '2rem', textAlign: 'center', textTransform: 'uppercase' }}
        >
          Hall of <span style={{ color: theme.accent }}>Fame</span>
        </motion.h1>

        <div style={{ display: 'flex', background: theme.cardBg, padding: '0.4rem', borderRadius: '50px', border: `2px solid ${theme.accentLight}`, boxShadow: `0 8px 30px rgba(197, 154, 90, 0.15)` }}>
          {['events', 'sports'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab as 'events' | 'sports')}
              style={{
                position: 'relative', padding: '0.8rem 3rem', fontSize: '1rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '2px', background: 'transparent',
                border: 'none', color: activeTab === tab ? '#fff' : theme.textDark, cursor: 'pointer',
                zIndex: 1, transition: 'color 0.3s ease'
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-pill"
                  style={{ position: 'absolute', inset: 0, background: theme.accent, borderRadius: '50px', zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Sub-tabs for Sports filter */}
        <AnimatePresence>
          {activeTab === 'sports' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', overflow: 'hidden' }}
            >
              {['All', 'Men', 'Women'].map(gf => (
                <button
                  key={gf}
                  onClick={() => { setGenderFilter(gf as any); setActiveCardId(null); }}
                  style={{
                    padding: '0.5rem 1.5rem', fontSize: '0.9rem', fontWeight: 700,
                    borderRadius: '50px', border: `1px solid ${theme.accent}`,
                    background: genderFilter === gf ? theme.accent : 'transparent',
                    color: genderFilter === gf ? '#fff' : theme.textDark,
                    cursor: 'pointer', transition: 'all 0.3s ease'
                  }}
                >
                  {gf === 'All' ? 'All Sports' : `${gf}'s`}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── BENTO GRID WITH DRAWER ANIMATION ── */}
      <motion.div
        layout
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <AnimatePresence>
          {currentData.map((item) => {
            const isActive = activeCardId === item.id;

            return (
              <motion.div
                layout
                key={item.id}
                onClick={() => setActiveCardId(isActive ? null : item.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ layout: { type: 'spring', stiffness: 200, damping: 24 } }}
                style={{
                  flex: isActive ? '1 1 100%' : '1 1 calc(25% - 1rem)',
                  minWidth: isActive ? '100%' : '200px',
                  height: isActive ? 'auto' : '220px',
                  minHeight: isActive ? '350px' : '220px',
                  background: theme.cardBg,
                  borderRadius: '16px',
                  border: `2px solid ${isActive ? theme.accent : theme.accentLight}`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isActive ? `0 20px 40px rgba(197, 154, 90, 0.2)` : `0 4px 10px rgba(0,0,0,0.04)`,
                }}
              >
                {/* ── IMAGE SECTION ── */}
                <motion.div
                  layout
                  style={{
                    width: '100%',
                    height: isActive ? 'auto' : '100%',
                    position: isActive ? 'relative' : 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: isActive ? '#111' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isActive ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)',
                    transition: 'background 0.3s ease',
                    zIndex: 1
                  }} />
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%', 
                      height: isActive ? 'auto' : '100%',
                      maxHeight: isActive ? '50vh' : 'none',
                      objectFit: isActive ? 'contain' : 'cover',
                      filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                      transition: 'filter 0.5s ease',
                      position: 'relative',
                      zIndex: 0
                    }}
                  />

                  {!isActive && (
                    <motion.h3
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute', inset: 0, margin: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: '#fff',
                        fontSize: '1.5rem', fontWeight: 800, zIndex: 2, textTransform: 'uppercase',
                        letterSpacing: '1px', textAlign: 'center', padding: '1rem',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {item.title}
                    </motion.h3>
                  )}
                </motion.div>

                {/* ── EXPANDED ROSTER SECTION ── */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                    style={{
                      width: '100%',
                      padding: '3rem', display: 'flex', flexDirection: 'column',
                      justifyContent: 'center', backgroundColor: theme.cardBg
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <span style={{ display: 'inline-block', width: '30px', height: '4px', backgroundColor: theme.accent }}></span>
                      <p style={{ color: theme.accent, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                        {'category' in item ? item.category : 'Sports Roster'}
                      </p>
                    </div>

                    <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: theme.textDark, margin: '0 0 1.5rem 0', lineHeight: 1 }}>{item.title}</h2>

                    <p style={{ color: '#888', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '1.5px', fontWeight: 700 }}>
                      {activeTab === 'sports' ? 'LIST OF PLAYERS' : 'PARTICIPANTS'} ({item.participants.length})
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {item.participants.map(name => (
                        <span key={name} style={{
                          background: theme.bg, padding: '0.6rem 1.2rem', borderRadius: '50px',
                          color: theme.textDark, fontWeight: 600, fontSize: '0.9rem',
                          border: `2px solid ${theme.accentLight}`
                        }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default HouseCupDetails;