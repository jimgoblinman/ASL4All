// swiper/Swiper.jsx
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import styles from './Swiper.module.css';

export function Swiper({ children }) {
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('/next-page'),
    onSwipedRight: () => navigate('/previous-page'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // It will also track mouse events for testing on desktop
  });

  return (
    <div {...handlers} className={styles.swipeContainer}>
      {children}
    </div>
  );
}