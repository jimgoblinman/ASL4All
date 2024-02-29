import { useState } from 'react'

import Settings from './settings'

import styles from './main.module.css'

export default function Menu() {
    const [toggle, setToggle] = useState(false)

    return (
        <>
        <div onClick={() => setToggle(prev => !prev)} className={`${styles.toggle} ${toggle ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Settings open={toggle}/>
        </>
    )
}