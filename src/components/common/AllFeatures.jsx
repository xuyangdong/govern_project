import React from 'react'
import styles from './AllFeatures.scss'
import PropTypes from 'prop-types'
import RightBlockContainer from '../../containers/content/RightBlockContainer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import pic1 from 'publicRes/img/all_features/中心简介.png'
import pic1_hover from 'publicRes/img/all_features/中心简介hover.png'
import pic2 from 'publicRes/img/all_features/检验范围.png'
import pic2_hover from 'publicRes/img/all_features/检验范围hover.png'
import pic3 from 'publicRes/img/all_features/技术委员会.png'
import pic3_hover from 'publicRes/img/all_features/技术委员会hover.png'
import pic4 from 'publicRes/img/all_features/通知公告.png'
import pic4_hover from 'publicRes/img/all_features/通知公告hover.png'
import pic5 from 'publicRes/img/all_features/图片新闻.png'
import pic5_hover from 'publicRes/img/all_features/图片新闻hover.png'
import pic6 from 'publicRes/img/all_features/行业动态.png'
import pic6_hover from 'publicRes/img/all_features/行业动态hover.png'
import pic7 from 'publicRes/img/all_features/法律法规.png'
import pic7_hover from 'publicRes/img/all_features/法律法规hover.png'
import pic8 from 'publicRes/img/all_features/文件下载.png'
import pic8_hover from 'publicRes/img/all_features/文件下载hover.png'
import pic9 from 'publicRes/img/all_features/公众留言.png'
import pic9_hover from 'publicRes/img/all_features/公众留言hover.png'
import pic10 from 'publicRes/img/all_features/企业用户.png'
import pic10_hover from 'publicRes/img/all_features/企业用户hover.png'

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
                            <div className={styles.box} style={hoverIndex === 1 ? {backgroundImage: 'url('+pic1_hover+')'} : {backgroundImage: 'url('+pic1+')'}} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 1)}>
                                {
                                    hoverIndex === 1 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '中心简介>'
                                }
                            </div>
                            <div className={styles.box} style={hoverIndex === 2 ? {backgroundImage: 'url('+pic2_hover+')'} : {backgroundImage: 'url('+pic2+')'}} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 2)}>
                                {
                                    hoverIndex === 2 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '检验范围>'
                                }
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/notification')}
                                style={hoverIndex === 4 ? {backgroundImage: 'url('+pic4_hover+')'} : {backgroundImage: 'url('+pic4+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 4)}
                            >
                                通知公告>
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/imgNews')}
                                style={hoverIndex === 5 ? {backgroundImage: 'url('+pic5_hover+')'} : {backgroundImage: 'url('+pic5+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 5)}
                            >
                                图片新闻>
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/trends')}
                                style={hoverIndex === 6 ? {backgroundImage: 'url('+pic6_hover+')'} : {backgroundImage: 'url('+pic6+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 6)}
                            >
                                行业动态>
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/law')}
                                style={hoverIndex === 7 ? {backgroundImage: 'url('+pic7_hover+')'} : {backgroundImage: 'url('+pic7+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 7)}
                            >
                                法律法规>
                            </div>
                            <div className={styles.box} style={hoverIndex === 3 ? {backgroundImage: 'url('+pic3_hover+')'} : {backgroundImage: 'url('+pic3+')'}} onMouseLeave={this.handleLeave} onMouseEnter={this.handleHover.bind(this, 3)}>
                                {
                                    hoverIndex === 3 ?
                                    hoverList[hoverIndex-1].map((i, index) => (
                                        <span key={index} onClick={this.handleJump.bind(this, i.path)}>{i.name}</span>
                                    ))
                                    :
                                    '技术委员会>'
                                }

                            </div>
                            <div
                                className={styles.box}
                                style={hoverIndex === 8 ? {backgroundImage: 'url('+pic8_hover+')'} : {backgroundImage: 'url('+pic8+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 8)}
                            >
                                文件下载>
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/leave_message')}
                                style={hoverIndex === 9 ? {backgroundImage: 'url('+pic9_hover+')'} : {backgroundImage: 'url('+pic9+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 9)}
                            >
                                公众留言>
                            </div>
                            <div
                                className={styles.box}
                                onClick={this.handleJump.bind(this, '/enterprise_user')}
                                style={hoverIndex === 10 ? {backgroundImage: 'url('+pic10_hover+')'} : {backgroundImage: 'url('+pic10+')'}}
                                onMouseLeave={this.handleLeave}
                                onMouseEnter={this.handleHover.bind(this, 10)}
                            >
                                企业用户>
                            </div>

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
