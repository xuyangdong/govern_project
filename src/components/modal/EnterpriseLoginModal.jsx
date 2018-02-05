import React from 'react'
import EnhanceModal from './EnhanceModal'
import { Form, Input, Button, Select } from 'antd'
import styles from './LoginModal.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { enterpriseLogin, enterprisePrivateLogin } from '../../actions/enterprise'

const FormItem = Form.Item
const Option = Select.Option

class EnterpriseLoginModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        isInner: PropTypes.bool
    }

    handleShowForgetPasswordModal = () => {
        this.props.handleShowForgetPassword()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.enterpriseLogin(values.enterpriseName, values.password).then(res => {
                    if (res) {
                        this.props.onOk()
                    }
                })
            }
        });
    }

    handlePrivateSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.enterprisePrivateLogin(values.enterpriseName, values.innerPassword).then(res => {
                    if (res) {
                        this.props.onOk()
                    }
                })
            }
        });
    }

    render( ) {
        const {getFieldDecorator} = this.props.form
        const { isInner } = this.props

        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 10 },
            },
        };
        const modalFooter = [
            <div key='ok' className={styles.modalFooter}>
                <Button onClick={isInner ? this.handlePrivateSubmit : this.handleSubmit}>登录</Button>
            </div>
        ]
        return (
            <EnhanceModal
	            title={isInner ? '登录查看企业信息' : '登录'}
                {...this.props}
                footer={modalFooter}
			>
                <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <FormItem
                        {...formItemLayout}
                        label='企业名称'
                    >
                    {
                        getFieldDecorator('enterpriseName', {
                            rules:[{required:true, message:'请输入企业名称'}]
                        })(
                            <Input />
                        )
                    }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='密码'
                    >
                    {
                        isInner ? getFieldDecorator('innerPassword', {
                            rules:[{required:true, message:'请输入密码'}]
                        })(
                            <Input type="password" />
                        ) : getFieldDecorator('password', {
                            rules:[{required:true, message:'请输入密码'}]
                        })(
                            <Input type="password" />
                        )
                    }
                    </FormItem>
                </Form>
                <div className={styles.operation}>
                    <span onClick={this.handleShowForgetPasswordModal}>忘记密码</span>
                </div>
			</EnhanceModal>
        )
    }
}

const WrappedLoginModal = Form.create()(EnterpriseLoginModal)

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    enterpriseLogin: bindActionCreators(enterpriseLogin, dispatch),
    enterprisePrivateLogin: bindActionCreators(enterprisePrivateLogin, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginModal))
