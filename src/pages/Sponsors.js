import React from 'react'
import { motion } from 'framer-motion';
import styles from '../styles/Sponsors.module.scss';
import cx from 'classnames';

const Sponsors = () => {
    return (
        <motion.div className={cx(styles.sponsors, 'page-transition', 'container')}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
        >
            <header className={cx('page-header', styles['page-header'])}>
                <h1 className='heading'>
                    <span>Our Sponsors</span>
                </h1>
            </header>

            <main className={styles['main-content']}>
                <div className={styles.divider}></div>
                <p className={styles.subtitle}>
                    We'll be revealing sponsors soon. Stay tuned.
                </p>

                <div className={styles['coming-soon']}>
                    <h2 className={styles['big-text']}>Secure Your Spot!</h2>
                    <p className={styles['info-text']}>
                        Want to become a sponsor? Get in touch with us to showcase your brand at FOOTPRINTS 2K26.
                    </p>
                </div>
            </main>
        </motion.div>
    )
}

export default Sponsors;
