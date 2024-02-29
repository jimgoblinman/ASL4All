import { Block, Dropdown } from '../components'

import styles from './settings.module.css'

export default function Settings({ open }) {
    const settings = [
        <Dropdown title={'Display Settings'} />,
        <Dropdown title={'Language Settings'} />,
        <Dropdown title={'QR Code'} />
    ]

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
            <h1>Settings</h1>
            <div className={styles.settings}>
                <Block content={settings} />
                <Block content={[
                    <div className={styles.feedback}>Feedback</div>
                ]} />
            </div>
            <div className={styles.dontate}>Donate</div>
        </div>
    )
}