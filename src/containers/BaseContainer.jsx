import React from 'react'
import styles from './BaseContainer.scss'
import {Button,Icon} from 'antd'
import Navigation from '../components/common/Navigation'
import topImg from '../public/img/2015-top.jpg'
import navigation from 'navigation'
import Breadthumb from '../components/common/Breadthumb'

class BaseContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.navigation}>
					<img src={topImg}/>
					<Navigation navigation={navigation}/>
				</div>
				<Breadthumb />
				<div className={styles.content}>
					{this.props.children}
				</div>
				<div className={styles.footer}>

				</div>
			</div>
		)
	}
}

export default BaseContainer
