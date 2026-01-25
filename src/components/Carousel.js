import { useRef } from "react";
import styles from './Carousel.module.scss';
import { ReactComponent as PointerIcon } from '../media/icons/right.svg';
import { ReactComponent as NarrowArrowIcon } from '../media/icons/narrow-arrow.svg';
import cx from 'classnames';

const CarouselCard = ({ imgSrc, name, roles }) => {
  return (
    <div className={styles['card-wrapper']}>

      <article className={styles.card}>
        <figure className={styles['card-visual']}>
          <img src={imgSrc} alt={name} />
        </figure>
        <main className={styles['card-content']}>
          <h3 className={styles['card-heading']}>
            {name}
          </h3>
          <ul className={styles['card-footer']}>
            {roles.map((role, i) => (<li key={i + role}>
              <span className={styles.role}>{role}</span>
              {i < roles.length - 1 && <span className={styles.sep} />}
            </li>))}
          </ul>
        </main>
      </article>
    </div>
  )
}

const Carousel = ({ cardsList = [] }) => {
  const cursorRef = useRef(null);
  const parentRef = useRef(null);

  const handleCursorTransit = (type) => {
    if (type === 'enter') {
      cursorRef.current.classList.add(styles['-visible']);
    } else {
      cursorRef.current.classList.remove(styles['-visible']);
    }
  }

  const handleCursorMove = (posX, posY) => {
    const bounds = parentRef.current.getBoundingClientRect();
    cursorRef.current.style.transform = `translate3D(${posX - bounds.left}px, ${posY - bounds.top}px, 0)`;
  }

  return (
    <div className={styles.carousel}
      ref={parentRef}
      onMouseEnter={e => handleCursorTransit('enter')}
      onMouseLeave={e => handleCursorTransit('leave')}
      onMouseMove={e => handleCursorMove(e.clientX, e.clientY)}
    >
      <div className={styles['c-cards-wrapper']}>
        {cardsList.map((card, i) =>
          <CarouselCard key={i} {...card} />
        )}
      </div>

      <div ref={cursorRef} className={styles['c-gallery-cursor']} aria-label="next/previous">
        <PointerIcon />
      </div>
    </div>
  )
}

export default Carousel;