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
                    {
                        info.time ?
                        <span>发布时间：{moment(info.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        :
                        null
                    }
                </div>
                {
                    content === 'default' ?
                    <div><p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>认证咨询电话：022-58387846，022-58387826</p>
                        <p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>业务咨询电话：022-58387823，022-58387827，022-58387829</p>
                        <p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>业务接待大厅传真：022-58387878</p>
                        <p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>样品库电话：022-58387889</p>
                        <p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>监督投诉电话：022-58387887</p>
                        <p style={{marginTop: 15, textIndent: 28, color: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontSize: 14, textAlign: 'justify'}}>总机：022-58387888</p>
                    </div>
                    :
                    <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}>
                    </div>
                }
            </div>
        )
    }
}

export default ArticleContent
