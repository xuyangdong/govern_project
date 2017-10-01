import React from 'react'
import styles from './TechCouncilContainer.scss'
import oldVersion from 'publicRes/img/oldbg.png'
import CommonButton from '../../components/common/Button'

class TechCouncilContainer extends React.Component {
    state = {
        techCouncil: [{
            name: '一分委',
            url: ''
        },{
            name: '二分委',
            url: ''
        },{
            name: '三分委',
            url: ''
        },{
            name: '八分委',
            url: ''
        },{
            name: 'ISO/TC21/SC6',
            url: ''
        },],
        files: [{
            name: '开具增值税专用发票申请表',
            url: ''
        },{
            name: '检验申请合同书',
            url: ''
        },{
            name: '2015年12月15日防火卷帘检验报告确认交流会议附件',
            url: ''
        }]
    }
    constructor(props) {
        super(props)
    }
    handleTechDetail(index) {
        console.log(index)
    }
    handleBackToOld() {
        window.open("http://www.cncf.com.cn/manage/html/index.html")
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.title}>技术委员会</div>
                    <div className={styles.content}>
                        {
                            this.state.techCouncil.map((t, index) => (
                                <div key={index} className={styles.line} onClick={this.handleTechDetail.bind(this,index)}>
                                    {t.name}
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>文件下载</div>
                    <div className={styles.content}>
                        {
                            this.state.files.map((f, index) => (
                                <div key={index} className={styles.line} onClick={this.handleTechDetail.bind(this,index)}>
                                    {f.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.oldVersion}>
                        <span className={styles.description}>
                            请点击以跳转回旧版网站，新版网站上线前的部分信息可能不显示，请回旧版查看。
                        </span>
                        <CommonButton onClick={this.handleBackToOld} height={48} width={120} content="跳转旧版"></CommonButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default TechCouncilContainer
