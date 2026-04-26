import React, { useState } from 'react';
import './App.css'
import Hero from './hero';
import Faculty from './faculty';
import Team from './team';
import HouseCup from './cup';
import Achivements from './events';
import HouseCupDetails from './HouseCupDetails';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [savedScroll, setSavedScroll] = useState(0);

  return (
    <>
      <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
        <Hero />
        <Faculty />
        <Team />
        <HouseCup onExplore={() => { 
          setSavedScroll(window.scrollY);
          setCurrentPage('cup-details'); 
          window.scrollTo(0, 0);
        }} />
        <Achivements />
      </div>
      
      {currentPage === 'cup-details' && (
        <HouseCupDetails onBack={() => { 
          setCurrentPage('home'); 
          // Wait for DOM to update display: block before restoring scroll
          setTimeout(() => window.scrollTo({ top: savedScroll, behavior: 'instant' }), 0); 
        }} />
      )}
    </>
  );
}

export default App;