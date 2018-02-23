import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Breadthumb from '../../components/common/Breadthumb'
import styles from './EnterpriseInfoContainer.scss'
import modifyIcon from 'publicRes/img/modifyIcon.png'
import EnterpriseModifyPasswordModal from '../../components/modal/EnterpriseModifyPasswordModal'
import { getEnterprise, getEnterpriseById } from '../../actions/enterprise'

class EnterpriseInfoContainer extends React.Component {
    state = {
        MODIFY_PASSWORD_MODAL_STATE: false,
        isInner: true,
    }

    componentWillMount() {
        // this.props.getEnterprise()
        // const privateToken = sessionStorage.getItem('enterprisePrivateAccessToken')
        // if (!privateToken) {
        //     this.props.history.push('/enterprise_user')
        // } else if (privateToken) {
        //     this.props.getEnterprise().then(res => {
        //         if (!res.obj) {
        //             this.props.history.push('/enterprise_user')
        //         } else {
        //             this.props.getEnterpriseById(res.obj.id).then(res => {
        //                 if(!res.obj) {
        //                     this.props.history.push('/enterprise_user')
        //                 }
        //             })
        //         }
        //     })
        // }
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

    handleModifyPasswordSuccess = () => {
        this.handleModalControl(false)
    }

    handleModalControl = (state) => {
        this.setState({ MODIFY_PASSWORD_MODAL_STATE: state })
    }

    handleModifyPassword = (isInner) => {
        console.log(isInner);
        this.setState({ isInner, MODIFY_PASSWORD_MODAL_STATE: true })
    }

    render() {
        const { info } = this.props
        const { isInner, MODIFY_PASSWORD_MODAL_STATE } = this.state
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
                        <span className={styles.icon} onClick={this.handleModifyPassword.bind(this, true)}>
                            <img src={modifyIcon} />
                            修改管理密码
                        </span>
                        <span className={styles.icon} onClick={this.handleModifyPassword.bind(this, false)}>
                            <img src={modifyIcon} />
                            修改登录密码
                        </span>
                    </div>
                </div>
                <EnterpriseModifyPasswordModal
                    visible={MODIFY_PASSWORD_MODAL_STATE}
                    isInner={isInner}
                    onOk={this.handleModifyPasswordSuccess}
                    onCancel={this.handleModalControl.bind(this, false)}
                />
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
