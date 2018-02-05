import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Breadthumb from '../../components/common/Breadthumb'
import styles from './EnterpriseInfoContainer.scss'
import modifyIcon from 'publicRes/img/modifyIcon.png'
import { getEnterprise, getEnterpriseById } from '../../actions/enterprise'

class EnterpriseInfoContainer extends React.Component {
    componentWillMount() {
        // this.props.getEnterprise()
        const privateToken = sessionStorage.getItem('enterprisePrivateAccessToken')
        const token = sessionStorage.getItem('enterpriseAccessToken')
        if (!token) {
            this.props.history.push('/all_features')
        } else if (token && !privateToken) {
            this.props.history.push('/enterprise_user')
        } else if (token && privateToken) {
            this.props.getEnterprise().then(res => {
                if (!res.obj) {
                    this.props.history.push('/enterprise_user')
                } else {
                    this.props.getEnterpriseById(res.obj.id).then(res => {
                        if(!res.obj) {
                            this.props.history.push('/enterprise_user')
                        }
                    })
                }
            })
        }
    }

    render() {
        const { info } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.inner}>
                    <div className={styles.producer}>
                        生产单位： {info.enterpriseName}
                    </div>
                    <div className={styles.account}>
                        余额剩余： {info.balance}
                    </div>
                    <div className={styles.operation}>
                        <span className={styles.icon}>
                            <img src={modifyIcon} />
                            修改管理密码
                        </span>
                        <span className={styles.icon}>
                            <img src={modifyIcon} />
                            修改登录密码
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	id: state.getIn(['enterprise', 'id']),
	info: state.getIn(['enterprise', 'info']),
	// messageList: state.getIn(['message', 'messageList']),
})

const mapDispatchToProps = dispatch => ({
    getEnterpriseById: bindActionCreators(getEnterpriseById, dispatch),
    getEnterprise: bindActionCreators(getEnterprise, dispatch),
    // logout: bindActionCreators(logout, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterpriseInfoContainer))
