import { useEffect } from 'react'

import { useSettings } from '../settingsContext'

import styles from './font.module.css'

export default function FontPart() {
    const { settings, setSettings } = useSettings()

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }

    useEffect(() => {
        document.querySelector(':root').style.setProperty('--font', `'${settings.font}', sans-serif`)
    }, [settings.font])

    return (
        <select value={settings.font} onChange={e => updateSettings({ font: e.target.value })} className={styles.select}>
            <option value='Arial' className={styles.fontArial}>
                Arial
            </option>
            <option value='Calibri' className={styles.fontCalibri}>
                Calibri
            </option>
            <option value='Gill Sans MT' className={styles.fontGillSansMt}>
                Gill Sans MT
            </option>
            <option value='Consolas' className={styles.fontConsolas}>
                Consolas
            </option>
            <option value='Inter' className={styles.fontInter}>
                Inter
            </option>
        </select>
    )
}