import { Map, List, fromJS } from 'immutable'

const initialState = Map({
    breadthumb: List([{
        name: '首页',
        path: '/'
    }])
})

const common = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_BREADTHUMB':
            return state.set('breadthumb', action.payload.breadthumb)
    default:
        return state
    }
}

export default common
