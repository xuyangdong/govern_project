import React from 'react'
import PropTypes from 'prop-types'
import styles from './LawContainer.scss'
import leftPic from 'publicRes/img/laws.png'
import midPic from 'publicRes/img/authentication.png'
import rightPic from 'publicRes/img/inspection.png'
import CommonButton from '../../components/common/Button.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDetailId, getCategory, getArticleListByCategory, getArticleDetail } from '../../actions/article'

class LawContainer extends React.Component {
    state = {
        law: []
        // law: [{
        //     name: '阻燃制品标识管理办法（实行）',
        //     url: ''
        // },{
        //     name: '民用建筑外保温系统及外墙装饰防火暂行规定',
        //     url: ''
        // }]
    }
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getCategory().then(res => {
            let categoryId = this.props.category.find(i => i.name === '法律法规').id
            this.props.getArticleListByCategory(categoryId).then(res => {
                this.setState({law: res})
            })
        })
    }

    handleLawDetail = (articleId) => {
        this.props.getArticleDetail(articleId).then(res => {
            this.props.setDetailId(articleId)
            this.context.router.history.push('/law')
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.title}>法律法规</div>
                    <div className={styles.content}>
                        <img src={leftPic} />
                        {
                            this.state.law.slice(0,5).map((l, index) => (
                                <div key={index} onClick={this.handleLawDetail.bind(this, l.articleId)} className={styles.line}>
                                    {l.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>认证专栏</div>
                    <div className={styles.content}>
                        <img src={midPic} />
                         {
                            this.state.law.map((l, index) => (
                                <div key={index} onClick={this.handleLawDetail.bind(this, index)} className={styles.line}>
                                    {l.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>送检流程</div>
                    <div className={styles.content}>
                        <img src={rightPic} />
                        <div className={styles.process}>
                            <span className={styles.description}>
                                产品检验流程分为检验流程，送检流程和急送样品流程，点击查看具体流程信息
                            </span>
                            <CommonButton width={148} height={48} content="查看送检流程"></CommonButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LawContainer.contextTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LawContainer))
