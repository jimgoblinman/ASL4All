import PropTypes from 'prop-types'

import styles from './popup.module.css'

export default function Popup({ message }) {
    return (
        <div className={styles.wrapper}>
            { message.map((e, i) => {
                return <span key={i}>{ e }</span>
            }) }
        </div>
    )
}

Popup.propTypes = {
    message: PropTypes.string.isRequired
}