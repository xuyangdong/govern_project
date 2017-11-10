import React from 'react'
import EnhanceModal from './EnhanceModal'
import RegisterModal from './RegisterModal'

export default class TestComponent extends React.Component {
	render(){
		return (
			<RegisterModal visible={true}>
			测试
			</RegisterModal>
		)
	}
}
