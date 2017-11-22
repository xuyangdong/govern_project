import React from 'react'
import styles from './SearchReportContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getReportList } from '../../actions/report'
import { Input, Table } from 'antd'
import CommonButton from '../../components/common/Button'

class SearchReportContainer extends React.Component {
    state = {
        isLoading: false,
        currentPage: 0,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({isLoading: true})
        this.props.getReportList(0, 10).then(res => this.setState({isLoading: false}))
    }

    handleSearchReport = () => {

    }

    render() {
        const { isLoading, currentPage } = this.state

        const columns = [{
            title: '报告编号',
            dataIndex: 'pactNumber',
            key: 'pactNumber',
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

        const data = this.props.reportList.get(currentPage + '')

        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                    <div className={styles.filter}>

                        <span>报告编号：</span>
                        <Input />
                        <span>产品名称：</span>
                        <Input />
                        <span>生产单位：</span>
                        <Input />

						<CommonButton onClick={this.handleSearchReport} height={28} width={60} content="查询" />

                    </div>
                    <div className={styles.reportList}>
                        <Table loading={isLoading} rowKey={record => record.rid} columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	reportList: state.getIn(['report', 'reportList']),
})

const mapDispatchToProps = dispatch => ({
    getReportList: bindActionCreators(getReportList, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchReportContainer))
