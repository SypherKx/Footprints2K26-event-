import { useState, useEffect } from 'react';
import styles from '../styles/Gallery.module.scss';
import cx from 'classnames';
import { motion } from 'framer-motion';
import DomeGallery from '../components/DomeGallery/DomeGallery';

const tags = [
  'MOMENTS', 'VICTORY', 'PASSION', 'GLORY', 'TEAM', 'SPIRIT', 'ACTION', 'FOCUS',
  'TRIUMPH', 'RECORDS', 'HISTORY', 'LEGENDS', 'ENERGY', 'MEMORIES', 'CHAMPIONS'
]

// Dynamically import all images from the gallery folder
function importAll(r) {
  try {
    return r.keys().map(r);
  } catch (e) {
    console.warn("Gallery images not found or require.context failed", e);
    return [];
  }
}

// Use require.context to load images
// Note: This relies on Webpack (standard in Create React App)
const rawImages = importAll(require.context('../media/gallery', false, /\.(png|jpe?g|svg|JPG|JPEG|PNG|SVG)$/));

// Shuffle images for random placement
const shuffledImages = rawImages
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const galleryImages = shuffledImages.map((img, index) => ({
  src: img,
  alt: `Gallery Moment ${index + 1}`
}));

const Gallery = ({ user }) => {
  const [segments, setSegments] = useState(35);

  useEffect(() => {
    const handleResize = () => {
      // Increase segments on smaller screens to make items closer (reduce spacing)
      if (window.innerWidth < 600) {
        setSegments(48); // Closer boxes on mobile
      } else {
        setSegments(35); // Default spacing on desktop
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