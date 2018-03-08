import React from 'react'
import styles from './Navigation.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import notice from 'publicRes/img/notice.gif'
import navigation from 'navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDetailId } from '../../actions/article'
import SearchInput from '../common/SearchInput'
import EnterpriseLoginModal from '../modal/EnterpriseLoginModal'
const cx = classnames.bind(styles)

class NavigationTab extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		link: PropTypes.string,
		isActive: PropTypes.bool
	}

	static defaultProps = {
		subNav:[]
	}

    state = {
        enterpriseLoginModalState: false
    }

	handleMouseEnter = () => {
		this.props.onMouseEnter()
	}

	handleJump = (e, link) => {
        e.preventDefault()
        this.props.setDetailId(-1)
        if (link === '/enterprise_user') {
            this.setState({ enterpriseLoginModalState: true })
            return
        }
		if (link !== '' && link !== this.props.currentPath) {
            this.context.router.history.push(link)
		}
	}

    handleLoginSuccess = () => {
        this.setState({ enterpriseLoginModalState: false })
        this.context.router.history.push('/enterprise_user')
    }

    handleModalControl = (state) => {
        this.setState({ enterpriseLoginModalState: false })
    }

	render(){
		const {subNav} = this.props
        const { enterpriseLoginModalState } = this.state
		return (
			<div className={cx('tabContainer',{
				'tabContainer-enter':this.props.isActive
			})} onMouseEnter={this.handleMouseEnter} onClick={(e) => this.handleJump(e, this.props.link)}>
				<a>{this.props.title}</a>
				<div className={styles.dropDownPanel} style={this.props.isActive?{display:'block'}:{display:'none'}}>
					<ul>
					{subNav.map((v,k) =>
						(
							<li key={k} onClick={(e) => this.handleJump(e, v.link)}>{v.title}</li>
						)
					)}
					</ul>
				</div>
                <EnterpriseLoginModal
                    visible={enterpriseLoginModalState}
                    onOk={this.handleLoginSuccess}
                    onCancel={this.handleModalControl.bind(this, false)}
                />
			</div>
		)
	}
}


NavigationTab.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

class SubNavigation extends React.Component {
	static propTypes = {
		navTabItem: PropTypes.object
	}

	constructor(){
		super()
		this.state = {
			activeKey:-1
		}
	}

	handleMouseEnter = (key) => {
		const {navTabItem} = this.props
		const subNav = navTabItem.children||[]
		this.props.onChooseSubItem(subNav[key])
		this.setState({
			activeKey:key
		})
	}

	render(){
		const {navTabItem} = this.props
		const type = navTabItem.type
		const subNav = navTabItem.children||[]
		if(type == 'rolling'){
			return (
				<div className={styles['subNavigation-rolling']}>
					<img src={notice} />滚动公告：
					<div className={styles.rollingContainer}>
					{subNav.map((v, k) => {
						return (<a className={styles.rollLink} key={k}>{k!=0?' | ' : null}{v.title}</a>)
					})}
					</div>
				</div>)
		}else{
			return (
				<div className={styles.subNavigation}>
					{
						subNav.map((v,k) => (
							<NavigationTab
								isActive={this.state.activeKey == k && (v.children && v.children.length>0)}
								onMouseEnter={this.handleMouseEnter.bind(this,k)}
								title={v.title}
								link={v.link}
								key={k}
								subNav={v.children}
							/>
						))
					}
				</div>
			)
		}
	}
}

class ThirdNavigationPanel extends React.Component {
	static propTypes = {
		thrirdNavigation:PropTypes.array
	}
	render(){
		const {thrirdNavigation} = this.props
		return (
			<div className={styles.thirdNavigationContainer}>
			{thrirdNavigation.map((v,k) => {
				return <div key={k} className={styles.thirdNavigationItem}>{v.title}</div>
			})}
			</div>
		)
	}
}

class Navigation extends React.Component {
	static propTypes = {
		navigation:PropTypes.array
	}
	static defaultProps = {
		navigation:navigation
	}
	constructor(){
		super()
		this.state = {
			activeKey: -1,
			thirdNavigationItem: {},
		}
	}

	handleMouseEnter = (key) => {
		this.setState({
			activeKey:key
		})
	}

	handleMouseLeave = () => {
		this.setState({
			activeKey:-1
		})
	}

	handleChooseSubItem = (subItem) => {
		this.setState({
			thirdNavigationItem:subItem
		})
	}

	render(){
		const navigation = this.props.navigation
		const navTabItem = navigation[this.state.activeKey] || {}
		return (
			<div className={styles.container} onMouseLeave={this.handleMouseLeave}>
				<div className={styles.navigationWrapper}>
					<div className={styles.navigation} >
						{navigation.map((v,k) => {
							return <NavigationTab
                            currentPath={this.props.location.pathname}
                            setDetailId={this.props.setDetailId}
							isActive={this.state.activeKey==k}
							onMouseEnter={this.handleMouseEnter.bind(this,k)}
							title={v.title} key={k} link={v.link} subNav={v.children}/>
						})}
					</div>
					<div className={styles.searchBar}>
						<SearchInput />
					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    setDetailId: bindActionCreators(setDetailId, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
