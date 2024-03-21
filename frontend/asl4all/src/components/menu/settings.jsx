<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { Block, Dropdown } from '../components'
import { Font, Size, Color, Opacity, QR, Language } from '../settings/main'
import Translation from "../../languages.json";
import React, { useState, useEffect } from 'react';

import styles from './settings.module.css'

export default function Settings({ open }) {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()));
    }, [time]);

    const display = <>
        <Dropdown title={Translation[Translation.current].font} content={<Font />} />
        <Dropdown title={Translation[Translation.current].minTextSize} content={<Size />} />
        <Dropdown title={Translation[Translation.current].textColor} content={<Color />} />
        <Dropdown title={Translation[Translation.current].opacity} content={<Opacity />} />
=======
import { Link } from "react-router-dom";
import { Block, Dropdown } from "../components";
import { Font, Size, Color, Opacity, QR } from "../settings/main";
import PropTypes from "prop-types";
import styles from "./settings.module.css";

export default function Settings({ open }) {
  const display = (
    <>
      <Dropdown key="font" title={"Font"} content={<Font />} />
      <Dropdown
        key="minTextSize"
        title={"Minimum Text size"}
        content={<Size />}
      />
      <Dropdown key="textColor" title={"Text Color"} content={<Color />} />
      <Dropdown key="opacity" title={"Opacity"} content={<Opacity />} />
>>>>>>> 7eb5b6adee02cab36d6e1c838a7d3cc492573355
    </>
  );

<<<<<<< HEAD
    const settings = [
        <Dropdown title={Translation[Translation.current].displaySettings} content={display} />,
        <Dropdown title={Translation[Translation.current].languageSettings} content={<Language />} />,
        <Dropdown title={Translation[Translation.current].qrCode} content={<QR />} />
    ]

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
            <h1>{Translation[Translation.current].settings}</h1>
            <div className={styles.settings}>
                <Block content={settings} />
                <Block content={[
                    <Link to="/feedback" className={styles.feedback}>{Translation[Translation.current].feedback}</Link>
                ]} />
            </div>
            <div className={styles.dontate}>{Translation[Translation.current].donate}</div>
        </div>
    )
}
=======
  const settings = [
    <Dropdown
      key="displaySettings"
      title={"Display Settings"}
      content={display}
    />,
    <Dropdown
      key="languageSettings"
      title={"Language Settings"}
      content={<></>}
    />,
    <Dropdown key="qrCode" title={"QR Code"} content={<QR />} />,
  ];

  return (
    <div className={`${styles.wrapper} ${open ? styles.open : ""}`}>
      <h1>Settings</h1>
      <div className={styles.settings}>
        <Block key="settings" content={settings} />
        <Block
          key="feedback"
          content={[
            <Link key="feedbackLink" to="/feedback" className={styles.feedback}>
              Feedback
            </Link>,
          ]}
        />
      </div>
      <div className={styles.donate}>Donate</div>
    </div>
  );
}

// PropTypes validation
Settings.propTypes = {
  open: PropTypes.bool.isRequired,
};
>>>>>>> 7eb5b6adee02cab36d6e1c838a7d3cc492573355
