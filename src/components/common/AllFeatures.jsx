import React from 'react'
import styles from './AllFeatures.scss'
import PropTypes from 'prop-types'
import RightBlockContainer from '../../containers/content/RightBlockContainer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class AllFeatures extends React.Component {
    state = {
        hoverIndex: 0,
        hoverState: [0,0,0],
        hoverList: [[{
            name: '中心概况',
            path: '/center_intro'
        },{
            name: '法律地位',
            path: '/center_intro'
        },{
            name: '授权证书',
            path: '/center_certificate'
        },{
            name: '重点设备',
            path: '/center_facility'
        },{
            name: '地理位置',
            path: '/center_address'
        }],[{
            name: '火灾报警产品',
            path: 'inspect_119'
        },{
            name: '火灾防护产品',
            path: 'inspect_protect'
        },{
            name: '灭火设备产品',
            path: 'inspect_outfire'
        },{
            name: '消防装备产品',
            path: 'inspect_equipment'
        },{
            name: '非3C认证产品',
            path: 'inspect_3c'
        }],[{
            name: '一分委',
            path: 'committee_one'
        },{
            name: '二分委',
            path: 'committee_two'
        },{
            name: '三分委',
            path: 'committee_three'
        },{
            name: '八分委',
            path: 'committee_eight'
        },{
            name: 'ISO/TC21/SC6',
            path: 'committee_iso'
        }]]
    }

    constructor(props) {
        super(props)
    }

    handleHover = (hoverIndex) => {
        this.setState({hoverIndex})
    }

    handleLeave = () => {
        this.setState({hoverIndex: 0})
    }

    handleJump = (path) => {
        this.context.router.history.push(path)
    }

    render() {
        const { hoverIndex, hoverState, hoverList } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            全部功能
                        </div>
                        <div className={styles.body}>
                            <div className={styles.box} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 1)}>
                                {
                                    hoverIndex === 1 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '中心简介>'
                                }
                            </div>
                            <div className={styles.box} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 2)}>
                                {
                                    hoverIndex === 2 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '检验范围>'
                                }
                            </div>
                            <div className={styles.box} onClick={this.handleJump.bind(this, '/notification')}>通知公告></div>
                            <div className={styles.box} onClick={this.handleJump.bind(this, '/imgNews')}>图片新闻></div>
                            <div className={styles.box} onClick={this.handleJump.bind(this, '/trends')}>行业动态></div>
                            <div className={styles.box} onClick={this.handleJump.bind(this, '/law')}>法律法规></div>
                            <div className={styles.box} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 3)}>
                                {
                                    hoverIndex === 3 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '技术委员会>'
                                }

                            </div>
                            <div className={styles.box}>文件下载></div>
                            <div className={styles.box}>公众留言></div>

                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightBlockContainer></RightBlockContainer>
                    </div>
                </div>
            </div>
        )
    }
}

AllFeatures.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const mapStateToProps = state => ({
	// category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    // getCategory: bindActionCreators(getCategory, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllFeatures))
