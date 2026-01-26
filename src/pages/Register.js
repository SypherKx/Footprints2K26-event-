import React from 'react'
import { motion } from 'framer-motion';
import styles from '../styles/Sponsors.module.scss';
import cx from 'classnames';
import SupportLink from '../components/SupportLink';

const Register = () => {
  return (
    <motion.div className={cx(styles.sponsors, 'page-transition', 'container')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header className={cx('page-header', styles['page-header'])}>
        <h1 className='heading'>
          <span>Registration</span>
        </h1>
      </header>

      <main className={styles['main-content']}>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>
          Get ready to participate in the biggest sports fest of the year.
        </p>

        <div className={styles['coming-soon']}>
          <h2 className={styles['big-text']}>Starting Soon...</h2>
          <p className={styles['info-text']}>
            We are currently finalizing the events.
          </p>
        </div>
      </main>

      <div style={{ position: 'absolute', bottom: '2rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SupportLink />
      </div>
    </motion.div>
  )
}

export default Register;