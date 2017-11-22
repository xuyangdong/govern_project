import React from 'react'
import PropTypes from 'prop-types'
import banner from 'publicRes/img/banner.png'
import pic1 from 'publicRes/img/pic1.png'
import pic2 from 'publicRes/img/pic2.png'
import pic3 from 'publicRes/img/pic3.png'
import pic4 from 'publicRes/img/pic4.png'
import picNewsIcon from 'publicRes/img/pic.png'
import reportIcon from 'publicRes/img/report.png'
import noticeIcon from 'publicRes/img/notice.png'
import contactIcon from 'publicRes/img/contact.png'
import fireIcon from 'publicRes/img/fireicon.png'
import styles from './HomeContainer.scss'
import CommonButton from '../../components/common/Button'
import LawContainer from './LawContainer.jsx'
import TechCouncilContainer from './TechCouncilContainer.jsx'
import RecommendContainer from './RecommendContainer.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDetailId, getCategory, getArticleListByCategory, getArticleDetail } from '../../actions/article'

class HomeContainer extends React.Component {
    state = {
        products: [{
            name: '火灾警报产品',
            url: '/inspect_119'
        }, {
            name: '火灾防护产品',
            url: '/inspect_protect'
        }, {
            name: '灭火设备产品',
            url: '/inspect_outfire'
        }, {
            name: '消防设备产品',
            url: '/inspect_equipment'
        }, {
            name: '非3C认证产品',
            url: '/inspect_3c'
        }],
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
        notification: []
    }

    componentWillMount() {
        this.props.getCategory().then(res => {
            let categoryId = this.props.category.find(i => i.name === '通知公告').id
            this.props.getArticleListByCategory(categoryId).then(res => {
                this.setState({notification: res.slice(0, 7)})
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
        this.context.router.history.push('/search_report')
    }

    handleMoreContact() {
        console.log('more contact')
    }

    render() {
    	return (
    		<div className={styles.container}>
    			<div className={styles.topImg}>
    				<img alt="top" src={banner} />
    				<div className={styles.slogan}>
    					<span>提高质量，关注消防</span>
    					<br />
    					<span>Improve quality, pay attention to fire fighting</span>
    				</div>
                    <div className={styles.picNews}>
                        <div className={styles.head}>
                            <div className={styles.title}>
                                <img src={picNewsIcon} alt="" />
                                <span>图片新闻</span>
                            </div>
                            <a onClick={this.handleMorePicNews}> 更多 > </a>
                        </div>
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
    				<div className={styles.queryReport}>
    					<div className={styles.title}>
    						<img src={reportIcon} alt="" />
    						<span>检验报告</span>
    					</div>
    					<div className={styles.content}>
                              检验报告原件作废查询 >
                          </div>
    					<div className={styles.footer}>
    						<CommonButton onClick={this.handleQueryReport} height={48} width={120} content="查询报告" />
    					</div>
    				</div>
    			</div>

    			<div className={styles.notification}>
    				<div className={styles.left}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon} style={{marginLeft: '-22px'}}>
    							<img src={reportIcon} alt="" />
    							<span>检验范围</span>
    						</span>
    					</div>
    					{
                            this.state.products.map((p, index) => (
                                <div key={index} className={styles.product}>
                                	<span style={{cursor: 'pointer'}} onClick={this.handleJump.bind(this, p.url)}>
                                		<img src={fireIcon} />
                                		{p.name}
                                	</span>
                                </div>
                            ))
                        }
    				</div>
    				<div className={styles.center}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon}>
    							<img src={noticeIcon} alt="" />
    							<span>通知公告</span>
    						</span>
    					</div>
                        <div className={styles.lineContaienr}>
                            {
                                this.state.notification.slice(0,5).map((l, index) => (
                                    <div key={index} onClick={this.handleNotificationDetail.bind(this, l.articleId)} className={styles.line}>
                                        {l.title}
                                    </div>
                                ))
                            }
                        </div>
    				</div>
    				<div className={styles.right}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon}>
    							<img src={contactIcon} alt="" />
    							<span>联系电话</span>
    						</span>
    					</div>
    					<div className={styles.aboveTel}>认证咨询电话：</div>
    					<div className={styles.tel}>022-58387846</div>
    					<div className={styles.tel}>022-58387826</div>
    					<div className={styles.contactMore} >
    						<CommonButton onClick={this.handleMoreContact} height={48} width={120} content="查看更多" />
    					</div>
    				</div>
    			</div>

    			<LawContainer />
    			<TechCouncilContainer />
    			<RecommendContainer />
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
