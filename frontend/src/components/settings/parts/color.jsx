import { useEffect } from 'react'

import { useSettings } from '../settingsContext'

import { ChromePicker } from 'react-color'

import styles from './color.module.css'

export default function ColorPart() {
    const { settings, setSettings } = useSettings()

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }

    useEffect(() => {
        document.querySelector(':root').style.setProperty('--color', settings.color)
    }, [settings.color])

    return (
        <div className={styles.wrapper}>
            <ChromePicker color={settings.color} onChange={(n) => updateSettings({ color: n.hex })} />
        </div>
    )
}