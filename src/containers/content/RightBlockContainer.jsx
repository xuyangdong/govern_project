import React from 'react'
import styles from './RightBlockContainer.scss'
import reportIcon from 'publicRes/img/report.png'
import fireIcon from 'publicRes/img/fireicon.png'
import CommonButton from '../../components/common/Button'

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
            url: ''
        }, {
            name: '火灾防护产品',
            url: ''
        }, {
            name: '灭火设备产品',
            url: ''
        }, {
            name: '消防设备产品',
            url: ''
        }, {
            name: '非3C认证产品',
            url: ''
        }]
    }

    handleQueryReport() {
        console.log('query report')
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.title}>
                        <img src={reportIcon} alt="" />
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
                        <img src={reportIcon} alt="" />
                        <span>检验范围</span>
                    </div>
                    {
                        this.state.products.map((p, index) => (
                            <div key={index} className={styles.product}>
                                <span>
                                    <img src={fireIcon} />
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
            </div>
        )
    }
}

export default RightBlockContainer
