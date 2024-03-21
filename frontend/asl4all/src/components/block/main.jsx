import PropTypes from "prop-types";
import styles from "./main.module.css";

export default function Block({ content }) {
  return (
    <div className={styles.block}>
      {content.map((c) => {
        return c;
      })}
    </div>
  );
}

Block.propTypes = {
  content: PropTypes.array.isRequired,
};
