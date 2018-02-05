import React from 'react'
import EnhanceModal from './EnhanceModal'
import { Form, Input, Button, Select } from 'antd'
import styles from './LoginModal.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { modifyPublicPassword, modifyPrivatePassword } from '../../actions/enterprise'

const FormItem = Form.Item
const Option = Select.Option

class EnterpriseModifyPasswordModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        isInner: PropTypes.bool
    }

    state = {
        confirmDirty: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { isInner } = this.props
                let formData = new FormData()
                if (isInner) {
                    formData.append('innerPassword', values.password)
                    this.props.modifyPrivatePassword(formData).then(res => {
                        if (res) {
                            this.props.onOk()
                        }
                    })
                } else {
                    formData.append('password', values.password)
                    this.props.modifyPublicPassword(formData).then(res => {
                        if (res) {
                            this.props.onOk()
                        }
                    })
                }
            }
        });
    }

    checkOldPassword = (rule, value, callback) => {
        const { isInner, info } = this.props;
        let target = isInner ? info.innerPassword : info.password
        if (value && value !== target) {
            callback('原始密码错误');
        } else {
            callback();
        }
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

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render( ) {
        const { getFieldDecorator } = this.props.form
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
                <Button onClick={this.handleSubmit}>确认</Button>
            </div>
        ]
        return (
            <EnhanceModal
				title={isInner ? '修改管理密码' : '修改登录密码'}
                {...this.props}
                footer={modalFooter}
			>
                <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <FormItem
                        {...formItemLayout}
                        label='原始密码'
                    >
                    {
                        getFieldDecorator('oldPassword', {
                            rules:[{required:true, message:'请输入原始密码'}, { validator: this.checkOldPassword}]
                        })(
                            <Input type="password" />
                        )
                    }
                    </FormItem>
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
			</EnhanceModal>
        )
    }
}

const WrappedLoginModal = Form.create()(EnterpriseModifyPasswordModal)

const mapStateToProps = state => ({
    info: state.getIn(['enterprise', 'info']),
})

const mapDispatchToProps = dispatch => ({
    modifyPublicPassword: bindActionCreators(modifyPublicPassword, dispatch),
    modifyPrivatePassword: bindActionCreators(modifyPrivatePassword, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginModal))
