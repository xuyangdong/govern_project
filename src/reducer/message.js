import { Map, List } from 'immutable'
import { GET_CAPTCHA, GET_MESSAGE_LIST } from '../actions/message'

const initialState = Map({
    messageList: List([]),
    captcha: ''
})

const message = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA[1]:
            return state.set('captcha', action.payload)
        case GET_MESSAGE_LIST[1]:
            return state.set('messageList', List(action.payload))
    default:
        return state
    }
}

export default message
