import React from 'react'
import EnhanceModal from './EnhanceModal'
import { Form,Input,Button,Select } from 'antd'
import styles from './ForgetPasswordModal.scss'
import PropTypes from 'prop-types'
const FormItem = Form.Item
const Option = Select.Option

class ForgetPasswordModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk:PropTypes.func,
        onCancel:PropTypes.func
    }

    state = {
        confirmDirty: false,
        nextStep: false,
    }

    handleShowRegisterModal = () => {
        this.props.handleShowRegister()
    }

    handleNextStep = () => {
        this.setState({nextStep: true})
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render( ) {
        const { nextStep } = this.state
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
                <Button onClick={this.handleNextStep}>下一步</Button>
            </div>
        ]

        const modalFooterSetNewPassword = [
            <div key='ok' className={styles.modalFooter}>
                <Button>完成</Button>
            </div>
        ]
        return (
            <EnhanceModal
				title='忘记密码'
                {...this.props}
                footer={nextStep ? modalFooterSetNewPassword : modalFooter}
			>
                {
                    nextStep ?
                    <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <FormItem
                            {...formItemLayout}
                            label='新密码'
                        >
                        {
                            getFieldDecorator('password',{
                                rules:[{required:true, message: '请输入新密码'}]
                            })(
                                <Input type="password"/>
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='重复新密码'
                        >
                        {
                            getFieldDecorator('password2',{
                                rules:[{required:true, message: '两次输入的密码不一致'}, { validator: this.checkPassword}]
                            })(
                                <Input type="password"  onBlur={this.handleConfirmBlur}/>
                            )
                        }
                        </FormItem>
                    </Form>
                    :
                    <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <FormItem
                            {...formItemLayout}
                            label='手机号码'
                        >
                        {
                            getFieldDecorator('phone',{
                                rules:[{required:true, message: '请输入手机号'}]
                            })(
                                <Input />
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='验证码'
                        >
                        {
                            getFieldDecorator('validNum',{
                                rules:[{required:true, message: '请输入验证码'}]
                            })(
                                <Input />
                            )
                        }
                        <div className={styles.validNum}>获取验证码</div>
                        </FormItem>
                    </Form>
                }

			</EnhanceModal>
        )
    }
}

export default Form.create()(ForgetPasswordModal)
