import {
    POST_LOGIN, POST_LOGIN_ERROR, POST_LOGIN_SUCCESS
} from "../actions/actionTypes"

const initialState = {
    loading: null,
    response: null,
    error: null
}

const loginReducers = (state = initialState, action) => {
   
    switch (action.type) {
        case POST_LOGIN:
            return Object.assign({}, state, {
                loading: true,
                response: null,
                error: null
            })

        case POST_LOGIN_SUCCESS:
            console.log('Login_SUCCESS')
            return Object.assign({}, state, {
                loading: false,
                error: null,
                response: action.response
            })

        case POST_LOGIN_ERROR:
            return Object.assign({}, state, {
                loading: false,
                response: null,
                error: action.error
            })
        default:
            return state
    }
}

export default loginReducers