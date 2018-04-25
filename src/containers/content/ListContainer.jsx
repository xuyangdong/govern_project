import React from 'react'
import styles from './ListContainer.scss'
import CommonButton from '../../components/common/Button'
import Breadthumb from '../../components/common/Breadthumb'
import ListContent from './ListContent'
import ArticleContent from './ArticleContent'
import RightBlockContainer from './RightBlockContainer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { clearArticleListByCategory, getCategory, getArticleListByCategory, getArticleDetail, setDetailId } from '../../actions/article'
import moment from 'moment'

class ListContainer extends React.Component {
    state = {
        showDetail: false,
    }

    constructor(props) {
        super(props)
        this.handleCheckDetail = this.handleCheckDetail.bind(this)
    }

    componentWillMount() {
        this.props.clearArticleListByCategory()
        if (this.props.hasDetailId !== -1) {
            this.setState({showDetail: true})
        } else {
            if (!this.props.category.size) {
                this.props.getCategory().then(res => {
                    const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
                    this.props.getArticleListByCategory(categoryId)
                })
            } else {
                const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
                this.props.getArticleListByCategory(categoryId)
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasDetailId === -1) {
            this.setState({showDetail: false})
        }
    }

    componentWillUnmount() {
        this.props.clearArticleListByCategory()
    }

    handleCheckDetail(articleId) {
        this.props.setDetailId(articleId)
        this.props.getArticleDetail(articleId).then(res => {
            this.setState({showDetail: true})
        })
    }

    handleGoBack = () => {
        const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
        this.props.getArticleListByCategory(categoryId).then(res => {
            this.setState({showDetail: false})
        })

    }

    render() {
        // let list = this.props.articleByCategory
        // list.sort((a, b) => {
        //     if (b.isTop && !a.isTop) {
        //         return true
        //     } else {
        //         return b.publishTime > a.publishTime
        //     }
        // })

        const original = this.props.articleByCategory
        const isTopList = original.filter(a => a.isTop)
        isTopList.sort((a, b) => b.publishTime > a.publishTime)
        const notTopList = original.filter(a => !a.isTop)
        notTopList.sort((a, b) => b.publishTime > a.publishTime)
        const list = isTopList.concat(notTopList)
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb goBack={this.handleGoBack}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {
                            this.state.showDetail ? <ArticleContent article={this.props.articleDetail}/> :
                            list.map((l, index) => (
                                <div key={index} className={styles.line}>
                                    {this.props.contentName === '文件下载' ? <a href={l.fileUrl} download>{l.title}</a> : <div className={styles.title} onClick={this.handleCheckDetail.bind(null, l.articleId)}>
                                        <span style={l.isRed ? {color: '#d23d38'} : null}>{l.title}</span>
                                        <span className={styles.time}>{moment(l.publishTime).format('YYYY-MM-DD')}</span>
                                    </div>}
                                </div>

                            ))
                        }
                    </div>
                    <div className={styles.right}>
                        <RightBlockContainer onCheckDetail={this.handleCheckDetail}></RightBlockContainer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	category: state.getIn(['article', 'category']),
    articleByCategory: state.getIn(['article', 'articleByCategory']),
    articleDetail: state.getIn(['article', 'articleDetail']),
    hasDetailId: state.getIn(['article', 'hasDetailId'])
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    setDetailId: bindActionCreators(setDetailId, dispatch),
    getArticleListByCategory: bindActionCreators(getArticleListByCategory, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
    clearArticleListByCategory: bindActionCreators(clearArticleListByCategory, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer))
