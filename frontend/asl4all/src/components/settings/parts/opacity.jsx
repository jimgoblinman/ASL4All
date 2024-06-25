import { useEffect } from 'react'

import { useSettings } from '../settingsContext'

import styles from './slider.module.css'

export default function OpacityPart() {
    const { settings, setSettings } = useSettings()

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }
    
    useEffect(() => {
        document.querySelector(':root').style.setProperty('--opacity', settings.opacity)
    }, [settings.opacity])

    return (
        <>
        <label>{`${settings.opacity}%`}</label>
        <div className={styles.slider}>
            <span>0%</span>
            <input type='range' min='0' max='100' value={settings.opacity} onChange={e => updateSettings({ opacity: e.target.value })} />
            <span>100%</span>
        </div>
        </>
    )
}