import styles from '../styles/Footer.module.scss';
import bye from '../media/bye.png';
import cx from 'classnames'
import { ReactComponent as MailIcon } from '../media/icons/mail.svg';
import { ReactComponent as WAIcon } from '../media/icons/wa.svg';
import { useState } from 'react';

const Footer = () => {
  const [devTeam, setDevTeam] = useState(false);

  return (
    <footer className='container'>
      <div className={styles.MainFooterContent}>
        <div className={cx(styles.footerItems)} id="footerContent">
          <div className={styles.QuotesContainer}>
            <div className={styles.quotes}>FOOTPRINTS is a celebration of passion and perseverance, where every match leaves a mark and every player creates a legacy.</div>
          </div>

          <div>
            <div className={styles.LogoContainer}>
              {/* <img src={logo} alt=""></img> */}
              <div className={styles.title}>FOOTPRINTS'26</div>
            </div>
          </div>
          <div className={styles['sponsor-wrapper']}>
            <div className={styles.sponsor}>
              <p style={{ textAlign: "center", fontSize: '1.2rem' }}>Our Sponsors</p>
              <div className={styles.sponsorImgs}>
                {/* <img className={styles.sponsors} src={echoOfArunachal} alt=""></img>
                <img className={styles.sponsors} src={hotelObsidianBlue} alt=""></img> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerItems}>
          <p>Contact us</p>
          <div style={{ height: '50px' }}></div>{/* Spacer since social links are gone */}

          <div className={styles.thanks}>
            <span>Thank you</span>
            <br />
            <span>for your support</span>
          </div>
          <div>
            <img src={bye} style={{ height: "160px", width: "auto" }} alt=""></img>
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
          {devTeam && (
            <ul className={styles.devteam}>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/tripathics">@tripathics</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/pursottam6003">@pursottam6003</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/daknya">@daknya</a></li>
            </ul>
          )}
        </div>
      </div>
    </footer >
  )
}

export default Footer