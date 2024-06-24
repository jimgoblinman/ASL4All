// swiper/SwipeComponent.jsx
import React from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./swiper.module.css";

export default function SwipeComponent({ setLoading }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (location.pathname === "/asl4all/") {
        setLoading(true);
        navigate("/training");
      }
    },
    onSwipedRight: () => {
      if (location.pathname === "/training") {
        setLoading(true);
        navigate("/asl4all/");
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // It will also track mouse events for testing on desktop
  });

  return <div {...handlers} className={styles["swipe-container"]}></div>;
}

SwipeComponent.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
