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
		const pathname = this.props.match.path
		const data = routes[0].routes.find(v => {
            if(v.hasProps) {
                return v.hasProps === '/' + pathname.split('/')[1]
            } else {
                return v.path === pathname
            }
        })
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
        if (this.props.goBack) {
            this.props.goBack()
            return
        } else {
			this.context.router.history.push(path)
        }
		// if(path !== this.props.location.pathname) {
		// } else {
		// 	this.props.goBack && this.props.goBack()
		// }
	}

	render() {
		const { breadthumb } = this.state
		return (
			<div className={styles.container}>
                当前位置：<span onClick={this.handleJump.bind(this, '/')} style={{cursor: 'pointer'}}>首页 > </span>
                {
                    breadthumb[0].name === '检验报告详情' ? <span onClick={this.handleJump.bind(this, '/search_report')} style={{cursor: 'pointer'}}>检验报告列表 > </span> : null
                }
                {
                    breadthumb[0].name === '企业信息查询' ? <span onClick={this.handleJump.bind(this, '/enterprise_user')} style={{cursor: 'pointer'}}>企业用户 > </span> : null
                }
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
