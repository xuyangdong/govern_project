import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Breadthumb.scss'
import routes from '../../routes'

class Breadthumb extends React.Component {
	state = {
		breadthumb: []
	}

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const pathname = this.props.location.pathname
		const data = routes[0].routes.find(v => v.path === pathname)
		const array = data.name.split(' > ')
		const breadthumb = array.map((b, index) => {
			if (index === array.length -1) {
				return {name: b, path: pathname}
			} else {
				return {name: b, path: ''}
			}
		})
		this.setState({breadthumb})
	}

	handleJump = (path) => {
		if (path === '') return
		if(path !== this.props.location.pathname) {
			this.context.router.history.push(path)
		} else {
			this.props.goBack && this.props.goBack()
		}
	}

	render() {
		const { breadthumb } = this.state
		return (
			<div className={styles.container}>
                当前位置：<span onClick={this.handleJump.bind(this, '/')} style={{cursor: 'pointer'}}>首页 > </span>
				{
					breadthumb.map((b, index) => {
                        const suffix = index < breadthumb.length - 1 ? '> ' : '';
                        return (
							<span style={b.path !== '' ? {cursor: 'pointer'} : null} key={index} onClick={this.handleJump.bind(this, b.path)}>
								{b.name + " " + suffix}
							</span>
						)
					})
				}
			</div>
		)
	}
}


Breadthumb.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const mapStateToProps = state => ({
})

export default withRouter(connect(mapStateToProps)(Breadthumb))
