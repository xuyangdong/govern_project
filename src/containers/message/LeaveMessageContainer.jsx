import React from 'react'
import { Pagination } from 'antd'
import styles from './LeaveMessageContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import CommonButton from '../../components/common/Button'
import RightBlockContainer from '../content/RightBlockContainer'
import ForgetPasswordModal from '../../components/modal/ForgetPasswordModal'
import MessageModal from '../../components/modal/MessageModal'
import LoginModal from '../../components/modal/LoginModal'
import RegisterModal from '../../components/modal/RegisterModal'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getMessageList } from '../../actions/message'
import { logout } from '../../actions/user'

const PAGE_SIZE = 4;

class LeaveMessageContainer extends React.Component {
    state = {
        showLogin: false,
        showRegister: false,
        showMessage: false,
        showForgetPassword: false,
        messageList: [],
        currentPage: 1
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getMessageList().then(res => {
            const messageList = this.props.messageList.slice(0, 4)
            this.setState({messageList})
        })
    }

    handleLogin = () => {
        this.setState({showLogin: true})
    }

    handleRegister = () => {
        this.setState({showLogin: false, showRegister: true})
    }

    handleForgetPassword = () => {
        this.setState({showLogin: false, showForgetPassword: true})
    }

    handleRegisterSuccess = () => {
        this.setState({showLogin: true, showRegister: false})
    }

    handleLoginSuccess = () => {
        this.setState({showLogin: false})
    }

    handleCloseMessageModal = () => {
        this.setState({showMessage: false})
    }

    handleCloseLoginModal = () => {
        this.setState({showLogin: false})
    }

    handleCloseRegisterModal = () => {
        this.setState({showRegister: false})
    }

    handleCloseForgetPasswordModal = () => {
        this.setState({showForgetPassword: false})
    }

    handleLeaveMessage = () => {
        this.setState({showMessage: true})
    }

    handleLogout = () => {
        this.props.logout().then(res => {
            if (res) {
                window.location.reload()
            }
        })
    }

    handlePageChange = (pageNumber) => {
        const messageList = this.props.messageList.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
        this.setState({messageList, currentPage: pageNumber})
    }

    render() {
        const { showLogin, showRegister, showForgetPassword, showMessage, messageList, currentPage } = this.state

        const isLogin = sessionStorage.getItem('accessToken')
        const info = JSON.parse(sessionStorage.getItem('info'))

        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {/* <span>登录/注册</span> */}
                            {
                                !isLogin ?
                                <span>发表留言请先 <a onClick={this.handleLogin}>登录/注册</a></span>
                                // <CommonButton onClick={this.handleLogin} height={32} width={130} content="留言请先登录" />
                                :
                                <div className={styles.head}>
                                    <span>欢迎：{info.realName + ' / ' + info.company} <a onClick={this.handleLogout}>登出</a></span>
                                    <CommonButton onClick={this.handleLeaveMessage} height={32} width={90} content="添加留言+ " />
                                </div>
                            }
                        <div className={styles.messageContaienr}>
                            {
                                messageList.map((m, index) => (
                                    <div key={index} className={styles.card}>
                                        <div className={styles.head}>
                                            <span className={styles.title}>留言主题：{m.theme}</span>
                                            <span className={styles.time}>{moment(m.createTime).format('YYYY-MM-DD')}</span>
                                        </div>
                                        <div className={styles.message}>
                                            <div className={styles.username}>用户昵称：{m.realName}</div>
                                            <div className={styles.content}>{m.content}</div>
                                        </div>
                                        <div className={styles.divider}></div>
                                        <div className={styles.message}>
                                            <div className={styles.username}>质检中心回复：</div>
                                            <div className={styles.content}>{m.reply}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <Pagination showQuickJumper current={currentPage} pageSize={PAGE_SIZE} total={this.props.messageList.size} onChange={this.handlePageChange} />
                    </div>
                    <div className={styles.right}>
                        <RightBlockContainer></RightBlockContainer>
                    </div>
                </div>
                {
                    showMessage ?
                    <MessageModal visible={showMessage} onLeaveMessageSuccess={this.handleCloseMessageModal} onCancel={this.handleCloseMessageModal} />
                    :
                    null
                }
                <LoginModal visible={showLogin} onCancel={this.handleCloseLoginModal} handleShowRegister={this.handleRegister} onLoginSuccess={this.handleLoginSuccess} handleShowForgetPassword={this.handleForgetPassword} />
                <ForgetPasswordModal visible={showForgetPassword} onCancel={this.handleCloseForgetPasswordModal} />
                <RegisterModal visible={showRegister} onCancel={this.handleCloseRegisterModal} onRegisterSuccess={this.handleRegisterSuccess} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
	isLogin: state.getIn(['user', 'isLogin']),
	messageList: state.getIn(['message', 'messageList']),
})

const mapDispatchToProps = dispatch => ({
    getMessageList: bindActionCreators(getMessageList, dispatch),
    logout: bindActionCreators(logout, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveMessageContainer))
