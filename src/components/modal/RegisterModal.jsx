import React from 'react'
import EnhanceModal from './EnhanceModal'
import {Form,Input,Button,Select} from 'antd'
import styles from './RegisterModal.scss'
import PropTypes from 'prop-types'
const FormItem = Form.Item
const Option = Select.Option

class RegisterModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk:PropTypes.func,
        onCancel:PropTypes.func
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
                <Button>完成</Button>
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
                    getFieldDecorator('name',{
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
                    getFieldDecorator('department',{
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
                            message:'请填写邮箱'
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
                        rules:[{required:true,message:'请选择性别'}]
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
                    getFieldDecorator('address',{
                        rules:[{required:true}]
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem
                    labelCol={{
                        span:6
                    }}
                    wrapperCol={{
                        span:16
                    }}
                    label='详细地址'
                >
                {
                    getFieldDecorator('detailAddress',{
                        // rules:[{required:true}]
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
                    getFieldDecorator('phone',{
                        rules:[{required:true}]
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
                        rules:[{required:true}]
                    })(
                        <Input />
                    )
                }
                <div className={styles.validNum}>获取验证码</div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='密码'
                >
                {
                    getFieldDecorator('password',{
                        rules:[{required:true}]
                    })(
                        <Input />
                    )
                }
                </FormItem>
            </Form>
			</EnhanceModal>


        )
    }
}

export default Form.create()(RegisterModal)
