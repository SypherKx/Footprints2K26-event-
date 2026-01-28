import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Register.module.scss';
import Footer from '../layouts/Footer';

import imgBadminton from '../media/events/badminton_new3.jpg';
import imgKhoKho from '../media/events/kho-kho_new2.jpg';
import imgBasketball from '../media/events/basketball_new.jpg';
import imgSlowCycle from '../media/events/slow-cycle_new.jpg';
import imgThrow from '../media/events/throw_new.jpg';
import imgChess from '../media/events/chess_new.jpg';
import imgKabaddi from '../media/events/kabaddi_new.jpg';
import imgSprint from '../media/events/sprint_new.jpg';
import imgTableTennis from '../media/events/table-tennis_new.jpg';
import imgCarrom from '../media/events/carrom_new2.jpg';
import imgFootball from '../media/events/football_new.jpg';
import imgVolleyball from '../media/events/volleyball_new2.jpg';
import imgRopeRoyale from '../media/events/rope-royale_new.jpg';
import imgLongJump from '../media/events/jumps_new.jpg';

// Event Data
const EVENTS_DATA = [
  { id: 1, name: "Football", img: imgFootball },
  { id: 2, name: "Basketball", img: imgBasketball },
  { id: 3, name: "Volleyball", img: imgVolleyball },
  { id: 4, name: "Kabaddi", img: imgKabaddi },
  { id: 5, name: "Kho-Kho", img: imgKhoKho },
  { id: 6, name: "Sprint", img: imgSprint },
  { id: 7, name: "Slow Cycle", img: imgSlowCycle },
  { id: 8, name: "Throw", img: imgThrow },
  { id: 9, name: "Badminton", img: imgBadminton },
  { id: 10, name: "Table Tennis", img: imgTableTennis },
  { id: 11, name: "Carrom", img: imgCarrom },
  { id: 12, name: "Chess", img: imgChess },
  { id: 13, name: "Tug of War", img: imgRopeRoyale },
  { id: 14, name: "Jumps", img: imgLongJump },
];

const Register = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sportsTags = EVENTS_DATA.map(e => e.name.toUpperCase());
  // Duplicate tags to ensure seamless scrolling
  const displayTags = [...sportsTags, ...sportsTags, ...sportsTags, ...sportsTags];

  return (
    <div className={styles.registerPage}>
      <motion.div
        className='container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className={styles.pageHeader}>
          <div className={styles['intro-bg']}>
            <div className={styles.rail}>
              {displayTags.map((tag, i) => <span key={i}>{tag} &nbsp; </span>)}
            </div>
          </div>
          <h2>Events</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '1rem',
            zIndex: 10,
            position: 'relative',
            width: '100%'
          }}>
            <div style={{ position: 'relative', width: '90%', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.8rem 1.5rem',
                  paddingLeft: '3rem', // Make space for icon
                  width: '100%',
                  backgroundColor: 'white',
                  border: '2px solid #974B60',
                  borderRadius: '30px',
                  color: 'black',
                  fontSize: '1rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.2rem',
                  height: '1.2rem',
                  pointerEvents: 'none'
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </header>

        <div className={styles.eventsGrid}>
          {EVENTS_DATA.filter(event =>
            !searchQuery || event.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          ).map((event) => (
            <motion.div
              key={event.id}
              className={styles.eventCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.imageWrapper}>
                <img src={event.img} alt={event.name} className={styles.eventImage} loading="lazy" />
                <div className={styles.eventOverlay}>
                  <h3 className={styles.eventName}>{event.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer is already global in Layout, but if we need a specific one or spacing, we handle it via CSS padding */}
    </div>
  )
}

export default Register;