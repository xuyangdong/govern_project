import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Breadthumb from '../../components/common/Breadthumb'
import styles from './EnterpriseUserContainer.scss'

class EnterpriseUserContainer extends React.Component {
    handleJump = (url) => {
        this.props.history.push(url)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.inner}>
                    <div className={styles.row} onClick={this.handleJump.bind(this, '/search_report')}>
                        检验报告查询>
                    </div>
                    <div className={styles.row} onClick={this.handleJump.bind(this, '/enterprise_info')}>
                        企业信息查询>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	// isLogin: state.getIn(['user', 'isLogin']),
	// messageList: state.getIn(['message', 'messageList']),
})

const mapDispatchToProps = dispatch => ({
    // getMessageList: bindActionCreators(getMessageList, dispatch),
    // logout: bindActionCreators(logout, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterpriseUserContainer))
