import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Breadthumb from '../../components/common/Breadthumb'
import styles from './EnterpriseUserContainer.scss'
import EnterpriseLoginModal from '../../components/modal/EnterpriseLoginModal'
import { getEnterprise, getEnterpriseById } from '../../actions/enterprise'

class EnterpriseUserContainer extends React.Component {
    state = {
        enterpriseLoginModalState: false
    }

    componentWillMount() {
        const token = sessionStorage.getItem('enterpriseAccessToken')
        if (!token) {
            this.props.history.push('/all_features')
        } else if (token) {
            this.props.getEnterprise().then(res => {
                if (!res.obj) {
                    this.props.history.push('/all_features')
                }
            })
        }
    }

    handleJump = (url) => {
        const token = sessionStorage.getItem('enterprisePrivateAccessToken')
        if (url === '/enterprise_info' && !token) {
            this.setState({ enterpriseLoginModalState: true })
        } else if (url === '/enterprise_info' && token) {
            this.props.getEnterpriseById(this.props.id).then(res => {
                if (res.obj) {
                    this.props.history.push(url)
                } else {
                    this.setState({ enterpriseLoginModalState: true })
                }
            })
        } else {
            this.props.history.push(url)
        }
    }

    handleModalControl = (state) => {
        this.setState({ enterpriseLoginModalState: state })
    }

    handleLoginSuccess = () => {
        this.setState({ enterpriseLoginModalState: false })
        this.props.history.push('/enterprise_info')
    }

    render() {
        const { enterpriseLoginModalState } = this.state

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
                <EnterpriseLoginModal
                    visible={enterpriseLoginModalState}
                    onCancel={this.handleModalControl.bind(this, false)}
                    onOk={this.handleLoginSuccess}
                    isInner
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
	id: state.getIn(['enterprise', 'id']),
	// messageList: state.getIn(['message', 'messageList']),
})

const mapDispatchToProps = dispatch => ({
    // getMessageList: bindActionCreators(getMessageList, dispatch),
    getEnterprise: bindActionCreators(getEnterprise, dispatch),
    getEnterpriseById: bindActionCreators(getEnterpriseById, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterpriseUserContainer))
