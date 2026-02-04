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
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const tags = [
  'basketball', 'football', 'kabaddi', 'volleyball', 'badminton', 'chess', 'carrom',
  'kho-kho', 'sprints', 'throws', 'jumps', 'tug of war', 'table tennis', 'athletics', 'sports'
]

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animated Section Component
const AnimatedSection = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.section>
  );
};

const Home = ({ user }) => {
  const introRef = useRef(null);
  const highlightsRef = useRef(null);
  const teamRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />

      {/* Intro Section */}
      <motion.section
        ref={introRef}
        className={cx(styles["intro-section"], styles['home-section'])}
        initial={{ opacity: 0 }}
        animate={introInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles['intro-bg']}>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
        </div>
        <motion.header
          className={cx(styles.introContent, styles.sectionHeader, 'container')}
          variants={sectionVariants}
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
        >
          <motion.h2
            className={styles.heading}
            variants={headingVariants}
          >
            <motion.span
              style={{ marginRight: '3ch' }}
              initial={{ opacity: 0, x: -30 }}
              animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              FOOTPRINTS
            </motion.span>
            <motion.span
              className={styles._ar}
              initial={{ opacity: 0, x: 30 }}
              animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              2K26
            </motion.span>





          </motion.h2>
          <motion.p
            className={styles.subtitle}

            variants={textRevealVariants}
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            transition={{ delay: 0.5 }}
          >
            Prepare for a 10-day eruption of energy, adrenaline, and pure passion that will redefine your college experience. We are blurring the lines between the physical and the virtual, bringing you a massive showdown that spans from the roar of the cricket pitch to the intensity of the gaming console. Whether you bleed for the sport or thrive on the strategy, this is your stage to shine and your arena to conquer. The vibe is unmatched, the competition is fierce, and the glory is waiting. <strong>Bring your game, bring your squad, and let's make history.</strong>
          </motion.p>
          <motion.div
            className={styles['header-btn-wrapper']}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <NavLink to='/gallery' className={cx('btn', styles['intro-header-btn'])}>
              <span className={cx('btn-subtitle', styles['intro-btn-subtitle'])}>FOOTPRINTS'26 in reels</span>
              <span className={cx('btn-text', styles['intro-btn-text'])}>Gallery</span>
              <LinkIcon />
            </NavLink>
          </motion.div>
        </motion.header>
      </motion.section>

      {/* Highlights Section */}
      <motion.section
        ref={highlightsRef}
        className={cx(styles['home-section'], 'container', styles.highlights)}
        initial={{ opacity: 0 }}
        animate={highlightsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.header
          className={styles.sectionHeader}
          variants={headingVariants}
          initial="hidden"
          animate={highlightsInView ? "visible" : "hidden"}
        >
          <h2 className={styles.heading}>
            <span>Highlights</span>
          </h2>
        </motion.header>

        <main>
          <motion.div
            className={styles.hlgallery}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={highlightsInView ? "visible" : "hidden"}
          >
            {highlights.map((id, index) => (
              <motion.div key={id} variants={cardVariants}>
                <HighlightCard user={user} {...events[id]} />
              </motion.div>
            ))}
            <motion.div
              className={cx(styles.card, styles.scheduleCard)}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>
        </main>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className={cx(styles['home-section'], styles.coordinators)}
        initial={{ opacity: 0 }}
        animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.header
          className={cx(styles.sectionHeader, 'container')}
          variants={sectionVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          <motion.h2
            className={styles.heading}
            variants={headingVariants}
          >
            <motion.span
              style={{ marginRight: '3ch' }}
              initial={{ opacity: 0, x: -30 }}
              animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our
            </motion.span>
            <motion.span
              className={styles._ar}
              initial={{ opacity: 0, x: 30 }}
              animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Team
            </motion.span>
          </motion.h2>
          <motion.div
            className={cx(styles.subtitle, 'container')}
            id='coordinatorsList'
            variants={staggerContainerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            <ul>
              {coordinators.map((val, index) => (
                <motion.li
                  key={val.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                >
                  {val.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.header>
        {/* <main>
          <Carousel cardsList={mainCoordinators} />
        </main> */}
      </motion.section>
    </motion.div>
  )
}

export default Home;
