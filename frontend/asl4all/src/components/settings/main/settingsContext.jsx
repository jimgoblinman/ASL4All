import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'
import { saveSettings as saveLocaly, loadSettings as loadLocaly } from './storage'

import Popup from '../../popup/main'

const SettingsContext = createContext()

export const useSettings = () => useContext(SettingsContext)

export default function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(loadLocaly())

    useEffect(() => {
        saveLocaly(settings)
    }, [settings])
    
    useEffect(() => {
        if (settings.start) return
        const newSettings = settings
        newSettings.start = true
        saveLocaly(newSettings)
    }, [])

    const popup = [
        'To open training, swipe right.',
        'To go back, swipe left.'
    ]

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            { !settings.start ? <Popup message={popup} /> : '' }
            { children }
        </SettingsContext.Provider>
    )
}

SettingsProvider.propTypes = {
    children: PropTypes.node.isRequired
}