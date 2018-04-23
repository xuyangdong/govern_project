import React from 'react'
import PropTypes from 'prop-types'
import styles from './CommitteeContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import RightBlockContainer from '../content/RightBlockContainer'
import ArticleContent from '../content/ArticleContent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCommitteeInfo, committeeLogin } from '../../actions/committee'
import { getCategory, getArticleByCategory } from '../../actions/article'
import { Form, Button, Input, Icon } from 'antd'
import moment from 'moment'

const FormItem = Form.Item;

class CommitteeContainer extends React.Component {
    state = {
        showMore: false,
        moreContent: {title: '', content: ''},
        committeeId: 1,
        committeeName: '',
        moduleIndex: 1,
        standardIndex: 1,
        btcBrief: '',
        connection: '',
        cms: '',
        crs: '',
    }

    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleCurrentStandard = this.handleCurrentStandard.bind(this)
        this.handleModifyStandard = this.handleModifyStandard.bind(this)
        this.handleDesc = this.handleDesc.bind(this)
        this.handleContact = this.handleContact.bind(this)
        this.handleLoginPanel = this.handleLoginPanel.bind(this)
        this.renderModule = this.renderModule.bind(this)
        this.renderDesc = this.renderDesc.bind(this)
        this.renderContact = this.renderContact.bind(this)
        this.renderLoginPanel = this.renderLoginPanel.bind(this)
    }

    componentWillMount() {
        this.props.getCategory().then(res => {
            const categoryId = this.props.category.find(i => i.name === this.props.contentName + '工作动态').id
            this.props.getArticleByCategory(categoryId)
        })
        let committeeName = ''
        let committeeId = 1
        switch (this.props.contentName) {
            case '一分委':
                committeeName = '全国消防标准化技术委员会消防基础标准分技术委员会SAC/TC113/SC1'
                committeeId = 1
                break;
            case '二分委':
                committeeName = '全国消防标准化技术委员会固定灭火系统分技术委员会SAC/TC113/SC2'
                committeeId = 2
                break;
            case '三分委':
                committeeName = '全国消防标准化技术委员会灭火剂分技术委员会SAC/TC113/SC3'
                committeeId = 3
                break;
            case '八分委':
                committeeName = '全国消防标准化技术委员会建筑构件耐火性能分技术委员会SAC/TC113/SC8'
                committeeId = 4
                break;
            case 'ISO':
                committeeName = '国际标准化组织干粉和泡沫灭火剂以及干粉和泡沫灭火系统分技术委员会 (ISO/TC21/SC6）'
                committeeId = 5
                break;
            default:
                committeeName = '全国消防标准化技术委员会消防基础标准分技术委员会SAC/TC113/SC1'
        }
        this.setState({committeeName, committeeId})
        this.props.getCommitteeInfo(committeeId).then(res => {
            const { btcBrief, connection, cms, crs } = this.props.committeeInfo
            this.setState({btcBrief, connection, cms, crs})
        })
        // if (!this.props.category.size) {
        //     this.props.getCategory().then(res => {
        //         const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
        //         this.props.getArticleByCategory(categoryId).then(res => {
        //             this.setState({showContent: true, article: this.props.articleByCategory[0]})
        //         })
        //     })
        // } else {
        //     const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
        //     this.props.getArticleByCategory(categoryId).then(res => {
        //         this.setState({showContent: true, article: this.props.articleByCategory[0]})
        //     })
        // }
    }

    handleCurrentStandard() {
        this.setState({standardIndex: 1})
    }

    handleModifyStandard() {
        this.setState({standardIndex: 2})
    }

    handleDesc() {
        this.setState({moduleIndex: 1})
    }

    handleContact() {
        this.setState({moduleIndex: 4})
    }

    handleLeaveMessage = () => {

      if (!this.props.committeeMember) {
        // 进行登录操作
        this.setState({
          moduleIndex: 5
        })
      } else {
        this.setState({
          moduleIndex: 2
        })
      }
    }

    handleDownload = () => {
      if (!this.props.committeeMember) {
        // 进行登录操作
        this.setState({
          moduleIndex: 5
        })
      } else {
        this.setState({
          moduleIndex: 3
        })
      }
    }

    handleLoginPanel() {
        this.setState({moduleIndex: 5})
    }

    handleLogin() {
        const { getFieldValue } = this.props.form
        this.props.committeeLogin(getFieldValue('username'), getFieldValue('password')).then(res => {
          this.setState({
            moduleIndex: 2
          })
        })
    }

    handleGoBack = () => {
        this.setState({showMore: false})
    }

    handleShowMore = (type) => {
        let title
        switch (type) {
            case 'btcBrief':
                title = "分委简介"
                break;
            case 'cms':
                title = "目前管理的标准"
                break;
            case 'crs':
                title = "制修订中的标准"
                break;
            default:
                title = "分委简介"
        }
        this.setState({showMore: true, moreContent: {title, content: this.props.committeeInfo[type]}})
    }

    handleCheckWorkDetail = (article) => {
        this.setState({showMore: true, moreContent: article})
    }

    handleCheckWorkList = () => {
        this.context.router.history.push(this.props.location.pathname+'_work')
    }

    renderStandard() {
        const { standardIndex } = this.state
        switch (standardIndex) {
            case 1:
                return this.renderCurrentStandard()
                break;
            case 2:
                return this.renderModifyStandard()
                break;
            default:
                return this.renderCurrentStandard()
        }
    }

    renderCurrentStandard() {
        return (
            <div className={styles.desc}>
                <div className={styles.text} dangerouslySetInnerHTML={{__html: this.state.cms}}></div>
                <a onClick={this.handleShowMore.bind(this, 'cms')}>更多></a>
            </div>
        )
    }

    renderModifyStandard() {
        return (
            <div className={styles.desc}>
                <div className={styles.text} dangerouslySetInnerHTML={{__html: this.state.crs}}></div>
                <a onClick={this.handleShowMore.bind(this, 'crs')}>更多></a>
            </div>
        )
    }

    renderModule() {
        const { moduleIndex } = this.state
        switch (moduleIndex) {
            case 1:
                return this.renderDesc()
                break;
            case 2:
                return this.renderLeaveMessage()
                break;
            case 3:
                return this.renderDownload()
                break;
            case 4:
                return this.renderContact()
                break;
            case 5:
                return this.renderLoginPanel()
                break;
            default:
                return this.renderDesc()
                break;
        }
    }

    renderDesc() {
        return (
            <div className={styles.desc}>
                <div className={styles.text} dangerouslySetInnerHTML={{__html: this.state.btcBrief}}></div>
                <a onClick={this.handleShowMore.bind(this, 'btcBrief')}>更多></a>
            </div>
        )
    }

    renderDownload() {
        return (
            <div>
            下载专区
            </div>
        )
    }

    renderLeaveMessage() {
        return (
            <div>
            留言专区
            </div>
        )
    }

    renderContact() {
        return (
            <div className={styles.contact}  dangerouslySetInnerHTML={{__html: this.state.connection}}>
            </div>
        )
    }

    renderLoginPanel() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.loginPanel}>
                <div className={styles.title}>会员登录</div>
                <Form className={styles.loginForm}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleLogin}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

    render() {
      console.log(this.props)
        const { committeeName, moduleIndex, standardIndex, showMore, moreContent } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb goBack={this.handleGoBack}/>
                </div>
                <div className={styles.content}>
                    {
                        showMore ?
                        <div className={styles.left}>
                            <ArticleContent article={moreContent}></ArticleContent>
                        </div>
                        :
                        <div className={styles.left}>
                            <div className={styles.committeeName}>{ committeeName }</div>
                            <div className={styles.card}>
                                <div className={styles.navigate}>
                                    <span onClick={this.handleDesc} style={moduleIndex === 1 ? {color: '#203065'} : null}>分委简介</span>
                                    <span>|</span>
                                    <span onClick={this.handleLeaveMessage}>留言专区</span>
                                    <span>|</span>
                                    <span onClick={this.handleDownload}>下载专区</span>
                                    <span>|</span>
                                    <span onClick={this.handleContact} style={moduleIndex === 4 ? {color: '#203065'} : null}>联系我们</span>
                                    <span>|</span>
                                    <span onClick={this.handleLoginPanel} style={moduleIndex === 5 ? {color: '#203065'} : null}>委员登录</span>
                                </div>

                                <div className={styles.module}>
                                    {this.renderModule()}
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.navigate}>
                                    <span onClick={this.handleCurrentStandard} style={standardIndex === 1 ? {color: '#203065'} : null}>目前管理的标准</span>
                                    <span>|</span>
                                    <span onClick={this.handleModifyStandard} style={standardIndex === 2 ? {color: '#203065'} : null}>制修订的标准</span>
                                </div>
                                <div className={styles.standard}>
                                    {this.renderStandard()}
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.navigate}>
                                    <div className={styles.work}>
                                        <span>工作动态</span>
                                        {
                                            this.props.articleByCategory.slice(0,6).map(a => (
                                                <div onClick={this.handleCheckWorkDetail.bind(this, a)} key={a.articleId} className={styles.article}>
                                                    <span>{a.title}</span>
                                                    <span>{moment(a.publishTime).format('YYYY-MM-DD')}</span>
                                                </div>
                                            ))
                                        }
                                        <div className={styles.more}><a onClick={this.handleCheckWorkList}>更多></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.right}>
                        <RightBlockContainer></RightBlockContainer>
                    </div>
                </div>
            </div>
        )
    }
}

CommitteeContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrappedCommitteeContainer = Form.create()(CommitteeContainer);

const mapStateToProps = state => ({
    category: state.getIn(['article', 'category']),
    articleByCategory: state.getIn(['article', 'articleByCategory']),
	committeeInfo: state.getIn(['committee', 'committeeInfo']),
  committeeMember: state.getIn(['committee', 'committeeMember'])
})

const mapDispatchToProps = dispatch => ({
    getCommitteeInfo: bindActionCreators(getCommitteeInfo, dispatch),
    getArticleByCategory: bindActionCreators(getArticleByCategory, dispatch),
    getCategory: bindActionCreators(getCategory, dispatch),
    committeeLogin: bindActionCreators(committeeLogin, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedCommitteeContainer))
