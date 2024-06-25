import { useSettings } from '../settingsContext'

import styles from './slider.module.css'

export default function RecoPart() {
    const { settings, setSettings } = useSettings()

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }

    return (
        <>
        <label>{`${settings.reco}s`}</label>
        <div className={styles.slider}>
            <span>0.25s</span>
            <input type='range' min='0.25' max='1.5' step='0.25' value={settings.reco} onChange={e => updateSettings({ reco: e.target.value })} />
            <span>1.5s</span>
        </div>
        </>
    )
}