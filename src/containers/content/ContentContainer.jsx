import React from 'react'
import styles from './ContentContainer.scss'
import reportIcon from 'publicRes/img/report.png'
import fireIcon from 'publicRes/img/fireicon.png'
import CommonButton from '../../components/common/Button'
import Breadthumb from '../../components/common/Breadthumb'
import ArticleContent from './ArticleContent'
import RightBlockContainer from './RightBlockContainer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory, getArticleByCategory } from '../../actions/article'

class ContentContainer extends React.Component {
    state = {
        showContent: false,
        article: null
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (this.props.contentName === '联系电话') {
            const article = {
                title: '联系电话',
                publishTime: 1509687891000,
                content: 'default'
            }
            this.setState({showContent: true, article})
        } else if (!this.props.category.size) {
            this.props.getCategory().then(res => {
                const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
                this.props.getArticleByCategory(categoryId).then(res => {
                    this.setState({showContent: true, article: this.props.articleByCategory[0]})
                })
            })
        } else {
            const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
            this.props.getArticleByCategory(categoryId).then(res => {
                this.setState({showContent: true, article: this.props.articleByCategory[0]})
            })
        }
    }

    render() {
        console.log(this.state.article);
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {
                            this.state.showContent ? <ArticleContent article={this.state.article} /> : null
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
    articleByCategory: state.getIn(['article', 'articleByCategory'])
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    getArticleByCategory: bindActionCreators(getArticleByCategory, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentContainer))
