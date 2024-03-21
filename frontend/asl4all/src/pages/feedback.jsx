import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import Translation from "../languages.json";

import styles from './feedback.module.css'

const Feedback = () => {

    return (
        <div className={styles.feedbackContainer}>
            <form>
                <div className={styles.feedbackForm}>
                    <input placeholder={Translation[Translation.current].name} />

                    <select name="feedback-type" id="feedback-type">
                        <option value="problem">{Translation[Translation.current].problem}</option>
                        <option value="suggestion">{Translation[Translation.current].suggestion}</option>
                        <option value="praise">{Translation[Translation.current].praise}</option>
                        <option value="other">{Translation[Translation.current].other}</option>
                    </select>

                    <input placeholder={Translation[Translation.current].email} />
                    <textarea placeholder={Translation[Translation.current].message} required />

                    <button type="submit">{Translation[Translation.current].send} <IoMdSend/></button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;
