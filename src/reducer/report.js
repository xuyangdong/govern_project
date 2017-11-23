import { Map, List } from 'immutable'
import { GET_REPORT_LIST, GET_REPORT_DETAIL, SEARCH_REPORT } from '../actions/report'

const initialState = Map({
    reportList: [],
    reportDetail: {},
    searchResult: [],
})

const message = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_LIST[1]:
            return state.set('reportList', action.payload)
        case GET_REPORT_DETAIL[1]:
            return state.set('reportDetail', action.payload)
        case SEARCH_REPORT:
            return state.set('reportList', action.payload)
    default:
        return state
    }
}

export default message
