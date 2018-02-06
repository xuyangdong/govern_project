import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import mock from './mock'
import article from './article'
import user from './user'
import message from './message'
import report from './report'
import committee from './committee'
import enterprise from './enterprise'

const reducer = combineReducers({
	common,
	article,
	user,
	enterprise,
	message,
	report,
	committee,
    mock,
})

export default reducer
