import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

import styles from "./feedback.module.css";

const Feedback = () => {
  return (
    <div className={styles.feedbackContainer}>
      <Link to="/ASL4All" className="absolute top-0 right-0 p-8">
        <FaHome size={64} className="text-white" />
      </Link>
      <form>
        <div className={styles.feedbackForm}>
          <input placeholder="Name (Optional)" />

          <select name="feedback-type" id="feedback-type">
            <option value="problem">Problem</option>
            <option value="suggestion">Suggestion</option>
            <option value="praise">Praise</option>
            <option value="other">Other</option>
          </select>

          <input placeholder="E-Mail address (Optional)" />
          <textarea placeholder="Message" required />

          <button type="submit">
            Send <IoMdSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
