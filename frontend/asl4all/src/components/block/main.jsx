import styles from './main.module.css'

export default function Block({ content }) {
    return <div className={styles.block}>{ content.map(c => { return c }) }</div>
}