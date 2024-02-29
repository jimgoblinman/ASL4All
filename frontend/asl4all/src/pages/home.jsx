import { useState } from 'react'

import { Menu } from '../components/components'

import styles from './home.module.css'

export default function Home() {
    const [word, setWord] = useState('')
    const [current, setCurrent] = useState('')

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.media}></div>
            <div className={styles.text_box}>
                <div className={current ? styles.active : ''}>{current}</div>
                <p>{word}</p>
            </div>
        </div>
    )
}