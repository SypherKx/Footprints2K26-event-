import { NavLink } from 'react-router-dom';
import styles from './HighlightCard.module.scss';
import { motion } from 'framer-motion';

const HighlightCard = ({ figureSrc, title, desc, type, isRegistrationOpen, user }) => (
  <motion.article
    className={styles.card}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.figure
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <img draggable="false" alt='' src={figureSrc} loading="lazy" decoding="async" />
    </motion.figure>
    <main>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardSubtitle}>
        <div className={styles.desc}>{desc}</div>
        {type === 'Contest' && isRegistrationOpen ? (
          <div className={styles.type}>Registrations open</div>
        ) : <div className={styles.type}>{type}</div>}
      </div>
    </main>
    {type === 'Contest' && isRegistrationOpen && (
      user ? <NavLink className={styles.link} to='/register'>Register</NavLink>
        : <NavLink className={styles.link} to='/signup'>Register</NavLink>
    )}
  </motion.article>
)

export default HighlightCard;

