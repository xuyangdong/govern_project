import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Breadthumb.scss'

class Breadthumb extends React.Component {
	static propTypes = {
		breadthumb: PropTypes.array.isRequired,
	}

	render() {
		const breadthumb = this.props.breadthumb
		return (
			<div className={styles.container}>
				当前位置：
				{
					breadthumb.map(b => (
						<span key={b.path}> {b.name} </span>
					))
				}
			</div>
		)
	}
}

const mapState = state => ({
	breadthumb: state.getIn(['common', 'breadthumb']),
})

export default withRouter(connect(mapState)(Breadthumb))
