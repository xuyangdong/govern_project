import { Map, List } from 'immutable'
import { GET_COMMITTEE_INFO,COMMITTEE_LOGIN } from '../actions/committee'

const initialState = Map({
    committeeInfo: {},
})

const committee = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMITTEE_INFO[1]:
            return state.set('committeeInfo', action.payload)
        case COMMITTEE_LOGIN[1]:
            return state.set('committeeMember', action.payload)
    default:
        return state
    }
}

export default committee
