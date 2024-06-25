import { useState } from 'react'

import Block from '../block/main'
import Dropdown from '../dropdown/main'
import Qr from '../qr/main'
import { Font, Size, Color, Opacity, Reco } from './parts/main'

import styles from './settings.module.css'

export default function Settings() {
    const [toggle, setToggle] = useState(false)
    
    const [dDSettings, setDDSettings] = useState(null)
    const [dDDisplay, setDDDisplay] = useState(null)

    const toggleDDSettings = (k) => {
        setDDSettings(dDSettings === k ? null : k)
        if (dDSettings === 'qr') setDDDisplay(null)
    }
    
    const toggleDDDisplay = (k) => {
        setDDDisplay(dDDisplay === k ? null : k)
    }

    const display = (
        <Block content={[
            <Dropdown key='5' title='Font' content={<Font />} isOpen={dDDisplay === 'font'} onToggle={() => toggleDDDisplay('font')}/>,
            <Dropdown key='6' title='Minimum size' content={<Size />} isOpen={dDDisplay === 'size'} onToggle={() => toggleDDDisplay('size')}/>,
            <Dropdown key='7' title='Text Color' content={<Color />} isOpen={dDDisplay === 'color'} onToggle={() => toggleDDDisplay('color')}/>,
            <Dropdown key='8' title='Opacity' content={<Opacity />} isOpen={dDDisplay === 'opacity'} onToggle={() => toggleDDDisplay('opacity')}/>,
            <Dropdown key='9' title='Recognition' content={<Reco />} isOpen={dDDisplay === 'reco'} onToggle={() => toggleDDDisplay('reco')}/>
        ]}/>
    )

    return (
        <>
        <div onClick={() => setToggle(prev => !prev)} className={`${styles.toggle} ${toggle ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`${styles.settings} ${toggle ? styles.openS : ''}`}>
            <div>
                <h1>Settings</h1>
                <div className={styles.setting}>
                    <Block content={[
                        <Dropdown key='1' title='General' content={display} isOpen={dDSettings === 'display'} onToggle={() => toggleDDSettings('display')}/>,
                        <Dropdown key='2' title='QR Code' content={<Qr/>} isOpen={dDSettings === 'qr'} onToggle={() => toggleDDSettings('qr')}/>
                    ]}/>
                </div>
                <Block content={[
                    <a key='3' href='/ASL4All/feedback' target='_blank' className={styles.feedback}>
                        <p>Feedback</p>
                    </a>
                ]}/>
                <Block content={[
                    <p key='4'>Donate</p>
                ]}/>
            </div>
        </div>
        </>
    )
}