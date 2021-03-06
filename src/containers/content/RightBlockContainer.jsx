import React from 'react'
import PropTypes from 'prop-types'
import styles from './RightBlockContainer.scss'
import reportIcon from 'publicRes/img/report.png'
import fireIcon from 'publicRes/img/fireicon.png'
import CommonButton from '../../components/common/Button'
import moment from 'moment'
import categoryUrl from 'categoryUrl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getRecommendArticle, getArticleDetail, setDetailId } from '../../actions/article'

class RightBlockContainer extends React.Component {
    state = {
        articles: [{
            title: '检测中心以优异的成绩顺利通过CNAS现场评审',
            from: '来自中心管理员',
            time: '2017-09-29',
            url: ''
        },{
            title: 'ISO/TC21 系列会议在柏林召开',
            from: '来自中心管理员',
            time: '2017-09-19',
            url: ''
        },{
            title: '2017年度我中心工厂检查员继续教育面授课圆满成功',
            from: '来自中心管理员',
            time: '2017-09-09',
            url: ''
        },],

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
        }]
    }

    componentWillMount() {
        this.props.getRecommendArticle()
    }

    handleQueryReport = () => {
        this.context.router.history.push('/search_report')
    }

    handleJump = (path) => {
        this.props.setDetailId(-1)
        if (path !== this.props.location.pathname) {
            this.context.router.history.push(path)
        }
    }

    handleCheckDetail(articleId, categoryId) {
        this.props.setDetailId(-1)
        const forwardUrl = categoryUrl.find(c => c.id === categoryId).url
        if (forwardUrl === this.props.match.path.split('/')[1]) {
            this.props.onCheckDetail(articleId)
        } else {
            this.props.getArticleDetail(articleId).then(res => {
                this.props.setDetailId(articleId)
                this.props.history.push(`/${forwardUrl}`)
            })
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.title}>
                        <img src={reportIcon} style={{ width: 20 }} alt="" />
                        <span>检验报告</span>
                    </div>
                    <div className={styles.reportDes}>
                          检验报告原件作废查询 >
                    </div>
                    <div className={styles.reportFooter}>
                        <CommonButton onClick={this.handleQueryReport} height={48} width={120} content="查询报告" />
                    </div>
                </div>

                <div className={styles.box2}>
                    <div className={styles.title}>
                        <img src={reportIcon} style={{ width: 20 }} alt="" />
                        <span>检验范围</span>
                    </div>
                    {
                        this.state.products.map((p, index) => (
                            <div key={index}className={styles.product}>
                                <span onClick={this.handleJump.bind(this, p.url)} >
                                    <img src={fireIcon} style={{ width: 20 }} />
                                    {p.name}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.box3}>
                    <div className={styles.title}>
                        <span>推荐阅读</span>
                    </div>
                    <div className={styles.recommend}>
                        {
                            this.props.recommendList.map((a, index) => (
                            // this.state.articles.map((a, index) => (
                                <div className={styles.line} key={index}>
                                    <div onClick={this.handleCheckDetail.bind(this, a.articleId, a.categoryId)} className={styles.mainLine}>{a.title}</div>
                                    <div className={styles.subLine}>
                                        {a.source + " " + moment(a.publishTime).format('YYYY-MM-DD')}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

RightBlockContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const mapStateToProps = state => ({
    recommendList: state.getIn(['article', 'recommendList']),
    category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getRecommendArticle: bindActionCreators(getRecommendArticle, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
    setDetailId: bindActionCreators(setDetailId, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightBlockContainer))
