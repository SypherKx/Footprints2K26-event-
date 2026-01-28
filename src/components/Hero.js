import { useEffect } from "react";
import { ReactComponent as ScrollDownIcon } from '../media/icons/down.svg';
import HeroVideo from '../media/new-background-compressed.mp4';
// import HeroImage from '../media/hero-image.png';
import FootprintsLogo from '../media/footprints-font.webp';
import PsitLogo from '../media/psit-logo-new.png';
import Logo2K26 from '../media/2k26-stylized.png';
import styles from './Hero.module.scss';

const Hero = () => {

  useEffect(() => {
    const navEl = document.getElementById('nav');
    const heroEl = document.getElementById('hero');
    const coordinatorNames = document.getElementById('coordinatorsList');

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

  return (
    <div className={styles.hero} id="hero">
      <div className={styles.grain}></div>
      <video className={styles['hero-bg']} autoPlay={true} muted={true} loop={true} playsInline={true} preload="auto" poster={Logo2K26}>
        <source src={HeroVideo} />
      </video>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles['logo-container']}>

            {/* PSIT Logo - Above */}
            <img
              src={PsitLogo}
              alt="PSIT Logo"
              className={styles['psit-logo']}
            />

            {/* Main Footprints Logo */}
            <img
              src={FootprintsLogo}
              alt="Footprints 2K26"
              className={styles['main-logo']}
            />

            {/* 2K26 Logo - Below and Right */}
            <img
              src={Logo2K26}
              alt="2K26"
              className={styles['logo-2k26']}
            />
          </div>
        </div>
      </div>
      <div className={styles.scrollDown} aria-hidden='true'>
        <ScrollDownIcon />
      </div>
    </div>
  )
}

export default Hero;