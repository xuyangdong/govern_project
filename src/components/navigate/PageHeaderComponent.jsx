import React from 'react'
import PropTypes from 'prop-types'
import styles from './PageHeaderComponent.scss'
import Navigation from '../common/Navigation'
import cncfLogo from 'publicRes/img/homepage/cncf-logo.png'
import textLogo from 'publicRes/img/homepage/text.png'

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
				<div className={styles.logo}>
					<img src={cncfLogo} onClick={this.handleGoToIndex}/>
				</div>
				<div className={styles.rightPanel}>
					<img src={textLogo} style={{marginTop: 35}}/>
					<Navigation />
				</div>
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
