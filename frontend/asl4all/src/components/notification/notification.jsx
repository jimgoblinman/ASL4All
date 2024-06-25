import { useEffect } from "react";

import options from "../../assets/options.json";

import styles from "./notification.module.css";

export default function Notification() {
  useEffect(() => {
    const notify = () => {
      if (options.start) {
        return;
      }
    };

    notify();
  }, []);

  return <div className={styles.wrapper}></div>;
}
