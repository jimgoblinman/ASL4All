import { useEffect } from 'react'

import { useSettings } from '../settingsContext'

import styles from './slider.module.css'

export default function SizePart() {
    const { settings, setSettings } = useSettings()

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }
    
    useEffect(() => {
        document.querySelector(':root').style.setProperty('--size', settings.size)
    }, [settings.size])

    return (
        <>
        <label>{`${settings.size}pt`}</label>
        <div className={styles.slider}>
            <span>18pt</span>
            <input type='range' min='18' max='26' step='0.5' value={settings.size} onChange={e => updateSettings({ size: e.target.value })} />
            <span>26pt</span>
        </div>
        </>
    )
}