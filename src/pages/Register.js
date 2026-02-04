import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
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

// Event Data with more details
const EVENTS_DATA = [
  { id: 1, name: "Football", img: imgFootball, category: "Male", venue: "TBA", time: "TBA", players: "11", desc: "The beautiful game - showcase your skills on the field." },
  { id: 2, name: "Basketball", img: imgBasketball, category: "Male / Female", venue: "TBA", time: "TBA", players: "5", desc: "Dribble, shoot, score - dominate the court." },
  { id: 3, name: "Volleyball", img: imgVolleyball, category: "Male / Female", venue: "TBA", time: "TBA", players: "6", desc: "Spike your way to victory." },
  { id: 4, name: "Kabaddi", img: imgKabaddi, category: "Male", venue: "TBA", time: "TBA", players: "11", desc: "Traditional Indian sport of strength and strategy." },
  { id: 5, name: "Kho-Kho", img: imgKhoKho, category: "Male / Female", venue: "TBA", time: "TBA", players: "11", desc: "Speed and agility in this traditional tag game." },
  { id: 6, name: "Sprint", img: imgSprint, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "When speed takes over - race to the finish." },
  { id: 7, name: "Slow Cycle", img: imgSlowCycle, category: "Female", venue: "TBA", time: "TBA", players: "1", desc: "Patient, precise, powerful - balance is key." },
  { id: 8, name: "Throw", img: imgThrow, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "Shot put and discus - power meets technique." },
  { id: 9, name: "Badminton", img: imgBadminton, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "Smash it! Fast-paced racquet action." },
  { id: 10, name: "Table Tennis", img: imgTableTennis, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "Quick reflexes and precise shots." },
  { id: 11, name: "Carrom", img: imgCarrom, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "The game of calculation - aim and strike." },
  { id: 12, name: "Chess", img: imgChess, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "One board, endless battles - outsmart your opponent." },
  { id: 13, name: "Tug of War", img: imgRopeRoyale, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "One rope, one crown - pull your way to glory." },
  { id: 14, name: "Jumps", img: imgLongJump, category: "Male / Female", venue: "TBA", time: "TBA", players: "1", desc: "Long jump and high jump - defy gravity." },
];

// Modal Component
const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  };

  const contentStyle = {
    background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.98), rgba(15, 15, 15, 0.98))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '850px',
    maxHeight: '85vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
    position: 'relative',
    color: 'white',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };

  const imageContainerStyle = {
    flex: window.innerWidth <= 768 ? 'none' : 1,
    minHeight: window.innerWidth <= 768 ? '220px' : '400px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: window.innerWidth <= 768 ? '24px 24px 0 0' : '24px 0 0 24px',
  };

  const infoStyle = {
    flex: 1.1,
    padding: window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const registerButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '1rem 1.5rem',
    background: 'linear-gradient(135deg, #974B60 0%, #c76b83 100%)',
    border: 'none',
    borderRadius: '14px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 8px 25px rgba(151, 75, 96, 0.4)',
    transition: 'all 0.3s ease',
  };

  return (
    <motion.div
      style={overlayStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        style={contentStyle}
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'rotate(0deg)';
          }}
        >
          ✕
        </button>

        <div style={imageContainerStyle}>
          <img
            src={event.img}
            alt={event.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        <div style={infoStyle}>
          <div>
            <span style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, rgba(151, 75, 96, 0.3), rgba(199, 107, 131, 0.3))',
              color: '#c76b83',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '0.75rem',
              border: '1px solid rgba(151, 75, 96, 0.5)',
            }}>
              Sports Event
            </span>
            <h2 style={{
              fontFamily: "'Antonio', sans-serif",
              fontSize: window.innerWidth <= 768 ? '2rem' : '2.8rem',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #fff, #ccc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '0.5rem',
              fontWeight: 700,
            }}>
              {event.name}
            </h2>
          </div>

          <p style={{ fontSize: '1rem', color: '#999', lineHeight: 1.7 }}>
            {event.desc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
            marginTop: '0.5rem',
          }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1.5px', fontWeight: 600 }}>Category</span>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', marginTop: '0.3rem' }}>{event.category}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1.5px', fontWeight: 600 }}>Venue</span>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', marginTop: '0.3rem' }}>{event.venue}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1.5px', fontWeight: 600 }}>Time</span>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', marginTop: '0.3rem' }}>{event.time}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1.5px', fontWeight: 600 }}>Players</span>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', marginTop: '0.3rem' }}>{event.players}</p>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <a
              href="https://www.ignitia.in/events"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.ignitia.in/events', '_blank');
              }}
              style={registerButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(151, 75, 96, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(151, 75, 96, 0.4)';
              }}
            >
              Register Now
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Register = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

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
              onClick={() => setSelectedEvent(event)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.imageWrapper}>
                <img draggable="false" src={event.img} alt={event.name} className={styles.eventImage} loading="lazy" />
                <div className={styles.eventOverlay}>
                  <h3 className={styles.eventName}>{event.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Register;