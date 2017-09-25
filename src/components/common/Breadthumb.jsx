import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './Breadthumb.scss'
import PropTypes from 'prop-types'
import { updateBreadthumb } from 'actions'

class Breadthumb extends React.Component {
	render(){
        const breadthumb = this.props.breadthumb
		return (
			<div className={styles.container}>
                当前位置：
                {
                    breadthumb.map(b => {
                        return (
                            <span key={b.path}> {b.name} </span>
                        )
                    })
                }
			</div>
		)
	}
}

const mapState = state => ({
    breadthumb: state.getIn(['common', 'breadthumb']),
})

const mapDispatch = dispatch => ({
    // updateBreadthumb: bindActionCreators(updateBreadthumb, dispatch),
})

export default connect(mapState, mapDispatch)(Breadthumb)
