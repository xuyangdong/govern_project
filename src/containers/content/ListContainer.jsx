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
import { getCategory, getArticleListByCategory, getArticleDetail } from '../../actions/article'
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
        if (!this.props.category.size) {
            this.props.getCategory().then(res => {
                const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
                this.props.getArticleListByCategory(categoryId).then(res => {
                    console.log(this.props.articleByCategory);
                })
            })
        } else {
            const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
            this.props.getArticleListByCategory(categoryId).then(res => {
                console.log(this.props.articleByCategory);
            })
        }
    }

    handleCheckDetail(articleId) {
        this.props.getArticleDetail(articleId).then(res => {
            this.setState({showDetail: true})
        })
    }

    render() {
        const list = this.props.articleByCategory
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
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
	category: state.getIn(['article', 'category']),
    articleByCategory: state.getIn(['article', 'articleByCategory']),
    articleDetail: state.getIn(['article', 'articleDetail'])
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    getArticleListByCategory: bindActionCreators(getArticleListByCategory, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer))
