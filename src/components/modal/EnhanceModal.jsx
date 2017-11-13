import React from 'react'
import _ from 'lodash'
import styles from './EnhanceModal.scss'
import {Modal} from 'antd'

export default class EnhanceModal extends React.Component {
	render(){
		return (
			<Modal wrapClassName={styles.wrapperModal} {..._.omit(this.props,['children'])}>
				{this.props.children}
			</Modal>
		)
	}
}
