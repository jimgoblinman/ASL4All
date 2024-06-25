import { useEffect } from "react";

import { useSettings } from "../settingsContext";

import styles from "./slider.module.css";

export default function SizePart() {
  const { settings, setSettings } = useSettings();

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  useEffect(() => {
    document
      .querySelector(":root")
      .style.setProperty("--size", `${settings.size}px`);
  }, [settings.size]);

  return (
    <>
      <label>{`${settings.size}px`}</label>
      <div className={styles.slider}>
        <span>16px</span>
        <input
          type="range"
          min="16"
          max="24"
          step="2"
          value={settings.size}
          onChange={(e) => updateSettings({ size: e.target.value })}
        />
        <span>24px</span>
      </div>
    </>
  );
}
