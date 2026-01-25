import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Home.module.scss';

import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';
import { ReactComponent as LinkIcon } from '../media/icons/link.svg';
import Carousel from '../components/Carousel';
import HighlightCard from '../components/HighlightCard';

import { events, highlights } from '../data/data';
import { mainCoordinators, coordinators } from '../data/data'
import Hero from '../components/Hero';
import { motion } from 'framer-motion'

const tags = [
  'basketball', 'football', 'kabaddi', 'volleyball', 'badminton', 'chess', 'carrom',
  'kho-kho', 'sprints', 'throws', 'jumps', 'tug of war', 'table tennis', 'athletics', 'sports'
]

const Home = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <section className={cx(styles["intro-section"], styles['home-section'])}>
        <div className={styles['intro-bg']}>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
        </div>
        <header className={cx(styles.introContent, styles.sectionHeader, 'container')}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>FOOTPRINTS</span>
            <span className={styles._ar}>2K26</span>
          </h2>
          <p className={styles.subtitle}>
            Prepare for a 10-day eruption of energy, adrenaline, and pure passion that will redefine your college experience. We are blurring the lines between the physical and the virtual, bringing you a massive showdown that spans from the roar of the cricket pitch to the intensity of the gaming console. Whether you bleed for the sport or thrive on the strategy, this is your stage to shine and your arena to conquer. The vibe is unmatched, the competition is fierce, and the glory is waiting. <strong>Bring your game, bring your squad, and let's make history.</strong>
          </p>
          <div className={styles['header-btn-wrapper']}>
            <NavLink to='/gallery' className={cx('btn', styles['intro-header-btn'])}>
              <span className={cx('btn-subtitle', styles['intro-btn-subtitle'])}>FOOTPRINTS'26 in reels</span>
              <span className={cx('btn-text', styles['intro-btn-text'])}>Gallery</span>
              <LinkIcon />
            </NavLink>
          </div>
        </header>
      </section>

      <section className={cx(styles['home-section'], 'container', styles.highlights)}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.heading}>
            <span>Highlights</span>
          </h2>
        </header>

        <main>
          <div className={styles.hlgallery}>
            {highlights.map(id => <HighlightCard user={user} key={id} {...events[id]} />)}
            <div className={cx(styles.card, styles.scheduleCard)}>
              <div className={styles.scheduleBg}></div>
              <figure></figure>
              <main>
                <h3 className={styles.cardTitle}>Event Schedule</h3>
                <div className={styles.cardSubtitle}>
                  <div className={styles.desc}>Check out all events</div>
                  <ScheduleIcon style={{ width: '2rem', height: '2rem', marginTop: '1rem', fill: 'white' }} />
                </div>
              </main>
              <NavLink to='/events' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 30 }} />
            </div>
          </div>
        </main>
      </section>

      <section className={cx(styles['home-section'], styles.coordinators)}>
        <header className={cx(styles.sectionHeader, 'container')}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Our</span>
            <span className={styles._ar}>Team</span>
          </h2>
          <div className={cx(styles.subtitle, 'container')} id='coordinatorsList'>
            <ul>
              {coordinators.map(val => <li key={val.name}> {val.name}</li>)}
            </ul>
          </div>
        </header>
        <main>
          <Carousel cardsList={mainCoordinators} />
        </main>
      </section>
    </motion.div>
  )
}

export default Home;