import { Block, Dropdown } from "../components";
import {
  Font,
  Size,
  Color,
  Opacity,
  QR,
  Recognition /*Language*/,
} from "../settings/main";
import Translation from "../../languages.json";
import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

import styles from "./settings.module.css";

export default function Settings({ open }) {
  const [openDropdownSettings, setOpenDropdownSettings] = useState(null);
  const [openDropdownDisplay, setOpenDropdownDisplay] = useState(null);

  const toggleDropdownSettings = (key) => {
    setOpenDropdownSettings(openDropdownSettings === key ? null : key);
  };

  const toggleDropdownDisplay = (key) => {
    setOpenDropdownDisplay(openDropdownDisplay === key ? null : key);
  };

  const display = (
    <>
      <Dropdown
        title={"Font"}
        content={<Font />}
        isOpen={openDropdownDisplay === "font"}
        onToggle={() => toggleDropdownDisplay("font")}
      />
      <Dropdown
        title={"Minimum size"}
        content={<Size />}
        isOpen={openDropdownDisplay === "size"}
        onToggle={() => toggleDropdownDisplay("size")}
      />
      <Dropdown
        title={"Text Color"}
        content={<Color />}
        isOpen={openDropdownDisplay === "color"}
        onToggle={() => toggleDropdownDisplay("color")}
      />
      <Dropdown
        title={"Opacity"}
        content={<Opacity />}
        isOpen={openDropdownDisplay === "opacity"}
        onToggle={() => toggleDropdownDisplay("opacity")}
      />
      <Dropdown
        title={"Recognition"}
        content={<Recognition />}
        isOpen={openDropdownDisplay === "recognition"}
        onToggle={() => toggleDropdownDisplay("recognition")}
      />
    </>
  );

  const settings = [
    <Dropdown
      key="display"
      title={Translation[Translation.current].displaySettings}
      content={display}
      isOpen={openDropdownSettings === "display"}
      onToggle={() => toggleDropdownSettings("display")}
    />,
    //  <Dropdown key="language" title={Translation[Translation.current].languageSettings} content={<Language />} isOpen={openDropdownDisplay === 'language'} onToggle={() => toggleDropdown('language')} />,
    <Dropdown
      key="qr"
      title={Translation[Translation.current].qrCode}
      content={<QR />}
      isOpen={openDropdownSettings === "qr"}
      onToggle={() => toggleDropdownSettings("qr")}
    />,
  ];

  return (
    <div className={`${styles.wrapper} ${open ? styles.open : ""}`}>
      <h1>{Translation[Translation.current].settings}</h1>
      <div className={styles.settings}>
        <Block content={settings} />
      </div>
      <Block
        content={[
          <a
            key="feedback"
            className={styles.feedback}
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=cPD1PcjcXkCLhuYSWbpnjs4exZX1dMBGiK1diILs9BFUMk4xMjhWT0NYTDNCSEpDMEc2QjAwTzVaSC4u"
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback
          </a>,
        ]}
      />

      <div className={styles.dontate}>
        {Translation[Translation.current].donate}
      </div>
    </div>
  );
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
};
