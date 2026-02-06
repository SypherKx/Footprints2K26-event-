import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Register.module.scss';
import Footer from '../layouts/Footer';

// Modal Component
const EventModal = ({ event, onClose }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = React.useState(window.innerWidth <= 400);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 400);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!event) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isSmallMobile ? '0.5rem' : '1rem',
  };

  const contentStyle = {
    background: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: isSmallMobile ? '16px' : '20px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)',
    position: 'relative',
    overflow: 'hidden',
    width: isSmallMobile ? '98%' : '100%',
    maxWidth: isMobile ? '100%' : '850px',
    maxHeight: isSmallMobile ? '95vh' : '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
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
    flex: isMobile ? 'none' : 1,
    minHeight: isMobile ? 'auto' : '400px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: isMobile ? '16px 16px 0 0' : '20px 0 0 20px',
    background: '#1a1a1a',
  };

  const infoStyle = {
    flex: 1.1,
    padding: isSmallMobile ? '1rem' : isMobile ? '1.25rem' : '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: isSmallMobile ? '0.6rem' : '1rem',
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
            src={event.image}
            alt={event.title}
            style={{
              width: '100%',
              height: isMobile ? 'auto' : '100%',
              objectFit: isMobile ? 'contain' : 'cover',
              transition: 'transform 0.5s ease',
              maxHeight: isMobile ? '300px' : 'none',
            }}
          />
          {/* Seamless gradient overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70%',
            // background: 'linear-gradient(to top, #1C1C1C 0%, #1C1C1C 15%, rgba(28,28,28,0.6) 50%, transparent 100%)',
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
              {event.subtitle || "Sports Event"}
            </span>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: isSmallMobile ? '0.5rem' : '0.75rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem',
            }}>
              <h2 style={{
                fontFamily: "'Antonio', sans-serif",
                fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : '2.8rem',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #fff, #ccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                fontWeight: 700,
              }}>
                {event.title}
              </h2>
              {/* Gender Display */}
              {event.gender && (
                <span style={{
                  alignSelf: 'center',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: isSmallMobile ? '0.7rem' : '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}>
                  {event.gender === 'M' ? '♂ Boys' : event.gender === 'F' ? '♀ Girls' : event.gender === 'M/F' ? '♂ Male / ♀ Female' : event.gender}
                </span>
              )}
            </div>
          </div>

          <p style={{ fontSize: isSmallMobile ? '0.85rem' : '1rem', color: '#999', lineHeight: 1.6 }}>
            {event.description}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: isSmallMobile ? '0.6rem' : '1rem',
            marginTop: '0.5rem',
          }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: isSmallMobile ? '0.7rem' : '1rem', borderRadius: isSmallMobile ? '10px' : '12px' }}>
              <span style={{ fontSize: isSmallMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1.2px', fontWeight: 600 }}>Team / Players</span>
              <p style={{ fontSize: isSmallMobile ? '0.85rem' : '1rem', fontWeight: '600', color: '#fff', marginTop: '0.25rem' }}>{event.team}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: isSmallMobile ? '0.7rem' : '1rem', borderRadius: isSmallMobile ? '10px' : '12px' }}>
              <span style={{ fontSize: isSmallMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1.2px', fontWeight: 600 }}>Location</span>
              <p style={{ fontSize: isSmallMobile ? '0.85rem' : '1rem', fontWeight: '600', color: '#fff', marginTop: '0.25rem' }}>{event.location}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: isSmallMobile ? '0.7rem' : '1rem', borderRadius: isSmallMobile ? '10px' : '12px' }}>
              <span style={{ fontSize: isSmallMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1.2px', fontWeight: 600 }}>Time</span>
              <p style={{ fontSize: isSmallMobile ? '0.85rem' : '1rem', fontWeight: '600', color: '#fff', marginTop: '0.25rem' }}>{event.time}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: isSmallMobile ? '0.7rem' : '1rem', borderRadius: isSmallMobile ? '10px' : '12px' }}>
              <span style={{ fontSize: isSmallMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1.2px', fontWeight: 600 }}>Entry Fee</span>
              <p style={{ fontSize: isSmallMobile ? '0.85rem' : '1rem', fontWeight: '600', color: '#fff', marginTop: '0.25rem' }}>{event.fee}</p>
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
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/events.json')
      .then(response => response.json())
      .then(data => {
        setEventsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
        setLoading(false);
      });
  }, []);

  const sportsTags = eventsData.map(e => e.title.toUpperCase());
  // Duplicate tags to ensure seamless scrolling
  const displayTags = [...sportsTags, ...sportsTags, ...sportsTags, ...sportsTags];

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading...</div>;
  }

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
          {eventsData.filter(event =>
            !searchQuery || event.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
                <img draggable="false" src={event.image} alt={event.title} className={styles.eventImage} loading="lazy" />
                <div className={styles.eventOverlay}>
                  <h3 className={styles.eventName}>{event.title}</h3>
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