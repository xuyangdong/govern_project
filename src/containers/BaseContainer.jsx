import React from 'react'
import styles from './BaseContainer.scss'
import {Button,Icon} from 'antd'
import Navigation from '../components/common/Navigation'
import topImg from '../public/img/2015-top.jpg'
import navigation from 'navigation'
const BaseContainer = React.createClass({
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.navigation}>
					<img src={topImg}/>
					<Navigation navigation={navigation}/>
				</div>
				<div className={styles.content}>
					{this.props.children}
				</div>
				<div className={styles.footer}>
					
				</div>
			</div>
		)
	}
})

export default BaseContainer
