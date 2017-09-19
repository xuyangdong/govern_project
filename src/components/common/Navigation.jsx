import React from 'react'
import styles from './Navigation.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import notice from 'publicRes/img/notice.gif'
const cx = classnames.bind(styles)

class NavigationTab extends React.Component {
	static propTypes = {
		title:PropTypes.string,
		link:PropTypes.string,
		isActive:PropTypes.bool
	}
	static defaultProps = {
		subNav:[]
	}
	handleMouseEnter = () => {
		this.props.onMouseEnter()
	}
	render(){
		const {subNav} = this.props
		return (
			<div className={cx('tabContainer',{
				'tabContainer-enter':this.props.isActive
			})} onMouseEnter={this.handleMouseEnter}>
				<a>{this.props.title}</a>
			</div>
		)
	}
}

class SubNavigation extends React.Component {
	static propTypes = {
		navTabItem:PropTypes.object
	}
	render(){
		const {navTabItem} = this.props
		const type = navTabItem.type
		const subNav = navTabItem.children||[]
		if(type=='rolling'){
			return (
				<div className={styles['subNavigation-rolling']}>
					<img src={notice} />滚动公告：
					<div className={styles.rollingContainer}>
					{subNav.map((v,k) => {
						return (<a className={styles.rollLink} key={k}>{k!=0?' | ':null}{v.title}</a>)
					})}
					</div>
				</div>)
		}else{
			return (<div className={styles.subNavigation}>
			{subNav.map((v,k) => {
				return (<a key={k}>{k!=0?' | ':null}{v.title}</a>)
			})}
			</div>)
		}
	}
}

export default class Navigation extends React.Component {
	static propTypes = {
		navigation:PropTypes.array
	}
	constructor(){
		super()
		this.state = {
			activeKey:-1
		}
	}
	handleMouseEnter = (key) => {
		this.setState({
			activeKey:key
		})
	}
	render(){
		const navigation = this.props.navigation
		const navTabItem = navigation[this.state.activeKey]||{}
		return (
			<div className={styles.container}>
			{navigation.map((v,k) => {
				return <NavigationTab
				isActive={this.state.activeKey==k}
				onMouseEnter={this.handleMouseEnter.bind(this,k)}
				title={v.title} key={k} subNav={v.children}/>
			})}
			<div className={styles.subNav}>
				<SubNavigation navTabItem={navTabItem}/>
			</div>
			</div>
		)
	}
}
