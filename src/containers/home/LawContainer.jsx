import React from 'react'
import styles from './LawContainer.scss'
import leftPic from 'publicRes/img/laws.png'
import midPic from 'publicRes/img/authentication.png'
import rightPic from 'publicRes/img/inspection.png'
import CommonButton from '../../components/common/Button.jsx'

class LawContainer extends React.Component {
    state = {
        law: [{
            name: '阻燃制品标识管理办法（实行）',
            url: ''
        },{
            name: '民用建筑外保温系统及外墙装饰防火暂行规定',
            url: ''
        }]
    }
    constructor(props) {
        super(props)
    }
    handleLawDetail(index) {
        console.log(index)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.title}>法律法规</div>
                    <div className={styles.content}>
                        <img src={leftPic} />
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

export default LawContainer
