import React from 'react'
import styles from './ArticleContent.scss'
import moment from 'moment'

class ArticleContent extends React.Component {
    state = {
        title: '',
        info: {},
        content: ''
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (this.props.article) {
            const article = this.props.article
            this.setState({title: article.title, content: article.content, info: {time: article.publishTime}})
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('next: ',nextProps.article);
    //     if (nextProps.article) {
    //         const article = nextProps.article
    //         this.setState({title: article.title, content: article.content, info: {time: article.publishTime}})
    //     } else if (nextProps.article[0]) {
    //         const article = nextProps.article[0]
    //         this.setState({title: article.title, content: article.content, info: {time: article.publishTime}})
    //     }
    // }

    render() {
        const {title, content, info} = this.state
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.info}>
                    发布时间：{moment(info.time).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}>
                </div>
            </div>
        )
    }
}

export default ArticleContent
