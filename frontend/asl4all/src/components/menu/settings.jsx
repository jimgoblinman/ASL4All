import { Link } from 'react-router-dom';
import { Block, Dropdown } from '../components';
import { Font, Size, Color, Opacity, QR, Language } from '../settings/main';
import Translation from "../../languages.json";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import styles from './settings.module.css';

export default function Settings({ open }) {
    const display = <>
        <Dropdown title={'Font'} content={<Font />} />
        <Dropdown title={'Minimum Text size'} content={<Size />} />
        <Dropdown title={'Text Color'} content={<Color />} />
        <Dropdown title={'Opacity'} content={<Opacity />} />
    </>

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
