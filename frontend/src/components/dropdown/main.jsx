import PropTypes from 'prop-types'

import styles from './dropdown.module.css'

export default function Dropdown({ title, content, isOpen, onToggle }) {
    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
            <div onClick={onToggle} className={styles.top}>
                <p>{title}</p>
                <span></span>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    )
}

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
}