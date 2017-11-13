import React from 'react'
import EnhanceModal from './EnhanceModal'
import {Form,Input,Button,Select} from 'antd'
import styles from './RegisterModal.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getPhoneCode, register } from '../../actions/user'

const FormItem = Form.Item
const Option = Select.Option

class RegisterModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk:PropTypes.func,
        onCancel:PropTypes.func
    }

    handleGetPhoneCode = () => {
        const phone = this.props.form.getFieldValue('mobile')
        if (phone) {
            this.props.getPhoneCode(phone)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData()
                formData.append('mobile', values.mobile)
                formData.append('password', values.password)
                formData.append('sex', values.sex)
                formData.append('detailAddress', values.detailAddress)
                formData.append('company', values.company)
                formData.append('realName', values.realName)
                formData.append('email', values.email)
                formData.append('verifyCode', values.verifyCode)
                this.props.register(formData).then(res => {
                    if (res) {
                        this.props.onRegisterSuccess()
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 10 },
            },
        };
        const modalFooter = [
            <div key='ok' className={styles.modalFooter}>
                <Button onClick={this.handleSubmit}>注册</Button>
            </div>
        ]
        return (
            <EnhanceModal
				title='注册'
                {...this.props}
                footer={modalFooter}
			>
            <Form onSubmit={(e) => e.preventDefault()}>
                <FormItem
                    {...formItemLayout}
                    label='真实姓名'
                >
                {
                    getFieldDecorator('realName',{
                        rules:[{required:true,message:'请填写真实姓名'}]
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='单位名称'
                >
                {
                    getFieldDecorator('company',{
                        rules:[{required:true,message:'请填写工作单位'}]
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='邮箱'
                >
                {
                    getFieldDecorator('email',{
                        rules:[{
                            required:true,
                            message:'请填写邮箱'
                        },{
                            type:'email',
                            message:'邮箱格式不正确'
                        }]
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='性别'
                >
                {
                    getFieldDecorator('sex',{
                        rules:[{required:true, message:'请选择性别'}]
                    })(
                        <Select style={{width:'100%'}} >
                            <Option value='男' key='male'>男</Option>
                            <Option value='女' key='female'>女</Option>
                        </Select>
                    )
                }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='地址'
                >
                {
                    getFieldDecorator('detailAddress',{
                        rules:[{required:true, message: '请输入地址'}]
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='手机号码'
                >
                {
                    getFieldDecorator('mobile',{
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
                    getFieldDecorator('verifyCode',{
                        rules:[{required:true, message: '请输入验证码'}]
                    })(
                        <Input />
                    )
                }
                <div onClick={this.handleGetPhoneCode} className={styles.validNum}>获取验证码</div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='密码'
                >
                {
                    getFieldDecorator('password',{
                        rules:[{required:true, message: '请输入密码'}]
                    })(
                        <Input type="password"/>
                    )
                }
                </FormItem>
            </Form>
			</EnhanceModal>


        )
    }
}

const WrappedRegisterModal = Form.create()(RegisterModal)

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getPhoneCode: bindActionCreators(getPhoneCode, dispatch),
    register: bindActionCreators(register, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterModal))
