import React from 'react'
import styles from './ReportDetailContainer.scss'
import Breadthumb from '../../components/common/Breadthumb'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {  } from '../../actions/report'
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
        // this.setState({isLoading: true})
        // this.props.getReportList().then(res => this.setState({isLoading: false}))
    }

    handleSearchReport = () => {

    }

    render() {
        const { isLoading } = this.state

        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}>
                    <Breadthumb />
                </div>
                <div className={styles.content}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	// reportList: state.getIn(['report', 'reportList']),
})

const mapDispatchToProps = dispatch => ({
    // getReportList: bindActionCreators(getReportList, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportDetailContainer))
