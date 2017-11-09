import React from 'react'
import PropTypes from 'prop-types'
import styles from './PageHeaderComponent.scss'
import Navigation from '../common/Navigation'

class PageHeaderComponent extends React.Component {
	constructor(props) {
		super(props)
		this.handleGoToIndex = this.handleGoToIndex.bind(this)
	}

	handleGoToIndex() {
		this.context.router.history.push('/')
	}

	render(){
		return (
			<div className={styles.container}>
				<div className={styles.index} onClick={this.handleGoToIndex}></div>
				<Navigation />
			</div>
		)
	}
}

PageHeaderComponent.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default PageHeaderComponent
