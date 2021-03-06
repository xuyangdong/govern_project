import React from 'react'
import styles from './ReportDetailContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import reportIcon from 'publicRes/img/report.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getReportFile, getReportDetail } from '../../actions/report'
import { Input, Table } from 'antd'
import CommonButton from '../../components/common/Button'
import PDFModal from '../../components/modal/PDFModal'
import EnterpriseLoginModal from '../../components/modal/EnterpriseLoginModal'

class ReportDetailContainer extends React.Component {
    state = {
        isLoading: false,
        PDF_MODAL_STATE: false,
        enterpriseLoginModalState: false,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const id = this.props.match.params.id
        this.props.getReportDetail(id)
        this.props.getReportFile(id)
    }

    handleModalControl = (state) => {
        const token = sessionStorage.getItem('enterpriseAccessToken')
        if (token !== '') {
            this.setState({ PDF_MODAL_STATE: state })
        } else {
            this.setState({ enterpriseLoginModalState: true })
        }
    }

    handleLoginSuccess = () => {
        this.setState({ enterpriseLoginModalState: false })
        this.props.getReportFile(this.props.match.params.id).then(res => {
            this.setState({ PDF_MODAL_STATE: true })
        })
    }

    render() {
        const { enterpriseLoginModalState, isLoading, PDF_MODAL_STATE } = this.state

        const report = this.props.reportDetail
        const file = this.props.reportFile
        console.log(file);

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
                            <div className={styles.line} style={{ height: 190, overflow: 'scroll' }}>
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
                            <div className={styles.line} style={{ cursor: 'pointer' }} onClick={this.handleModalControl.bind(this, true)}>
                                点击查看
                            </div>
                        </div>
                    </div>
                </div>
                {
                    file ?
                    <PDFModal
                        visible={PDF_MODAL_STATE}
                        onOk={this.handleModalControl.bind(this, false)}
                        onCancel={this.handleModalControl.bind(this, false)}
                        file={file}
                    />
                    : null
                }
                {/* <PDFModal
                    visible={PDF_MODAL_STATE}
                    onOk={this.handleModalControl.bind(this, false)}
                    onCancel={this.handleModalControl.bind(this, false)}
                    file={file}
                /> */}

                <EnterpriseLoginModal
                    visible={enterpriseLoginModalState}
                    onOk={this.handleLoginSuccess}
                    onCancel={() => { this.setState({ enterpriseLoginModalState: false}) }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
	reportDetail: state.getIn(['report', 'reportDetail']),
	reportFile: state.getIn(['report', 'reportFile']),
})

const mapDispatchToProps = dispatch => ({
    getReportDetail: bindActionCreators(getReportDetail, dispatch),
    getReportFile: bindActionCreators(getReportFile, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportDetailContainer))
