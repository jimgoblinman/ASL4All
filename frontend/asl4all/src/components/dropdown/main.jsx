import { useState } from 'react'

import styles from './main.module.css'

export default function Dropdown({ title, content }) {
    const [toggle, setToggle] = useState(false)

    return (
        <div className={`${styles.wrapper} ${ toggle ? styles.open : '' }`}>
            <div onClick={() => setToggle(prev => !prev)} className={styles.top}>
                <p>{title}</p>
                <span></span>
            </div>
            <div className={styles.content}>
                {content}
            </div>
        </div>
    )
}