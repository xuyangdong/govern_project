import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Breadthumb from '../../components/common/Breadthumb'
import styles from './EnterpriseInfoContainer.scss'

class EnterpriseInfoContainer extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.inner}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterpriseInfoContainer))
