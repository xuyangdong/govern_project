import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import mock from './mock'
import article from './article'

const reducer = combineReducers({
	common,
	article,
    mock,
})

export default reducer
