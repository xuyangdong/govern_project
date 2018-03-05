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
import { searchArticle, getArticleDetail } from '../../actions/article'
import moment from 'moment'

class SearchResultContainer extends React.Component {
    state = {
        showDetail: false,
    }

    constructor(props) {
        super(props)
        this.handleCheckDetail = this.handleCheckDetail.bind(this)
    }

    componentWillMount() {
        if (this.props.hasDetailId !== -1) {
            this.setState({showDetail: true})
        } else {
            let formData = new FormData()
            formData.append('partTitle', this.props.match.params.keyword)
            this.props.searchArticle(formData)

            // if (!this.props.category.size) {
            //     this.props.getCategory().then(res => {
            //         const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
            //         this.props.getArticleListByCategory(categoryId)
            //     })
            // } else {
            //     const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
            //     this.props.getArticleListByCategory(categoryId)
            // }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasDetailId === -1) {
            this.setState({ showDetail: false })
        }
        if (this.props.match.params.keyword !== nextProps.match.params.keyword) {
            let formData = new FormData()
            formData.append('partTitle', nextProps.match.params.keyword)
            this.props.searchArticle(formData)
        }
    }

    handleCheckDetail(articleId) {
        this.props.getArticleDetail(articleId).then(res => {
            this.setState({showDetail: true})
        })
    }

    handleGoBack = () => {
        this.setState({showDetail: false})
    }

    render() {
        const list = this.props.searchResult
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
                                    <div className={styles.title} onClick={this.handleCheckDetail.bind(null, l.articleId)}>
                                        <span>{l.title}</span>
                                        <span className={styles.time}>{moment(l.publishTime).format('YYYY-MM-DD')}</span>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className={styles.right}>
                        <RightBlockContainer></RightBlockContainer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	searchResult: state.getIn(['article', 'searchResult']),
    articleDetail: state.getIn(['article', 'articleDetail']),
    hasDetailId: state.getIn(['article', 'hasDetailId'])
})

const mapDispatchToProps = dispatch => ({
    searchArticle: bindActionCreators(searchArticle, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultContainer))
