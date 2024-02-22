import { Menu } from "../components/components";

import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.media}></div>
      <div className={styles.text_box}>
        <div>C</div>
        <p>AC</p>
        <p>Lets Go AI</p>
      </div>
    </div>
  );
}
