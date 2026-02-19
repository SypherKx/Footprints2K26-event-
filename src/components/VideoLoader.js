import React from 'react';
import styles from './VideoLoader.module.scss';
import { motion } from 'framer-motion';

const VideoLoader = ({ progress = 0 }) => {
    return (
        <motion.div
            className={styles.loaderContainer}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.05,
                transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }}
        >
            {/* Floating particles */}
            <div className={styles.particles}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={styles.particle} />
                ))}
            </div>

            {/* Main text */}
            <div className={styles.textWrapper}>
                {/* Background text (outline) */}
                <motion.span
                    className={styles.textBackground}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    FOOTPRINTS
                </motion.span>

                {/* Foreground text (gradient fill) - clips based on progress */}
                <motion.span
                    className={styles.textForeground}
                    style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    FOOTPRINTS
                </motion.span>
            </div>

            {/* Loading info */}
            <motion.div
                className={styles.loadingInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Progress bar */}
                <div
                    className={styles.progressBar}
                    style={{ '--progress': `${progress}%` }}
                >
                    <motion.div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #974B60, #c76b83)',
                            borderRadius: '10px',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Percentage */}
                <motion.span
                    className={styles.percentage}
                    key={Math.round(progress)}
                    initial={{ scale: 1.1, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {Math.round(progress)}%
                </motion.span>

                {/* Loading text */}
                <span className={styles.loadingText}>Loading Experience</span>
            </motion.div>
        </motion.div>
    );
};

export default VideoLoader;
