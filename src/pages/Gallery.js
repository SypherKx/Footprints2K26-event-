import { useState, useEffect } from 'react';
import styles from '../styles/Gallery.module.scss';
import cx from 'classnames';
import { motion } from 'framer-motion';
import DomeGallery from '../components/DomeGallery/DomeGallery';

const tags = [
  'MOMENTS', 'VICTORY', 'PASSION', 'GLORY', 'TEAM', 'SPIRIT', 'ACTION', 'FOCUS',
  'TRIUMPH', 'RECORDS', 'HISTORY', 'LEGENDS', 'ENERGY', 'MEMORIES', 'CHAMPIONS'
]


const imageFiles = [
  'IMGL2178.JPG', 'IMGL2959.JPG', 'IMGL2983.JPG', 'IMGL3052.JPG', 'IMGL3107.JPG',
  'IMGL3164.JPG', 'IMGL3190.JPG', 'IMGL3196.JPG', 'IMGL3219.JPG', 'IMGL3226.JPG',
  'IMGL3255.JPG', 'IMGL3268.JPG', 'IMGL3286.JPG', 'IMGL3291.JPG', 'IMGL3297.JPG',
  'IMGL3306.JPG', 'IMGL3332.JPG', 'IMGL3372.JPG', 'IMGL3374.JPG', 'IMGL3487.JPG',
  'IMGL3496.JPG', 'IMGL3507.JPG', 'IMGL3574.JPG', 'IMGL3730.JPG', 'IMGL3749.JPG',
  'IMGL3750.JPG', 'IMGL3783.JPG', 'IMGL3800.JPG', 'IMGL3807.JPG', 'IMGL3814.JPG',
  'IMGL3857.JPG', 'IMGL3864.JPG', 'IMGL3879.JPG', 'IMGL3883.JPG', 'IMGL3888.JPG',
  'IMGL3895.JPG', 'IMGL3901.JPG', 'IMGL3907.JPG', 'IMGL3913.JPG', 'IMGL3942.JPG',
  'IMGL3946.JPG', 'IMGL3950.JPG', 'IMGL3973.JPG', 'IMGL3984.JPG', 'IMGL3997.JPG',
  'IMGL4008.JPG', 'IMGL4014.JPG', 'IMGL4022.JPG', 'IMGL4030.JPG', 'IMGL4036.JPG',
  'IMGL4059.JPG', 'IMGL4075.JPG', 'IMGL4083.JPG', 'IMGL4099.JPG'
];

const shuffledImages = imageFiles
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const galleryImages = shuffledImages.map((filename, index) => ({
  src: `/media/gallery/${filename}`,
  alt: `Gallery Moment ${index + 1}`
}));

const Gallery = ({ user }) => {
  const [segments, setSegments] = useState(28); // Reduced from 35 for better performance

  useEffect(() => {
    const handleResize = () => {
      // Fewer segments = bigger tiles, better performance
      if (window.innerWidth < 600) {
        setSegments(22); // Bigger tiles on mobile
      } else {
        setSegments(28); // Bigger tiles on desktop (was 35)
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div className={cx(styles.events, 'page-transition', 'container')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <header className={cx('page-header', styles['page-header'])} style={{ height: 'auto', minHeight: 'auto', paddingBottom: '2rem', paddingTop: '120px' }}>
        <div className={styles['intro-bg']}>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
        </div>

        <h1 className={cx('heading', styles['gallery-heading'])} style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '10px', zIndex: 10, position: 'relative' }}>
          <span>Gallery</span>
        </h1>
        <p className={styles['gallery-subtitle']}>
          Where moments turn into memories and players become legends.<br />
          Relive the glory of the past.
        </p>
      </header>

      <main className={cx(styles['main-content'])} style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <div style={{ width: '100%', height: '70vh', position: 'relative' }}>
          <DomeGallery
            images={galleryImages.length > 0 ? galleryImages : undefined}
            grayscale={false}
            overlayBlurColor="transparent"
            segments={segments}
          />
        </div>
      </main>
    </motion.div>
  )
}

export default Gallery;