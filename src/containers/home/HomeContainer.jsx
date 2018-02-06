import React from 'react'
import PropTypes from 'prop-types'
import banner from 'publicRes/img/banner.png'
import pic1 from 'publicRes/img/pic1.png'
import pic2 from 'publicRes/img/pic2.png'
import pic3 from 'publicRes/img/pic3.png'
import pic4 from 'publicRes/img/pic4.png'
import picNewsIcon from 'publicRes/img/pic.png'
import reportLogo from 'publicRes/img/homepage/title-logo.png'
import reportIcon from 'publicRes/img/report.png'
import noticeIcon from 'publicRes/img/homepage/notice-logo.png'
import contactIcon from 'publicRes/img/homepage/contact-logo.png'
import fireIcon from 'publicRes/img/fireicon.png'
import styles from './HomeContainer.scss'
// import LawContainer from './LawContainer.jsx'
// import TechCouncilContainer from './TechCouncilContainer.jsx'
// import RecommendContainer from './RecommendContainer.jsx'
import CommonButton from '../../components/common/Button'
import EnterpriseLoginModal from '../../components/modal/EnterpriseLoginModal'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDetailId, getCategory, getArticleListByCategory, getArticleDetail } from '../../actions/article'

class HomeContainer extends React.Component {
    state = {
        news: [{
            pic: pic1,
            title: '检测中心以优异的成绩顺利通过CNAS现场评审'
        },{
            pic: pic2,
            title: '检测中心以优异的成绩顺利通过CNAS现场评审'
        },{
            pic: pic3,
            title: '检测中心以优异的成绩顺利通过CNAS现场评审'
        },{
            pic: pic4,
            title: '检测中心以优异的成绩顺利通过CNAS现场评审'
        },],
        notification: [],
        enterpriseLoginModalState: false
    }

    componentWillMount() {
        this.props.getCategory().then(res => {
            let categoryId = this.props.category.find(i => i.name === '通知公告').id
            this.props.getArticleListByCategory(categoryId).then(res => {
                this.setState({notification: res.slice(0, 10)})
            })
        })
    }

    handleNotificationDetail = (articleId) => {
        this.props.getArticleDetail(articleId).then(res => {
            this.props.setDetailId(articleId)
            this.context.router.history.push('/notification')
        })
    }

    handleJump = (path) => {
        this.context.router.history.push(path)
    }

    handleMorePicNews = () => {
        this.context.router.history.push('/imgNews')
    }

    handleQueryReport = () => {
        const token = sessionStorage.getItem('enterpriseAccessToken')
        if (token) {
          this.context.router.history.push('/search_report')
        } else {
            this.setState({ enterpriseLoginModalState: true })
        }
    }

    handleLoginSuccess = () => {
        this.setState({ enterpriseLoginModalState: false })
        this.context.router.history.push('/search_report')
    }

    handleShowMoreContact = () => {
        this.context.router.history.push('/contact')
    }

    render() {
        const { notification, enterpriseLoginModalState } = this.state
    	return (
    		<div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topInner}>
                        <div className={styles.inspect}>
                            <div className={styles.inspectLeft}>
                                <div className={styles.title}>
                                    <img src={reportLogo} alt="" style={{width: 212,height: 42}}/>
                                </div>
                                <div className={styles.content}>
                                      检验报告原件作废查询 >
                                  </div>
                                <div className={styles.footer}>
                                    <CommonButton onClick={this.handleQueryReport} height={40} width={170} className={styles.checkoutBtn} content="查询报告"/>
                                </div>
                            </div>
                            <div className={styles.inspectRight}>
                                <div className={styles.productLine}>
                                    <div className={styles.productTitle}>
                                        <img src={reportIcon} alt="" />
                                        <span>检验范围</span>
                                    </div>
                                </div>
                                <div className={styles.productLine}>
                                    <div className={styles.product} onClick={this.handleJump.bind(this, '/inspect_outfire')}>
                                        <img src={fireIcon} />
                                        灭火设备产品
                                    </div>
                                    <div className={styles.product} onClick={this.handleJump.bind(this, '/inspect_119')}>
                                        <img src={fireIcon} />
                                        火灾警报产品
                                    </div>
                                </div>
                                <div className={styles.productLine}>
                                    <div className={styles.product} onClick={this.handleJump.bind(this, '/inspect_3c')}>
                                        <img src={fireIcon} />
                                        非3C认证产品
                                    </div>
                                    <div className={styles.product} onClick={this.handleJump.bind(this, '/inspect_equipment')}>
                                        <img src={fireIcon} />
                                        消防设备产品
                                    </div>
                                    <div className={styles.product} onClick={this.handleJump.bind(this, '/inspect_protect')}>
                                        <img src={fireIcon} />
                                        火灾防护产品
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className={styles.pic}>
                            <div className={styles.body}>
                    			{
                    				this.state.news.map((n, index) => (
                    				<div key={index} className={styles.news}>
                    					<img src={n.pic} />
                    					<div className={styles.newsTitle}>{n.title}</div>
                    				</div>
                    				))
                    			}
                    		</div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomInner}>
                        <div className={styles.notice}>
                            <div className={styles.noticeIcon}>
                				<img src={noticeIcon} alt="" />
                				<span>通知公告</span>
                    		</div>
                            <div className={styles.lineContaienr}>
                                {
                                    notification.map((noti, index) => (
                                        <div key={index} onClick={this.handleNotificationDetail.bind(this, noti.articleId)} className={styles.line}>
                                            {noti.title}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <div className={styles.contactIcon}>
                				<img src={contactIcon} alt="" />
                				<span>联系电话</span>
                    		</div>
                            <div className={styles.tel}>认证咨询电话：022-58387846</div>
                            <div className={styles.tel}>022-58387826</div>
                            <div className={styles.contactBtn}>
                                <CommonButton onClick={this.handleShowMoreContact} width={120} height={30} content="查看更多"/>
                            </div>
                        </div>
                    </div>
                </div>
                <EnterpriseLoginModal
                    visible={enterpriseLoginModalState}
                    onOk={this.handleLoginSuccess}
                    onCancel={() => { this.setState({ enterpriseLoginModalState: true}) }}
                />
    		</div>
    	)
    }
}

HomeContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const mapStateToProps = state => ({
	category: state.getIn(['article', 'category']),
    articleByCategory: state.getIn(['article', 'articleByCategory']),
    articleDetail: state.getIn(['article', 'articleDetail'])
})

const mapDispatchToProps = dispatch => ({
    setDetailId: bindActionCreators(setDetailId, dispatch),
    getCategory: bindActionCreators(getCategory, dispatch),
    getArticleListByCategory: bindActionCreators(getArticleListByCategory, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer))
