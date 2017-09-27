import React from 'react'
import { Link, Route } from 'react-router-dom'
import navigation from 'navigation'
import styles from './BaseContainer.scss'
import Navigation from '../components/common/Navigation'
import topImg from '../public/img/2015-top.jpg'
import Breadthumb from '../components/common/Breadthumb'
import Children from '../components/common/SubRoutes'

class BaseContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.navigation}>
					<img alt="top" src={topImg} />
					<Navigation navigation={navigation} />
				</div>
				<Breadthumb />
				<Link to="/"> Index </Link>
				<Link to="/canvas"> Canvas </Link>
				<Link to="/pdf"> PDF </Link>
				<Link to="/shop"> Shop </Link>
				<div className={styles.content}>
					<Children routes={this.props.routes} />
				</div>
				<div className={styles.footer} />
			</div>
		)
	}
}

export default BaseContainer
