import styles from '../styles/Footer.module.scss';
import cx from 'classnames'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [devTeam, setDevTeam] = useState(false);

  return (
    <footer className='container'>
      <div className={styles.MainFooterContent}>
        {/* Centered Quote */}
        <div className={styles.quoteSection}>
          <p className={styles.quote}>
            FOOTPRINTS is a celebration of passion and perseverance, where every match leaves a mark and every player creates a legacy.
          </p>
        </div>

        {/* Footer Links Section */}
        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h4>Quick Links</h4>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/events">Events</NavLink></li>
              <li><NavLink to="/gallery">Gallery</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h4>FOOTPRINTS'26</h4>
            <ul>
              <li><NavLink to="/sponsors">Our Sponsors</NavLink></li>
              <li><a href="mailto:footprints@psit.ac.in">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.team}>
          <span>
            Handcrafted with 🖤 by
            <button className={cx(styles.devteamBtn, {
              [styles.on]: devTeam
            })} onClick={(e) => { e.preventDefault(); setDevTeam(!devTeam) }}>
              Team4One
            </button>
          </span>
          <span className={styles.sep}>~</span>
          <span>&copy; 2K26 FOOTPRINTS PSIT KANPUR</span>
          <span className={styles.sep}>~</span>
          <span>by me <a href="https://github.com/SypherKx" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>SypherKx</a></span>
          {devTeam && (
            <ul className={styles.devteam}>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/SypherKx">@KaraPratap Singh</a></li>
            </ul>
          )}
        </div>
      </div>
    </footer >
  )
}

export default Footer