import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sportsData from './sports_data.json';

const Sports: React.FC = () => {
  const [filter, setFilter] = useState<'Men' | 'Women'>('Men');
  
  const filteredSports = sportsData.filter(s => s.gender === filter);

  return (
    <section id="sports" style={{ padding: '8rem 2rem', backgroundColor: '#fdfbf7', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#de4383', margin: 0, lineHeight: 1, textTransform: 'uppercase' }}
          >
            Sports Roster
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fad4e6', WebkitTextStroke: '1px #de4383', margin: 0, textTransform: 'uppercase' }}
          >
            House Cup 2025-26
          </motion.h2>
        </div>
        
        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          {['Men', 'Women'].map(gen => (
            <button
              key={gen}
              onClick={() => setFilter(gen as 'Men' | 'Women')}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filter === gen ? '#de4383' : '#e6e0f2',
                color: filter === gen ? 'white' : '#4a3b8c',
                transition: 'all 0.3s ease',
                boxShadow: filter === gen ? '0 10px 20px rgba(222, 67, 131, 0.3)' : 'none',
              }}
            >
              {gen}'s Sports
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredSports.map((sport) => (
              <motion.div
                key={sport.sport + sport.gender}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                  border: '1px solid #f0f0f0',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative background circle */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: filter === 'Men' ? '#a1d6fc20' : '#f8a0bd20', zIndex: 0 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: filter === 'Men' ? '#a1d6fc' : '#f8a0bd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '1.5rem' }}>
                    {sport.sport.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#06060f', margin: 0, textTransform: 'uppercase' }}>
                    {sport.sport.replace(' WO', '')}
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, position: 'relative', zIndex: 1 }}>
                  {sport.players.filter(p => p !== 'Sports  Representative').map((player, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '1rem', color: '#4a3b8c', fontWeight: 500 }}>
                      <span style={{ color: filter === 'Men' ? '#a1d6fc' : '#f8a0bd', marginTop: '2px' }}>✦</span>
                      <span style={{ lineHeight: 1.4 }}>{player}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Sports;
