import { Link } from 'react-router-dom';
import { Block, Dropdown } from '../components';
import { Font, Size, Color, Opacity, QR, Language } from '../settings/main';
import Translation from "../../languages.json";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import styles from './settings.module.css';

export default function Settings({ open }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000); // Use the interval if needed
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const display = (
        <>
            <Dropdown key="font" title={Translation[Translation.current].font} content={<Font />} />
            <Dropdown key="size" title={Translation[Translation.current].minTextSize} content={<Size />} />
            <Dropdown key="color" title={Translation[Translation.current].textColor} content={<Color />} />
            <Dropdown key="opacity" title={Translation[Translation.current].opacity} content={<Opacity />} />
        </>
    );

    const settings = [
        <Dropdown key="display" title={Translation[Translation.current].displaySettings} content={display} />,
        <Dropdown key="language" title={Translation[Translation.current].languageSettings} content={<Language />} />,
        <Dropdown key="qr" title={Translation[Translation.current].qrCode} content={<QR />} />
    ];

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
            <h1>{Translation[Translation.current].settings}</h1>
            <div className={styles.settings}>
                <Block content={settings} />
                <Block content={[<Link key="feedback" to="/feedback" className={styles.feedback}>{Translation[Translation.current].feedback}</Link>]} />
            </div>
            <div className={styles.dontate}>{Translation[Translation.current].donate}</div>
        </div>
    );
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
};
