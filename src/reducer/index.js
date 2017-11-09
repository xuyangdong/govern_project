import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import mock from './mock'
import article from './article'
import committee from './committee'

const reducer = combineReducers({
	common,
	article,
	committee,
    mock,
})

export default reducer
