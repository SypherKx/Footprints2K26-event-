import { NavLink } from 'react-router-dom';
import styles from '../styles/Events.module.scss';
import cx from 'classnames';
import { events } from '../data/data';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SupportLink from '../components/SupportLink';

import { ReactComponent as RegisterIcon } from '../media/icons/register.svg';
import TrophyIcon from '../media/icons/trophy-icon.png';

const timeCompare = (a, b) => {
  if (events[a].time < events[b].time) {
    return -1;
  } else if (events[a].time === events[b].time) {
    return 0;
  } else {
    return 1;
  }
}

const Events = ({ user }) => {
  const eventFigureWrapper = useRef(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [activeEventId, setActiveEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [scheduleConfig, setScheduleConfig] = useState({
    days: [
      { id: 0, label: 'Mon.' },
      { id: 1, label: 'Tue.' },
      { id: 2, label: 'Wed.' },
      { id: 3, label: 'Thu.' }
    ],
    eventDates: 'Feb. 16-25',
    year: '2K26'
  });

  // Fetch schedule config from JSON
  useEffect(() => {
    fetch('/data/schedule.json')
      .then(res => res.json())
      .then(data => setScheduleConfig(data))
      .catch(err => console.warn('Could not load schedule config:', err));
  }, []);

  useEffect(() => {
    const wrapper = eventFigureWrapper.current;
    const figures = document.querySelectorAll(`.${styles['current-figure']}`);

    const stickEventFigure = () => {
      const stickFigure = (el, figure) => {
        if (!el || !figure) return;
        if (el.getBoundingClientRect().top > (window.innerHeight - figure.getBoundingClientRect().width)) {
          figure.style.position = 'absolute';
          figure.style.top = '0';
        } else if (el.getBoundingClientRect().bottom > window.innerHeight) {
          figure.style.position = 'fixed';
          figure.style.bottom = '0';
          figure.style.top = 'unset';
        } else {
          figure.style.position = 'absolute';
          figure.style.bottom = '0';
          figure.style.top = 'unset';
        }
      }

      figures.forEach(figure => {
        stickFigure(wrapper, figure);
      })
    }

    if (window.innerWidth > 1000) {
      window.addEventListener('scroll', stickEventFigure)
    }

    return () => {
      window.removeEventListener('scroll', stickEventFigure);
    }
  }, [currentDay])


  const selectedEvent = selectedEventId ? events[selectedEventId] : null;

  // Find the day object that matches the currentDay ID
  const activeDaySchedule = scheduleConfig.days.find(d => d.id === currentDay) || { events: [] };

  console.log('Current Day ID:', currentDay);
  console.log('Active Day Schedule:', activeDaySchedule);


  return (
    <>

      <motion.div className={cx(styles.events, 'page-transition', 'container')}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
      >
        <header className={cx('page-header', styles['page-header'])}>
          <h1 className='heading'>
            <span>Event</span>
            <span>Schedule</span>
          </h1>
          <div className={cx(styles['header-btn-wrapper'])}>
            <NavLink to='/register' className={cx('btn', styles['intro-header-btn'])}>
              <span className={cx('btn-subtitle', styles['intro-btn-subtitle'])}>Registrations Open</span>
              <span className={cx('btn-text', styles['intro-btn-text'])}>Register Now</span>
              <RegisterIcon />
            </NavLink>
          </div>
          <div className={cx('subtitle', styles['header-subtitle'])}>
            <h2>{scheduleConfig.eventDates}</h2>
            <div>{scheduleConfig.year}</div>
          </div>
        </header>
        <main className={cx(styles['main-content'])}>
          <nav className={styles['schedule-nav']}>
            <ul className={styles.tabs}>
              {scheduleConfig.days.map((day) => (
                <ScheduleNavBtn key={day.id}
                  currentDay={currentDay} day={day.id}
                  label={day.label} handleDayChange={setCurrentDay} />
              ))}
            </ul>
          </nav>
          <section ref={eventFigureWrapper} className={styles['event-list-wrapper']}>
            <div className={cx(styles['event-list-header'], styles['event-list'])}>
              <div className={styles['event-li']}>
                <div className={styles['event-li-inner']} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                  <div className={styles.time} style={{ fontWeight: 'bold', fontSize: '1.2rem', order: 1 }}>Time</div>
                  <div className={styles.title} style={{ fontWeight: 'bold', order: 2 }}><h4>Sport</h4></div>
                  <div className={styles.venue} style={{ fontWeight: 'bold', fontSize: '1.2rem', order: 3 }}>Venue</div>
                </div>
              </div>
            </div>
            <ul className={styles['event-list']}>
              {(activeDaySchedule.events || []).map(event => (
                <EventLI key={event.id} {...event} handleHover={setActiveEventId} />
              ))}
            </ul>
            <div className={styles['event-figures']}>
              <div className={styles.figures}>
                {(activeDaySchedule.events || []).map(event => (
                  <EventFigure key={event.id} {...event} isActive={activeEventId === event.id} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <div className='container'>
          <SupportLink />
        </div>
      </motion.div>

    </>
  )
}

const ScheduleNavBtn = ({ day, currentDay, handleDayChange, label }) => (
  <li className={cx(styles.tab, { [styles.active]: currentDay === day })}>
    <button
      onClick={(e) => { e.preventDefault(); handleDayChange(day) }}
      className={styles['tab-btn']}
      type='button'
    >{label}</button>
  </li>
)

const EventLI = ({ id, title, type, isRegistrationOpen, venue, time, handleHover }) => {
  return (
    <li className={cx(styles['event-li'])}>
      <article
        className={styles['event-li-inner']}
        onMouseOut={e => { handleHover(null) }}
        onMouseOver={e => { handleHover(id) }}
      >
        <div className={styles.title}>
          {type === 'Contest'
            ? <p className={cx({ [styles.closed]: !isRegistrationOpen })}>{isRegistrationOpen ? 'Registrations open!' : 'Registrations closed!'}</p>
            : <p>{type} </p>}
          <h4>{title}</h4>
        </div>
        <div className={styles.venue}>
          <p>{venue}</p>
        </div>
        <div className={styles.time}>
          <p>{time}</p>
        </div>
      </article>
    </li>
  )
}

const EventFigure = ({ id, title, figureSrc, isActive = false }) => (
  figureSrc && <article key={id}
    className={cx(styles['current-figure'], { [styles.active]: isActive })}>
    <figure className={styles['img-wrapper']}>
      <img draggable="false" alt={title} src={figureSrc} loading="lazy" decoding="async" />
    </figure>
  </article>
)

const EventModal = ({ event, onClose }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 400);

  // Handle resize for responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 400);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if event has both genders
  const hasBothGenders = event.gender && event.gender.includes('M') && event.gender.includes('F');

  // Get registration link based on selected gender
  const getRegisterLink = () => {
    if (selectedGender === 'M' && event.maleLink) return event.maleLink;
    if (selectedGender === 'F' && event.femaleLink) return event.femaleLink;
    const params = new URLSearchParams();
    params.set('event', event.id);
    if (selectedGender) params.set('gender', selectedGender);
    return `/register?${params.toString()}`;
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      className="event-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isSmallMobile ? '10px' : isMobile ? '16px' : '40px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Modal Card */}
      <motion.div
        className="event-modal-card"
        style={{
          background: '#1a1a1a',
          borderRadius: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
          width: '100%',
          maxWidth: isSmallMobile ? '95vw' : '520px',
          maxHeight: isSmallMobile ? '95vh' : isMobile ? '90vh' : '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          position: 'relative',
        }}
        initial={{ y: 60, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
        >
          ✕
        </button>

        {/* Image Section - only show if there's an image */}
        {event.figureSrc && event.figureSrc.length > 0 && (
          <div
            style={{
              width: '100%',
              height: isSmallMobile ? '120px' : isMobile ? '150px' : '220px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
            }}
          >
            <img
              src={event.figureSrc}
              alt={event.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
              }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, #1a1a1a 0%, transparent 50%)',
            }} />
          </div>
        )}

        {/* Content Section */}
        <div
          style={{
            padding: isSmallMobile ? '14px' : isMobile ? '18px' : '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallMobile ? '10px' : '16px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* Badge + Title Row */}
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: isSmallMobile ? '4px 10px' : '6px 14px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #974B60 0%, #b85a72 100%)',
                color: '#fff',
                fontSize: isSmallMobile ? '9px' : '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                marginBottom: isSmallMobile ? '8px' : '12px',
              }}
            >
              {event.type}
            </span>
            <h2
              style={{
                fontFamily: "'Antonio', sans-serif",
                fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.6rem' : '2.2rem',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {event.title}
            </h2>
          </div>

          {/* Description */}
          {event.desc && (
            <p style={{
              fontSize: isSmallMobile ? '12px' : '14px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {event.desc}
            </p>
          )}

          {/* Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: isSmallMobile ? '8px' : '12px',
              background: 'rgba(255,255,255,0.04)',
              padding: isSmallMobile ? '12px' : '16px',
              borderRadius: isSmallMobile ? '10px' : '14px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {[
              { label: 'Category', value: event.category || 'Girls / Boys' },
              { label: 'Venue', value: event.venue || 'TBA' },
              { label: 'Time', value: event.time || 'TBA' },
              { label: 'Price', value: event.price || 'TBA' },
            ].map((item, i) => (
              <div key={i}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#974B60', letterSpacing: '1px', fontWeight: '600' }}>
                  {item.label}
                </span>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: '4px 0 0 0' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Gender Toggle Switch */}
          {event.isRegistrationOpen && hasBothGenders && (
            <div>
              <span style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                color: '#974B60',
                letterSpacing: '1px',
                fontWeight: '600',
                display: 'block',
                marginBottom: '10px',
              }}>
                Select Category
              </span>
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '4px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Sliding Indicator */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '4px',
                    width: 'calc(50% - 4px)',
                    height: 'calc(100% - 8px)',
                    background: 'linear-gradient(135deg, #974B60 0%, #b85a72 100%)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(151, 75, 96, 0.4)',
                  }}
                  animate={{
                    left: selectedGender === 'F' ? 'calc(50%)' : '4px',
                    opacity: selectedGender ? 1 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
                {/* Male Button */}
                <button
                  onClick={() => setSelectedGender('M')}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'transparent',
                    color: selectedGender === 'M' ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ♂ Boys
                </button>
                {/* Female Button */}
                <button
                  onClick={() => setSelectedGender('F')}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'transparent',
                    color: selectedGender === 'F' ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ♀ Girls
                </button>
              </div>
            </div>
          )}

          {/* Register Button */}
          {event.isRegistrationOpen && (
            <a
              href="https://www.ignitia.in/events"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                // Force open in new tab
                window.open('https://www.ignitia.in/events', '_blank');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: isSmallMobile ? '12px 16px' : '15px 20px',
                background: 'linear-gradient(135deg, #974B60 0%, #b85a72 100%)',
                border: 'none',
                borderRadius: isSmallMobile ? '10px' : '12px',
                color: '#fff',
                fontSize: isSmallMobile ? '12px' : '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                textDecoration: 'none',
                letterSpacing: '0.8px',
                boxShadow: '0 8px 25px rgba(151, 75, 96, 0.35)',
                cursor: 'pointer',
                marginTop: '4px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(151, 75, 96, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(151, 75, 96, 0.35)'; }}
            >
              <img src={TrophyIcon} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              REGISTER NOW
            </a>
          )}

          {/* Closed Registration Message */}
          {!event.isRegistrationOpen && (
            <div style={{
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}>
              Registration Closed
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Events;