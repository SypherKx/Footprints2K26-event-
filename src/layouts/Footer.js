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
              <li><NavLink to="/register">Events</NavLink></li>

            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h4>Contact Us</h4>
            <ul>

              <li><a href="https://chat.whatsapp.com/JsCM0ujhOAdAo4IxaV8EgO" target="_blank" rel="noreferrer">Whatsapp</a></li>
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
              Team United
            </button>
          </span>
          <span className={styles.sep}>~</span>
          <span>&copy; 2K26 FOOTPRINTS PSIT KANPUR</span>
          {devTeam && (
            <ul className={styles.devteam}>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/SypherKx">@Karan Pratap Singh</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/Samaruta-batto">@Samarth Bhatt</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/divyansh-vijay">@Divyansh Vijay</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/SuryanshSharan">@Suryansh Sharan</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/ArpitBajpai">@Arpit Bajpai</a></li>
            </ul>
          )}
        </div>
      </div>
    </footer >
  )
}

export default Footer