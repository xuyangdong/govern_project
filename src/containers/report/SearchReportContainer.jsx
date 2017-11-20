import React from 'react'
import styles from './SearchReportContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory, getArticleByCategory } from '../../actions/article'
import { Input, Table } from 'antd'
import CommonButton from '../../components/common/Button'

class SearchReportContainer extends React.Component {
    state = {
        article: null
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    handleSearchReport = () => {

    }

    render() {
        const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

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
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	// category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    // getCategory: bindActionCreators(getCategory, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchReportContainer))
