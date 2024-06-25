import PropTypes from 'prop-types'

import styles from './block.module.css'

export default function Block({ content }) {
    return (
        <div className={styles.block}>
            { content.map((c) => {
                return c
            }) }
        </div>
    )
}

Block.propTypes = {
    content: PropTypes.any.isRequired
}