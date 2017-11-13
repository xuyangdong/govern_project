import { Map, List } from 'immutable'

const initialState = Map({
    isLogin: false,
    info: null,
})

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.set('isLogin', action.isLogin).set('info', action.info)
        case 'LOGOUT_SUCCESS':
            return state.set('isLogin', action.isLogin).set('info', null)
    default:
        return state
    }
}

export default user
