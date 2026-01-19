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
  'cosplay', 'fun', 'poetry', 'face painting', 'solo song', 'dance', 'essay', 'sketching',
  'concert', 'flash mob', 'film making', 'joy', 'concert', 'dj', 'poetry slam'
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
            Step into the world of FOOTPRINTS 2K26, PSIT Kanpur’s premier 3-day festival where passion, competition, and entertainment collide. We’ve lined up an extraordinary experience featuring everything from sweat-breaking physical sports to the strategic depth of modern e-sports. Designed to ignite your competitive spirit and fuel your love for art, the fest culminates in electrifying performances that will keep your pulse racing. This is your stage to shine, your arena to conquer, and your chance to experience the most thrilling three days of the year. Don't just watch the magic happen—be the heart of it.
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
            <div className={styles.card}>
              <div className={styles.scheduleBg}></div>
              <figure></figure>
              <main>
                <h3 className={styles.cardTitle}>Event Schedule</h3>
                <div className={styles.cardSubtitle}>
                  <div className={styles.desc}>Check out all events</div>
                  <ScheduleIcon style={{ width: '2rem', height: '2rem', marginTop: '1rem' }} />
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
              {coordinators.filter((val, i) => i <= 22).map(val => <li key={val.name}> {val.name}</li>)}
            </ul>
            <ul>
              {coordinators.filter((val, i) => i > 22).map(val => <li key={val.name}> {val.name}</li>)}
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