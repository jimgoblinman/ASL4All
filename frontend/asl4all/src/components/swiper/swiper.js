import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useHistory } from 'react-router-dom';

export default function SwipeComponent() {
  const history = useHistory();

  const handlers = useSwipeable({
    onSwipedLeft: () => history.push('/next-page'),
    onSwipedRight: () => history.push('/previous-page'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true // It will also track mouse events for testing on desktop
  });

  return (
    <div {...handlers} className='swipe-container'>
      <p>Swipe left or right to navigate</p>
    </div>
  );
}
