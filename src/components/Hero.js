import { useState, useEffect, useRef } from "react";
import { ReactComponent as ScrollDownIcon } from '../media/icons/down.svg';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import HeroVideoMp4 from '../media/new-background-compressed.mp4';
import HeroVideoWebM from '../media/new-background.webm';
import HeroPoster from '../media/video-poster.jpg';
// import HeroImage from '../media/hero-image.png';
import FootprintsLogo from '../media/footprints-font.webp';
import PsitLogo from '../media/psit-logo-new.png';
import Logo2K26 from '../media/2k26-stylized.png';
import styles from './Hero.module.scss';
import VideoLoader from './VideoLoader';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for staggered logo entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const logoVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2,
      duration: 0.5
    }
  },
  bounce: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  // Handle input for parallax (unchanged)
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // --- Optimistic Loader Logic ---
  const [isReady, setIsReady] = useState(false);

  // 1. Synthetic Progress Timer
  useEffect(() => {
    // If ready, jump to 100% immediately
    if (isReady) {
      setLoadProgress(100);
      return;
    }

    // Otherwise increment slowly up to 90%
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        // Random increment between 2-8%
        const inc = Math.random() * 6 + 2;
        const next = prev + inc;
        // Stall at 90% until isReady becomes true
        return next > 90 ? 90 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isReady]);

  // 2. Max Wait Time Fallback (2.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 3. Handle Completion
  useEffect(() => {
    if (loadProgress >= 100) {
      // Small buffer before hiding loader for smoothness
      const exitTimer = setTimeout(() => {
        setIsLoading(false);
        // Trigger content animations
        setTimeout(() => setShowContent(true), 300);
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [loadProgress]);

  // Video ready handler
  const handleCanPlay = () => {
    setIsReady(true);
  };
  // -------------------------------

  // Lock scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isLoading]);



  useEffect(() => {
    const navEl = document.getElementById('nav');
    const heroEl = document.getElementById('hero');
    const coordinatorNames = document.getElementById('coordinatorsList');

    // Attempt to play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }

    const parallaxAnimate = () => {
      // parallax animate coordinators
      if (coordinatorNames) {
        let coordNamesTopOffset = coordinatorNames.getBoundingClientRect().top;
        const speed = 0.04;
        coordinatorNames.style.transform = 'translate3d(0, ' + speed * coordNamesTopOffset.toFixed(3) + 'px, 0)';
      }
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navEl.style.position = 'absolute';
          navEl.style.top = '100vh';
        } else {
          navEl.style.position = 'fixed';
          navEl.style.top = '0';
          // Auto-mute audio when hero is not visible (user scrolled down)
          if (videoRef.current && !videoRef.current.muted) {
            videoRef.current.muted = true;
            setIsMuted(true);
          }
        }
      })
    })

    if (heroEl) observer.observe(heroEl);
    window.addEventListener('scroll', parallaxAnimate);

    return () => {
      window.removeEventListener('scroll', parallaxAnimate);
      observer.disconnect()
      navEl.style.position = 'fixed';
      navEl.style.top = '0';
    }
  }, [])

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  }

  return (
    <>
      {/* Video Loader with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <VideoLoader progress={loadProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={heroRef}
        className={styles.hero}
        id="hero"
        onClick={toggleAudio}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.grain}></div>
        <video
          ref={videoRef}
          draggable="false"
          className={styles['hero-bg']}
          autoPlay={true}
          muted={isMuted}
          loop={true}
          playsInline={true}
          preload="auto"
          poster={HeroPoster}
          onCanPlayThrough={handleCanPlay}
        >
          <source src={HeroVideoWebM} type="video/webm" />
          <source src={HeroVideoMp4} type="video/mp4" />
        </video>
        <div className={styles.content}>
          <motion.div
            className={styles.logo}
            variants={containerVariants}
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className={styles['logo-container']} style={{ transformStyle: 'preserve-3d' }}>

              {/* PSIT Logo - Above (front layer) */}
              <motion.img
                variants={logoVariants}
                draggable="false"
                src={PsitLogo}
                alt="PSIT Logo"
                className={styles['psit-logo']}
                fetchPriority="high"
                loading="eager"
                style={{
                  transform: `translateZ(60px) translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
              />

              {/* Main Footprints Logo (middle layer) */}
              <motion.img
                variants={logoVariants}
                draggable="false"
                src={FootprintsLogo}
                alt="Footprints 2K26"
                className={styles['main-logo']}
                fetchPriority="high"
                loading="eager"
                style={{
                  transform: `translateZ(30px) translateX(${mousePosition.x * 8}px) translateY(${mousePosition.y * 8}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
              />

              {/* 2K26 Logo - Below (back layer) */}
              <motion.img
                variants={logoVariants}
                draggable="false"
                src={Logo2K26}
                alt="2K26"
                className={styles['logo-2k26']}
                style={{
                  transform: `translateZ(10px) translateX(${mousePosition.x * 4}px) translateY(${mousePosition.y * 4}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Audio Toggle Button */}
        <motion.button
          className={styles.audioControl}
          onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.button>

        <motion.div
          className={styles.scrollDown}
          aria-hidden='true'
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate={showContent ? ["visible", "bounce"] : "hidden"}
        >
          <ScrollDownIcon />
        </motion.div>
      </div>
    </>
  )
}

export default Hero;
