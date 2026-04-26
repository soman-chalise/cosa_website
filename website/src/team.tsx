import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── Data Structure ───────────────────────────────────────────────────────────

interface TeamMember {
  firstName: string;
  lastName: string;
  pos: string;
  color: string;
  image: string;
  sticker: string;
  leftQuote?: string[];
  rightQuote?: string[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    firstName: "Vishal",
    lastName: "Pardeshi",
    pos: "President",
    color: "#a1d6fc",
    image: "WhatsApp Image 2026-04-19 at 11.04.07 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Leading the way.", "Setting the vision.", "Always forward."],
    rightQuote: ["Inspiring excellence.", "Building the future."]
  },
  {
    firstName: "Nishant",
    lastName: "Nair",
    pos: "Vice President",
    color: "#f8a0bd",
    image: "WhatsApp Image 2026-04-19 at 11.04.14 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Driven by ideas.", "Focused on impact.", "Always one step ahead."],
    rightQuote: ["Leading with vision.", "Creating lasting change."]
  },
  {
    firstName: "Varnitkaur",
    lastName: "Thakral",
    pos: "Secretary",
    color: "#9bf1a2",
    image: "varneet.webp",
    sticker: "sticker_varneet.png",
    leftQuote: ["Organized chaos coordinator.", "Keeping everything in check.", "Master of operations."],
    rightQuote: ["Efficiency at its best.", "The backbone of the team."]
  },
  {
    firstName: "Soman",
    lastName: "Chalise",
    pos: "Tech Head",
    color: "#f7d49d",
    image: "WhatsApp Image 2026-04-19 at 11.04.12 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["I literally built this website.", "Probably fixing a bug right now.", "Powered by caffeine & pure panic."],
    rightQuote: ["The guy who made this site look so cool.", "Keyboard smasher extraordinaire."]
  },
  {
    firstName: "Aaditya",
    lastName: "Tiwari",
    pos: "Tech Head",
    color: "#f8d090",
    image: "WhatsApp Image 2026-04-19 at 11.04.13 AM.jpeg",
    sticker: "sticker_aditya.png",
    leftQuote: ["Coding the matrix.", "Debugging life.", "System architect."],
    rightQuote: ["Logic and reason.", "Tech visionary."]
  },

  {
    firstName: "Neeraj",
    lastName: "Patil",
    pos: "Treasurer",
    color: "#f7d49d",
    image: "niraj patil.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Crunching numbers.", "Securing the bag.", "Financial wizard."],
    rightQuote: ["Budgeting the future.", "Strategic planning."]
  },
  {
    firstName: "Soham",
    lastName: "More",
    pos: "Treasurer",
    color: "#c2a3ff",
    image: "soham more.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Resource manager.", "Calculated risks.", "Optimizing funds."],
    rightQuote: ["Maximizing value.", "Fueling the vision."]
  },
  {
    firstName: "Varda",
    lastName: "Bhatt",
    pos: "Girls Rep",
    color: "#ffb3d9",
    image: "WhatsApp Image 2026-04-19 at 11.03.49 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Empowering voices.", "Championing inclusion.", "Leading by example."],
    rightQuote: ["A force for change.", "Strength in unity."]
  },
  {
    firstName: "Amol",
    lastName: "Gawali",
    pos: "Sports Rep",
    color: "#ffc163",
    image: "WhatsApp Image 2026-04-19 at 11.04.14 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["On the field.", "Playing to win.", "Team spirit."],
    rightQuote: ["Endurance and skill.", "Unstoppable momentum."]
  },
  {
    firstName: "Khemraj",
    lastName: "Rajput",
    pos: "Sports Rep",
    color: "#9bf1a2",
    image: "khemraj.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Hustle and heart.", "Setting the pace.", "Game on."],
    rightQuote: ["Athletic excellence.", "Pushing the limits."]
  },
  {
    firstName: "Shrawani",
    lastName: "Samant",
    pos: "Sports Rep",
    color: "#a1d6fc",
    image: "photo.jpg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Agility and focus.", "True sportsmanship.", "Never backing down."],
    rightQuote: ["Raising the bar.", "Victory in motion."]
  },
  {
    firstName: "Samnin",
    lastName: "Pathan",
    pos: "Sports Rep",
    color: "#f8a0bd",
    image: "WhatsApp Image 2026-04-19 at 11.04.08 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Unleashing potential.", "Power and precision.", "Driven by competition."],
    rightQuote: ["Breaking records.", "A true champion."]
  },
  {
    firstName: "Saba",
    lastName: "Shaikh",
    pos: "Cultural Coord",
    color: "#ec8f8f",
    image: "WhatsApp Image 2026-04-19 at 11.04.09 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Art in motion.", "Expressing creativity.", "Bringing vibes."],
    rightQuote: ["Celebrating diversity.", "The soul of the event."]
  },
  {
    firstName: "Janhavi",
    lastName: "Dange",
    pos: "Cultural Coord",
    color: "#c2a3ff",
    image: "WhatsApp Image 2026-04-19 at 11.04.10 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Curating magic.", "Setting the stage.", "Aesthetic sense."],
    rightQuote: ["Cultural icon.", "Making memories."]
  },
  {
    firstName: "Bhakti",
    lastName: "Pawar",
    pos: "Cultural Coord",
    color: "#f8d090",
    image: "bhakti.webp",
    sticker: "sticker_bhakti.png",
    leftQuote: ["Rhythm and grace.", "Weaving stories.", "Creative spark."],
    rightQuote: ["Lighting up the stage.", "Pure artistry."]
  },
  {
    firstName: "Adithyan",
    lastName: "KS",
    pos: "Purchase Coord",
    color: "#a1d6fc",
    image: "adi.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Sourcing the best.", "Logistics mastermind.", "Getting it done."],
    rightQuote: ["Quality control.", "Always equipped."]
  },
  {
    firstName: "Vidisha",
    lastName: "Narsinghani",
    pos: "Event Coord",
    color: "#ffb3d9",
    image: "vidisha - event coord.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Planning perfection.", "Behind the scenes.", "Making it happen."],
    rightQuote: ["Flawless execution.", "Event maestro."]
  },
  {
    firstName: "Sanika",
    lastName: "Dusane",
    pos: "Event Coord",
    color: "#9bf1a2",
    image: "sanika - event coord.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Detail oriented.", "Managing the crowd.", "Seamless flow."],
    rightQuote: ["Creating experiences.", "The event architect."]
  },
  {
    firstName: "Samruddhi",
    lastName: "Bande",
    pos: "Event Coord",
    color: "#f7d49d",
    image: "samrudhi bande - event coord.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Coordinating chaos.", "Vibe checker.", "Ensuring success."],
    rightQuote: ["Master of events.", "Always on track."]
  },
  {
    firstName: "Shivam",
    lastName: "More",
    pos: "Campaigning",
    color: "#ec8f8f",
    image: "WhatsApp Image 2026-04-19 at 11.04.10 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Spreading the word.", "Building hype.", "Voice of the crowd."],
    rightQuote: ["Marketing genius.", "Engaging the masses."]
  },
  {
    firstName: "Esha",
    lastName: "Patil",
    pos: "Campaigning",
    color: "#a1d6fc",
    image: "WhatsApp Image 2026-04-19 at 11.04.10 AM (2).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Strategic outreach.", "Connecting people.", "Trendsetter."],
    rightQuote: ["Amplifying the message.", "The ultimate promoter."]
  },
  {
    firstName: "Sanskruti",
    lastName: "Patil",
    pos: "Art & Design",
    color: "#f8a0bd",
    image: "WhatsApp Image 2026-04-19 at 11.04.11 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Visual storytelling.", "Coloring outside the lines.", "Design visionary."],
    rightQuote: ["Crafting aesthetics.", "Pixel perfect."]
  },
  {
    firstName: "Shantanu",
    lastName: "Vispute",
    pos: "Art & Design",
    color: "#c2a3ff",
    image: "WhatsApp Image 2026-04-19 at 11.04.11 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Creative thinker.", "Designing the future.", "Abstract concepts."],
    rightQuote: ["Innovative graphics.", "The visual anchor."]
  },
  {
    firstName: "Gauri",
    lastName: "Bagad",
    pos: "Social Media",
    color: "#ffc163",
    image: "WhatsApp Image 2026-04-19 at 11.03.49 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Scrolling and posting.", "Master of hashtags.", "Going viral."],
    rightQuote: ["Digital presence.", "Keeping it trendy."]
  },
  {
    firstName: "Ishika",
    lastName: "Sharma",
    pos: "Social Media",
    color: "#9bf1a2",
    image: "WhatsApp Image 2026-04-19 at 11.04.07 AM.jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Content curator.", "Engaging the audience.", "Social butterfly."],
    rightQuote: ["Online community.", "Capturing moments."]
  },
  {
    firstName: "Bhavik",
    lastName: "Pawar",
    pos: "Sponsorship",
    color: "#ec8f8f",
    image: "WhatsApp Image 2026-04-19 at 11.04.13 AM (1).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Closing deals.", "Securing partnerships.", "Networking pro."],
    rightQuote: ["Fueling the event.", "Business mindset."]
  },
  {
    firstName: "Sanskar",
    lastName: "Bhusal",
    pos: "Sponsorship",
    color: "#a1d6fc",
    image: "WhatsApp Image 2026-04-19 at 11.04.13 AM (2).jpeg",
    sticker: "nishant-sticker.png",
    leftQuote: ["Pitching ideas.", "Building relations.", "Smooth talker."],
    rightQuote: ["Unlocking resources.", "The ultimate negotiator."]
  },
  {
    firstName: "Arpita",
    lastName: "Birari",
    pos: "Content Creator",
    color: "#f8a0bd",
    image: "arpita.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Wordsmith.", "Scripting reality.", "Idea generator."],
    rightQuote: ["Captivating stories.", "Creative narratives."]
  },
  {
    firstName: "Yash",
    lastName: "Godse",
    pos: "Content Creator",
    color: "#c2a3ff",
    image: "yash.webp",
    sticker: "nishant-sticker.png",
    leftQuote: ["Behind the lens.", "Capturing the essence.", "Visual artist."],
    rightQuote: ["Directing the flow.", "Content king."]
  }
];

