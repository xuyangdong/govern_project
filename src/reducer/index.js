import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import mock from './mock'
import article from './article'
import user from './user'
import message from './message'
import committee from './committee'

const reducer = combineReducers({
	common,
	article,
	user,
	message,
	committee,
    mock,
})

export default reducer
