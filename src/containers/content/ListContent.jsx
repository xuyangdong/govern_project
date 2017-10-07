import React from 'react'
import PropTypes from 'prop-types'
import styles from './ListContent.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ListContent extends React.Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
	}

    render() {
        const list = this.props.list;
        return (
            <div className={styles.container}>
                {
                    list.map((l, index) => (
                        <div key={index} className={styles.line}>
                            <div className={styles.title}>
                                <span>{l.title}</span>
                                <span className={styles.time}>{l.time}</span>
                            </div>
                            <div className={styles.preview}>
                                {l.preview}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapState = state => ({
	list: state.getIn(['mock', 'articleList']),
})

export default withRouter(connect(mapState)(ListContent))