const getLeftQuote = (m: TeamMember) => m.leftQuote || ["Driven by passion.", "Focused on success.", "Always learning."];
const getRightQuote = (m: TeamMember) => m.rightQuote || ["Dedicated to the craft.", "Making a difference."];

// ─── Decorative Elements ────────────────────────────────────────────────────────

const DecorativeBackground = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <motion.div
      style={{ position: 'absolute', inset: 0 }}
      animate={{ background: `linear-gradient(135deg, color-mix(in srgb, ${color} 20%, #ebe6fa) 0%, color-mix(in srgb, ${color} 5%, #f6f3fc) 100%)` }}
      transition={{ duration: 0.8 }}
    />

    <div style={{ position: 'absolute', top: '5%', left: '5%', width: '100px', height: '60px', backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px)', backgroundSize: '15px 15px' }} />

    <motion.svg animate={{ fill: color }} transition={{ duration: 0.8 }} style={{ position: 'absolute', top: '15%', left: '25%', width: '40px', height: '40px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" opacity="0.8" />
    </motion.svg>
    <motion.svg animate={{ fill: color }} transition={{ duration: 0.8 }} style={{ position: 'absolute', top: '10%', right: '30%', width: '20px', height: '20px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" opacity="0.6" />
    </motion.svg>

    <motion.div animate={{ color: color }} transition={{ duration: 0.8 }} style={{ position: 'absolute', bottom: '15%', left: '28%', fontSize: '24px', opacity: 0.6, fontWeight: 'bold' }}>+</motion.div>
    <motion.div animate={{ color: color }} transition={{ duration: 0.8 }} style={{ position: 'absolute', top: '45%', right: '10%', fontSize: '24px', opacity: 0.6, fontWeight: 'bold' }}>+</motion.div>

    <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: 'auto', opacity: 0.05 }} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M400 400V150C350 180 250 120 150 200C50 280 -50 220 -100 250V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
      <path d="M400 400V180C330 200 240 150 140 230C40 310 -60 250 -100 280V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
      <path d="M400 400V210C310 220 230 180 130 260C30 340 -70 280 -100 310V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
      <path d="M400 400V240C290 240 220 210 120 290C20 370 -80 310 -100 340V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
    </svg>
    <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '30%', height: 'auto', opacity: 0.05, transform: 'scaleX(-1)' }} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M400 400V200C350 230 250 170 150 250C50 330 -50 270 -100 300V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
      <path d="M400 400V230C330 250 240 200 140 280C40 360 -60 300 -100 330V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
      <path d="M400 400V260C310 270 230 230 130 310C30 390 -70 330 -100 360V400H400Z" stroke="#4a3b8c" strokeWidth="2" fill="transparent" />
    </svg>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TeamIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const circleScale = useTransform(scrollYProgress, [0.2, 0.95], [0, 1]);

  const [introComplete, setIntroComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextMember = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const prevMember = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const member = TEAM_MEMBERS[currentIndex];

  const getFontSize = (text: string) => {
    if (text.length >= 11) return 'clamp(1.5rem, 3.5vw, 3.5rem)';
    if (text.length >= 8) return 'clamp(2rem, 4.5vw, 4.5rem)';
    return 'clamp(2.5rem, 5vw, 5rem)';
  };

  const posWords = member.pos.split(' ');
  const posLine1 = posWords[0];
  const posLine2 = posWords.slice(1).join(' ');

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }
    })
  };

  return (
    <>
      <style>{`
        .team-section {
          position: relative;
          width: 100%;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          padding: 4rem 2rem;
          box-sizing: border-box;
        }
        .team-grid-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px minmax(0, 1fr);
          gap: 4rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
          box-sizing: border-box;
        }
        .left-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }
        .right-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: relative;
        }
        .nav-buttons {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
          z-index: 20;
        }
        .huge-number {
          position: absolute;
          top: -150px;
          left: -20px;
          font-size: 20rem;
        }
        @media (max-width: 1024px) {
          .team-section {
            height: auto;
            min-height: 100dvh;
            padding: 6rem 1rem;
          }
          .team-grid-container {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: 3rem;
          }
          .left-column, .right-column {
            align-items: center;
            text-align: center;
          }
          .huge-number {
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10rem;
          }
          .divider {
            align-self: center !important;
          }
        }
      `}</style>
      <div ref={containerRef} style={{ position: 'relative', height: '150vh', backgroundColor: '#06060f' }}>
        <section id="team" className="team-section" style={{ position: 'sticky', top: 0, height: '100vh' }}>
          <AnimatePresence>
            {!introComplete && (
              <motion.div
                style={{ position: 'absolute', inset: 0, zIndex: 100, backgroundColor: '#fdfbf7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2 style={{ fontSize: '12vw', fontWeight: 900, color: '#de4383', margin: 0, lineHeight: 0.8 }} exit={{ x: '-50vw', opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
                  TEAM
                </motion.h2>
                <motion.h2 style={{ fontSize: '12vw', fontWeight: 900, color: '#fad4e6', WebkitTextStroke: '3px #de4383', margin: 0, lineHeight: 0.8 }} exit={{ x: '50vw', opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
                  COSA 2026
                </motion.h2>
                <motion.button
                  onClick={() => setIntroComplete(true)}
                  style={{ marginTop: '4rem', padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white', backgroundColor: '#de4383', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(222, 67, 131, 0.4)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  Meet The Team
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <DecorativeBackground color={member.color} />

          <div className="team-grid-container" style={{ position: 'relative', zIndex: 10 }}>

            {/* LEFT COLUMN: Name & Left Quotes */}
            <div className="left-column">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`name-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="left-column"
                >
                  <motion.h1 animate={{ color: member.color }} transition={{ duration: 0.8 }} style={{ filter: 'brightness(0.65)', fontSize: getFontSize(member.firstName), fontWeight: 900, lineHeight: 1, margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {member.firstName}
                  </motion.h1>
                  <motion.h1 animate={{ color: member.color }} transition={{ duration: 0.8 }} style={{ filter: 'brightness(0.65)', fontSize: getFontSize(member.lastName), fontWeight: 900, lineHeight: 1, margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap', marginBottom: '3rem' }}>
                    {member.lastName}
                  </motion.h1>

                  {/* Divider Line */}
                  <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', width: '60px' }}>
                    <motion.div animate={{ backgroundColor: member.color }} transition={{ duration: 0.8 }} style={{ width: '8px', height: '8px', borderRadius: '50%' }} />
                    <motion.div animate={{ backgroundColor: member.color }} transition={{ duration: 0.8 }} style={{ height: '2px', flex: 1 }} />
                  </div>

                  {/* Quotes */}
                  <div style={{ color: '#4a3b8c', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500, opacity: 0.8 }}>
                    {getLeftQuote(member).map((q, i) => (
                      <div key={i}>{q}</div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CENTER COLUMN: Image */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`img-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ position: 'relative', width: '100%', aspectRatio: '3/4' }}
                >
                  {/* Offset background matching member color */}
                  <motion.div
                    animate={{ backgroundColor: member.color, boxShadow: `0 20px 40px ${member.color}40` }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      transform: 'translate(20px, 20px)',
                      zIndex: 0
                    }}
                  />

                  {/* Image */}
                  <img
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls moved inside the natural flow, avoiding overlap issues */}
              <div className="nav-buttons">
                <button
                  onClick={prevMember}
                  style={{ background: 'rgba(255,255,255,0.8)', border: 'none', color: '#4a3b8c', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', fontSize: '1.5rem', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ←
                </button>
                <button
                  onClick={nextMember}
                  style={{ background: 'rgba(255,255,255,0.8)', border: 'none', color: '#4a3b8c', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', fontSize: '1.5rem', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  →
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Huge Number, Sticker, Position */}
            <div className="right-column">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`right-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="right-column"
                  style={{ width: '100%' }}
                >
                  {/* Huge Background Number */}
                  <motion.div
                    className="huge-number"
                    animate={{ WebkitTextStrokeColor: `color-mix(in srgb, ${member.color} 20%, transparent)` }}
                    transition={{ duration: 0.8 }}
                    style={{
                      fontWeight: 900,
                      color: 'transparent',
                      WebkitTextStrokeWidth: '2px',
                      lineHeight: 0.8,
                      zIndex: 0,
                      pointerEvents: 'none'
                    }}
                  >
                    {String(currentIndex + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Sticker */}
                  <div style={{ position: 'relative', zIndex: 10, width: '220px', height: '220px', marginBottom: '1rem' }}>
                    <motion.img
                      src={member.sticker}
                      alt="sticker"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Divider Line */}
                  <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', width: '80px', alignSelf: 'flex-start' }}>
                    <motion.div animate={{ backgroundColor: member.color }} transition={{ duration: 0.8 }} style={{ width: '6px', height: '6px', transform: 'rotate(45deg)' }} />
                    <motion.div animate={{ backgroundColor: member.color }} transition={{ duration: 0.8 }} style={{ height: '2px', flex: 1 }} />
                  </div>

                  {/* Position */}
                  <div style={{ marginBottom: '2rem' }}>
                    <motion.h2 animate={{ color: member.color }} transition={{ duration: 0.8 }} style={{ filter: 'brightness(0.65)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, margin: 0, textTransform: 'uppercase' }}>
                      {posLine1}
                    </motion.h2>
                    {posLine2 && (
                      <motion.h2 animate={{ color: member.color }} transition={{ duration: 0.8 }} style={{ filter: 'brightness(0.65)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, margin: 0, textTransform: 'uppercase' }}>
                        {posLine2}
                      </motion.h2>
                    )}
                  </div>

                  {/* Divider Line 2 */}
                  <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', width: '60px', alignSelf: 'flex-start' }}>
                    <motion.div animate={{ borderColor: member.color }} transition={{ duration: 0.8 }} style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid' }} />
                    <motion.div animate={{ backgroundColor: member.color }} transition={{ duration: 0.8 }} style={{ height: '2px', flex: 1 }} />
                  </div>

                  {/* Right Quotes */}
                  <div style={{ color: '#4a3b8c', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500, opacity: 0.8 }}>
                    {getRightQuote(member).map((q, i) => (
                      <div key={i}>{q}</div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ── CIRCLE WIPE OUT → #06060f (HouseCup bg) ── */}
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
        </section>
      </div>
    </>
  );
};

export default TeamIntro;