import React from 'react'
import styles from './ReportDetailContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import reportIcon from 'publicRes/img/report.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getReportDetail } from '../../actions/report'
import { Input, Table } from 'antd'
import CommonButton from '../../components/common/Button'

class ReportDetailContainer extends React.Component {
    state = {
        isLoading: false,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const id = this.props.match.params.id
        this.props.getReportDetail(id)
    }

    handleSearchReport = () => {

    }

    render() {
        const { isLoading } = this.state

        const report = this.props.reportDetail

        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.companyInfo}>
                            <div className={styles.header}>
                                <img src={reportIcon} /> 企业信息
                            </div>
                            <div className={styles.line}>
                                <div>生产单位：{ report.productUnit }</div>
                                <div>曾用名：{ report.oldName }</div>
                                <div>地区：{ report.area }</div>
                                <div>地址：{ report.address }</div>
                                <div>邮编：{ report.postalcode }</div>
                                <div>电话：{ report.tel }</div>
                            </div>
                        </div>
                        <div className={styles.relatedProduct}>
                            <div className={styles.header}>
                                <img src={reportIcon} /> 相关产品
                            </div>
                            <div className={styles.line}>

                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.productInfo}>
                            <div className={styles.header}>
                                <img src={reportIcon} /> 产品信息
                            </div>
                            <div className={styles.line}>
                                <div>报告编号：{ report.reportNumber }</div>
                                <div>产品名称：{ report.productName }</div>
                                <div>型号规格：{ report.specification }</div>
                                <div>生产单位：{ report.productUnit }</div>
                                <div>检验类别：{ report.checkTypeName }</div>
                                <div>检验依据：{ report.checkBasis }</div>
                                <div>样品等级：</div>
                                <div>检验项目：{ report.checkItem }</div>
                                <div>检验结论：<span dangerouslySetInnerHTML={{__html: report.testResult}}></span></div>
                                <div>签发日期：{ report.signatureDate }</div>
                            </div>
                        </div>
                        <div className={styles.report}>
                            <div className={styles.header}>
                                <img src={reportIcon} /> 检验报告
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	reportDetail: state.getIn(['report', 'reportDetail']),
})

const mapDispatchToProps = dispatch => ({
    getReportDetail: bindActionCreators(getReportDetail, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportDetailContainer))
