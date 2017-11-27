import React from 'react'
import PropTypes from 'prop-types'
import styles from './SearchReportContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getReportList, searchReport } from '../../actions/report'
import { Input, Table } from 'antd'
import CommonButton from '../../components/common/Button'

class SearchReportContainer extends React.Component {
    state = {
        isLoading: false,
        reportNumber: '',
        productName: '',
        producer: ''
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({isLoading: true})
        this.props.getReportList().then(res => this.setState({isLoading: false}))
    }

    handleSearchReport = () => {
        const {reportNumber, productName, producer} = this.state
        let formData = new FormData()
        formData.append('reportNumber', reportNumber)
        formData.append('productName', productName)
        formData.append('productUnit', producer)
        this.props.searchReport(formData)
    }

    handleCheckDetail = (record) => {
        this.context.router.history.push(`/search_report/${record.rid}`)
    }

    handleReportNumberChange = (e) => {
        this.setState({reportNumber: e.target.value})
    }

    handleProductNameChange = (e) => {
        this.setState({productName: e.target.value})
    }

    handleProducerChange = (e) => {
        this.setState({producer: e.target.value})
    }

    render() {
        const { isLoading } = this.state

        const columns = [{
            title: '报告编号',
            dataIndex: 'reportNumber',
            key: 'reportNumber',
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '生产单位',
            dataIndex: 'productUnit',
            key: 'productUnit',
        }, {
            title: '检验类别',
            dataIndex: 'checkTypeName',
            key: 'checkTypeName',
        }];

        const data = this.props.reportList

        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                    <div className={styles.filter}>

                        <span>报告编号：</span>
                        <Input onChange={this.handleReportNumberChange}/>
                        <span>产品名称：</span>
                        <Input onChange={this.handleProductNameChange}/>
                        <span>生产单位：</span>
                        <Input onChange={this.handleProducerChange}/>

						<CommonButton onClick={this.handleSearchReport} height={28} width={60} content="查询" />

                    </div>
                    <div className={styles.reportList}>
                        <Table onRowClick={this.handleCheckDetail} loading={isLoading} rowKey={record => record.rid} columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        )
    }
}

SearchReportContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const mapStateToProps = state => ({
	reportList: state.getIn(['report', 'reportList']),
})

const mapDispatchToProps = dispatch => ({
    getReportList: bindActionCreators(getReportList, dispatch),
    searchReport: bindActionCreators(searchReport, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchReportContainer))
