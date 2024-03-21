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
    </>
  );

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
