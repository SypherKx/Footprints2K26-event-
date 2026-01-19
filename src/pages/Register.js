import React from 'react'
import { motion } from 'framer-motion';
import SupportLink from '../components/SupportLink';
import { ReactComponent as LinkIcon } from '../media/icons/link.svg';
import styles from '../styles/Form.module.scss';
import cx from 'classnames';
import { events } from '../data/data';

const Register = () => {
  return (
    <motion.div className={cx(styles['form-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className='container'>
        <header className={cx('page-header', 'form-header')}>
          <h2 className='heading'>Register for events</h2>
        </header>

        <div className={styles['form-box']}>
          <div className={cx(styles['form-fields'], styles['slots-wrapper'])}>
            <div className={styles['form-field']}>
              <label htmlFor='events'>Select an event to participate</label>
              <ul className={styles['event-slots']}>
                {Object.keys(events).filter(id => events[id].type === 'Contest' || events[id].type === 'Sport').flatMap((id) => {
                  const event = events[id];
                  // Only split sports by gender for now, based on user request context and available data
                  if (event.type === 'Sport' && event.gender && event.gender.length > 0) {
                    return event.gender.map(g => {
                      const isMale = g === 'Male';
                      const suffix = isMale ? '(Boys)' : '(Girls)';
                      const genderUrl = isMale ? event.googleFormUrlMale : event.googleFormUrlFemale;
                      const url = genderUrl || event.googleFormUrl || 'https://forms.google.com';
                      return { ...event, id: `${id}_${g}`, title: `${event.title} ${suffix}`, url };
                    });
                  }
                  // For contests or non-sports, return single item
                  return [{ ...event, url: event.googleFormUrl || 'https://forms.google.com' }];
                }).map((item) => (
                  <li key={item.id} className={styles.slot} style={{ marginBottom: '1rem' }}>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.venue}</p>
                      </div>
                      <LinkIcon style={{ width: '24px' }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <SupportLink />
        </div>
      </div>
    </motion.div>
  )
}

export default Register;