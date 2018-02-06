import { Map, List } from 'immutable'
import { GET_ENTERPRISE, GET_ENTERPRISE_BY_ID } from '../actions/enterprise'

const initialState = Map({
    id: -1,
    name: '',
    info: {}
})

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_ENTERPRISE:
            return state.set('id', action.payload.id).set('name', action.payload.enterpriseName)
        case GET_ENTERPRISE_BY_ID:
            return state.set('info', action.payload)
    default:
        return state
    }
}

export default user
