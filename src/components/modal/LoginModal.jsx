import React from 'react'
import EnhanceModal from './EnhanceModal'
import { Form,Input,Button,Select } from 'antd'
import styles from './LoginModal.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../actions/user'

const FormItem = Form.Item
const Option = Select.Option

class LoginModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk:PropTypes.func,
        onCancel:PropTypes.func
    }

    handleShowRegisterModal = () => {
        this.props.handleShowRegister()
    }

    handleShowForgetPasswordModal = () => {
        this.props.handleShowForgetPassword()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values.mobile, values.password).then(res => {
                    if (res) {
                        this.props.onLoginSuccess()
                    }
                })
            }
        });
    }

    render( ) {
        const {getFieldDecorator} = this.props.form
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
                <Button onClick={this.handleSubmit}>登录</Button>
            </div>
        ]
        return (
            <EnhanceModal
	            title='登录'
                {...this.props}
                footer={modalFooter}
			>
                <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <FormItem
                        {...formItemLayout}
                        label='手机号码'
                    >
                    {
                        getFieldDecorator('mobile', {
                            rules:[{required:true, message:'请输入手机号'}]
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
                        getFieldDecorator('password', {
                            rules:[{required:true, message:'请输入密码'}]
                        })(
                            <Input type="password" />
                        )
                    }
                    </FormItem>
                </Form>
                <div className={styles.operation}>
                    <span onClick={this.handleShowRegisterModal}>注册</span>
                    <span onClick={this.handleShowForgetPasswordModal}>忘记密码</span>
                </div>
			</EnhanceModal>
        )
    }
}

const WrappedLoginModal = Form.create()(LoginModal)

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginModal))
