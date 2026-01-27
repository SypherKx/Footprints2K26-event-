import React from 'react';
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
        </header>

        <div className={styles.eventsGrid}>
          {EVENTS_DATA.map((event) => (
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