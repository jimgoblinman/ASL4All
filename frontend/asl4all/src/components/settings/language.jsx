
import { useEffect, useState } from 'react';
import Translation from "../../languages.json";
import styles from "./language.module.css"

export default function Language() {
    const [language, setLanguage] = useState("english");

    useEffect(() => {
        if (language === "english") {
            Translation.current = "english";
        }
        else if (language === "german") {
            Translation.current = "german";
        }
        else if (language === "french") {
            Translation.current = "french";
        }
    }, [language]);

    return (
        <>
            <select className={styles.language} value={language} onChange={(e) => { setLanguage(e.target.value) }} id="language">
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="french">French</option>
            </select>
        </>
    );
}
