import { Block, Dropdown } from '../components'
import { Font, Size, Color, Opacity, QR } from '../settings/main'

import styles from './settings.module.css'

export default function Settings({ open }) {
    const display = <>
        <Dropdown title={'Font'} content={<Font />} />
        <Dropdown title={'Minimum Text size'} content={<Size />} />
        <Dropdown title={'Text Color'} content={<Color />} />
        <Dropdown title={'Opacity'} content={<Opacity />} />
    </>

    const settings = [
        <Dropdown title={'Display Settings'} content={display} />,
        <Dropdown title={'Language Settings'} content={<></>} />,
        <Dropdown title={'QR Code'} content={<QR />} />
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