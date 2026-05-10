import styles from './SupportLink.module.scss';
import cx from 'classnames';

const SupportLink = () => (
  <div className={styles.support}>
    For All Updates and Queries, join the <a className={cx('link', styles.link)} target='_blank' rel='noreferrer' href="https://chat.whatsapp.com/JsCM0ujhOAdAo4IxaV8EgO">
      FOOTPRINTS'26 Whatsapp community</a>
  </div>
)

export default SupportLink;