import React from 'react'
import styles from './RecommendContainer.scss'
import subscribeBg from 'publicRes/img/subscribebg.png'
import CommonButton from '../../components/common/Button.jsx'

class RecommendContainer extends React.Component {
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
        socialReport: [{
            name: '2016年度社会社会责任报告',
            url: 'http://www.cncf.com.cn/cncf/upload/2016shzr.doc'
        },{
            name: '2015年度社会社会责任报告',
            url: 'http://www.cncf.com.cn/cncf/upload/2015shehuizeren.doc'
        },{
            name: '2014年度社会社会责任报告',
            url: 'http://www.cncf.com.cn/cncf/upload/2014shehuizeren.doc'
        }],
        friendLink: [{
            name: '公安部天津消防研究所',
            url: 'http://www.tfri.com.cn/'
        },{
            name: '中华人民共和国公安部',
            url: 'http://www.mps.gov.cn/'
        },{
            name: '中国消防产品信息网',
            url: 'http://www.cccf.com.cn/getIndex.do'
        },{
            name: '公安部消防产品合格评定中心',
            url: 'http://www.cccf.net.cn/'
        },{
            name: '中国消防在线',
            url: 'http://119.china.com.cn/'
        },{
            name: '中国消防标准规范网',
            url: 'http://bzgf.119.cn/'
        },{
            name: '中国阻燃产品网',
            url: 'http://www.china-fr.com/'
        },{
            name: '中国消防网',
            url: 'http://www.china-fire.com/'
        }]
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.title}>推荐阅读</div>
                    <div className={styles.content}>
                        {
                            this.state.articles.map((a, index) => (
                                <div className={styles.line} key={index}>
                                    <div className={styles.mainLine}>{a.title}</div>
                                    <div className={styles.subLine}>
                                        {a.from + " " + a.time}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.box1}>
                        <span className={styles.boxTitle}>订阅我们</span>
                        <span className={styles.description}>
                            订阅我们了解行业动态以及最新资讯
                        </span>
                        <CommonButton onClick={this.handleSubscribe} height={30} width={94} content="订阅"></CommonButton>
                    </div>
                    <div className={styles.box2}>
                        <span className={styles.boxTitle}>社会责任报告</span>
                        {
                            this.state.socialReport.map((s, index) => (
                                <a key={index} href={s.url} target="_blank" className={styles.description}>
                                    {s.name}
                                </a>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.box3}>
                        <span className={styles.boxTitle}>友情链接</span>
                        {
                            this.state.friendLink.map((l, index) => (
                                <a key={index} target="_blank" href={l.url} className={styles.description}>
                                    {l.name}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RecommendContainer
