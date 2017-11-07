import React from 'react'
import styles from './ArticleContent.scss'

class ArticleContent extends React.Component {
    state = {

    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                </div>
                <div className={styles.info}>
                </div>
                <div className={styles.content}>
                </div>
            </div>
        )
    }
}
