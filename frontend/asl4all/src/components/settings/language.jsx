import styles from './language.module.css';
import { useEffect, useState } from 'react';
import Translation from "../../languages.json";

export default function Language() {
    const [language, setLanguage] = useState("english")
    const [content, setContent] = useState({})

    useEffect(() => {
        if (language == "english") {
            setContent(Translation[Translation.current].english)
        }
        else if (language == "german") {
            setContent(Translation[Translation.current].german)
        }
        else if (language == "french") {
            setContent(Translation[Translation.current].french)
        }
        Translation.current = language;
    }, [language]);

    return (
        <>
            <select value={language} onChange={(e) => { setLanguage(e.target.value) }} id="language">
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="french">French</option>
            </select>
        </>
    )
}