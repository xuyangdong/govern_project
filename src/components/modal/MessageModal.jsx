import React from 'react'
import EnhanceModal from './EnhanceModal'
import { Form,Input,Button,Select } from 'antd'
import styles from './MessageModal.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../actions/user'
import { getCaptcha, leaveMessage } from '../../actions/message'

const FormItem = Form.Item
const Option = Select.Option

class MessageModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk:PropTypes.func,
        onCancel:PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getCaptcha()
    }

    handleGetCaptcha = () => {
        this.props.getCaptcha()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData()
                formData.append('theme', values.theme)
                formData.append('content', values.content)
                formData.append('captcha', values.captcha)
                this.props.leaveMessage(formData).then(res => {
                    if (res) {
                        this.props.onLeaveMessageSuccess()
                    }
                })
            }
        });
    }

    render( ) {
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 12 },
            },
        };
        const modalFooter = [
            <div key='ok' className={styles.modalFooter}>
                <Button onClick={this.handleSubmit}>提交</Button>
            </div>
        ]
        return (
            <EnhanceModal
				title='发布留言'
                {...this.props}
                footer={modalFooter}
			>
                <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <FormItem
                        {...formItemLayout}
                        label='标题'
                    >
                    {
                        getFieldDecorator('theme', {
                            rules:[{required:true, message:'请输入标题'}]
                        })(
                            <Input />
                        )
                    }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='内容'
                    >
                    {
                        getFieldDecorator('content', {
                            rules:[{required:true, message:'请输入内容'}]
                        })(
                            <Input type="textarea" rows={4} />
                        )
                    }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='验证码'
                    >
                        <div className={styles.captchaContainer}>
                            {
                                getFieldDecorator('captcha',{
                                    rules:[{required:true, message: '请输入验证码'}]
                                })(
                                        <Input style={{width: '90px'}} />
                                )
                            }
                            <img onClick={this.handleGetCaptcha} src={this.props.captcha ? URL.createObjectURL(this.props.captcha) : ''} />
                        </div>
                    {/* <div onClick={this.handleGetPhoneCode} className={styles.validNum}>获取验证码</div> */}
                    </FormItem>
                </Form>
			</EnhanceModal>
        )
    }
}

const WrappedMessageModal = Form.create()(MessageModal)

const mapStateToProps = state => ({
    captcha: state.getIn(['message', 'captcha']),
})

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),
    getCaptcha: bindActionCreators(getCaptcha, dispatch),
    leaveMessage: bindActionCreators(leaveMessage, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedMessageModal))
