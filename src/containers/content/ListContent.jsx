import React from 'react'
import PropTypes from 'prop-types'
import styles from './ListContent.scss'
import moment from 'moment'

class ListContent extends React.Component {
	static propTypes = {
		list: PropTypes.array.isRequired,
	}

    render() {
        const list = this.props.list
        return (
            <div className={styles.container}>
                {
                    list.map((l, index) => (

                        <div key={index} className={styles.line}>
                            <div className={styles.title}>
                                <span>{l.title}</span>
                                <span className={styles.time}>{moment(l.publishTime).format('YYYY-MM-DD')}</span>
                            </div>
                        </div>

                    ))
                }
            </div>
        )
    }
}

export default ListContent
