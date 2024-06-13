import { Link } from 'react-router-dom';
import { Block, Dropdown } from '../components';
import { Font, Size, Color, Opacity, QR, Recognition /*Language*/ } from '../settings/main';
import Translation from "../../languages.json";
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import styles from './settings.module.css';

export default function Settings({ open }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (key) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const display = <>
        <Dropdown title={'Font'} content={<Font />} isOpen={openDropdown === 'font'} onToggle={() => toggleDropdown('font')} />
        <Dropdown title={'Minimum size'} content={<Size />} isOpen={openDropdown === 'size'} onToggle={() => toggleDropdown('size')} />
        <Dropdown title={'Text Color'} content={<Color />} isOpen={openDropdown === 'color'} onToggle={() => toggleDropdown('color')} />
        <Dropdown title={'Opacity'} content={<Opacity />} isOpen={openDropdown === 'opacity'} onToggle={() => toggleDropdown('opacity')} />
        <Dropdown title={'Recognition'} content={<Recognition />} isOpen={openDropdown === 'recognition'} onToggle={() => toggleDropdown('recognition')} />
    </>

    const settings = [
        <Dropdown key="display" title={Translation[Translation.current].displaySettings} content={display} isOpen={openDropdown === 'display'} onToggle={() => toggleDropdown('display')} />,
      //  <Dropdown key="language" title={Translation[Translation.current].languageSettings} content={<Language />} isOpen={openDropdown === 'language'} onToggle={() => toggleDropdown('language')} />,
        <Dropdown key="qr" title={Translation[Translation.current].qrCode} content={<QR />} isOpen={openDropdown === 'qr'} onToggle={() => toggleDropdown('qr')} />
    ];

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
            <h1>{Translation[Translation.current].settings}</h1>
            <div className={styles.settings}>
                <Block content={settings} />
            </div>
            <Block content={[<Link key="feedback" to="/ASL4All/feedback" className={styles.feedback}>{Translation[Translation.current].feedback}</Link>]} />
            <div className={styles.dontate}>{Translation[Translation.current].donate}</div>
        </div>
    );
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
};