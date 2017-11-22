import { Map, List } from 'immutable'
import { GET_REPORT_LIST } from '../actions/report'

const initialState = Map({
    reportList: []
})

const message = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_LIST[1]:
            return state.set('reportList', action.payload)
    default:
        return state
    }
}

export default message
