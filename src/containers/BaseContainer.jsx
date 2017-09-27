import React from 'react'
import { Route } from 'react-router-dom'
import navigation from 'navigation'
import styles from './BaseContainer.scss'
import Navigation from '../components/common/Navigation'
import topImg from '../public/img/2015-top.jpg'
import Breadthumb from '../components/common/Breadthumb'
import App from '../App'
import ReactCanvasComponent from '../components/ReactCanvasComponent'
import ShopfrontContainer from '../containers/shopfront/ShopfrontContainer'


class BaseContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.navigation}>
					<img alt="top" src={topImg} />
					<Navigation navigation={navigation} />
				</div>
				<Breadthumb />
				<div className={styles.content}>
					<Route path="/index" component={ShopfrontContainer} />
					<Route path="/app" component={App} />
					<Route path="/pdf" component={ReactCanvasComponent} />
				</div>
				<div className={styles.footer} />
			</div>
		)
	}
}

export default BaseContainer
