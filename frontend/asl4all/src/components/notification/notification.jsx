import { useEffect } from 'react'

import options from '../../assets/options.json'

import styles from './notification.module.css'

export default function Notification() {
  useEffect(()=> {
    const notify = () => {
      console.log(options.start)
      if (options.start) { return }
      console.log('notify')
    }

    notify()
  }, [])

  return (
    <div className={styles.wrapper}>

    </div>
  )
}