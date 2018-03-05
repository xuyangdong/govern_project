import React from 'react'
import styles from './SearchInput.scss'
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDetailId, searchArticle } from '../../actions/article'

class SearchInput extends React.Component {
    state = {
        keyword: ''
    }

    handleInputChange = (e) => {
        const keyword = e.target.value
        this.setState({ keyword })
    }

    handleSearch = () => {
        if (this.state.keyword) {
            this.props.setDetailId(-1)
            this.props.history.replace(`/search/${this.state.keyword}`)
        }
        // window.location.reload()
    }

	render(){
		return (
			<div className={styles.container}>
				<div className={styles.addonBefore}>站内搜索</div>
				<div className={styles.inputWrapper}>
    				<Input value={this.state.keyword} onChange={this.handleInputChange} />
				</div>
				<div onClick={this.handleSearch} className={styles.addonAfter}><Icon type="search" /></div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    searchArticle: bindActionCreators(searchArticle, dispatch),
    setDetailId: bindActionCreators(setDetailId, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchInput))
