// swiper/SwipeComponent.jsx
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './swiper.module.css'

export default function SwipeComponent([loading, setLoading]) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('swiped left')
      if (location.pathname === '/ASL4All') {
        navigate('/training');
      }
    },
    onSwipedRight: () => {
      if (location.pathname === '/training') {
        navigate('/ASL4All');
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // It will also track mouse events for testing on desktop
  });

  return (
    <div {...handlers} className={styles['swipe-container']}>
    </div>
  );
}