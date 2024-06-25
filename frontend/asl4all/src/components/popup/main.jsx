import { useEffect } from 'react'
import { useSettings } from '../settings/settingsContext'
import PropTypes from 'prop-types'

import styles from './popup.module.css'

export default function Popup({ message }) {
    const { setSettings } = useSettings()

    useEffect(() => {
        setTimeout(() => setSettings(prev => ({ ...prev, ...{ start: false } })), 2000)
    }, [])

    return (
        <div className={styles.wrapper}>
            { message.map((e, i) => {
                return <span key={i}>{ e }</span>
            }) }
        </div>
    )
}

Popup.propTypes = {
    message: PropTypes.any.isRequired,
}