import React from 'react'
import banner from 'publicRes/img/banner.png'
import reportIcon from 'publicRes/img/report.png'
import noticeIcon from 'publicRes/img/notice.png'
import contactIcon from 'publicRes/img/contact.png'
import fireIcon from 'publicRes/img/fireicon.png'
import styles from './HomeContainer.scss'
import CommonButton from '../../components/common/Button'
import LawContainer from './LawContainer.jsx'
import TechCouncilContainer from './TechCouncilContainer.jsx'
import RecommendContainer from './RecommendContainer.jsx'

class HomeContainer extends React.Component {
    state = {
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
    handleMoreContact() {
        console.log('more contact')
    }
    render() {
    	return (
    		<div className={styles.container}>
    			<div className={styles.topImg}>
    				<img alt="top" src={banner} />
    				<div className={styles.slogan}>
    					<span>提高质量，关注消防</span>
    					<br />
    					<span>Improve quality, pay attention to fire fighting</span>
    				</div>
    				<div className={styles.queryReport}>
    					<div className={styles.title}>
    						<img src={reportIcon} alt="" />
    						<span>检验报告</span>
    					</div>
    					<div className={styles.content}>
                              检验报告原件作废查询 >
                          </div>
    					<div className={styles.footer}>
    						<CommonButton onClick={this.handleQueryReport} height={48} width={120} content="查询报告" />
    					</div>
    				</div>
    			</div>

    			<div className={styles.notification}>
    				<div className={styles.left}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon}>
    							<img src={reportIcon} alt="" />
    							<span>检验报告</span>
    						</span>
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
    				<div className={styles.center}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon}>
    							<img src={noticeIcon} alt="" />
    							<span>通知公告</span>
    						</span>
    					</div>
    				</div>
    				<div className={styles.right}>
    					<div className={styles.cardTitle}>
    						<span className={styles.titleWithIcon}>
    							<img src={contactIcon} alt="" />
    							<span>联系电话</span>
    						</span>
    					</div>
    					<div className={styles.aboveTel}>认证咨询电话：</div>
    					<div className={styles.tel}>022-58387846</div>
    					<div className={styles.tel}>022-58387826</div>
    					<div className={styles.contactMore} >
    						<CommonButton onClick={this.handleMoreContact} height={48} width={120} content="查看更多" />
    					</div>
    				</div>
    			</div>

    			<LawContainer />
    			<TechCouncilContainer />
    			<RecommendContainer />
    		</div>
    	)
    }
}

export default HomeContainer
