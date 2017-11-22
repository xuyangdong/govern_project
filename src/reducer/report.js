import { Map, List } from 'immutable'
import { GET_REPORT_LIST } from '../actions/report'

const initialState = Map({
    reportList: Map({})
})

const message = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_LIST[1]:
            const {page, list} = action.payload
            const newList = {}
            newList[page] = list
            return state.update('reportList', v => v.merge(Map(newList)))
    default:
        return state
    }
}

export default message
