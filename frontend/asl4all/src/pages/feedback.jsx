import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";

import styles from './feedback.module.css'

const Feedback = () => {

    return (
        <>
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

                    <button type="submit">Send <IoMdSend/></button>
                </div>
            </form>
        </>
    );
};

export default Feedback;
