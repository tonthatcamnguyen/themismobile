import {
    GET_LNBASE, GET_LNBASE_ERROR, GET_LNBASE_SUCCESS
} from "../../actions/dashboard/loiNhuanBaseAction"

const initialState = {
    loadingLNBase: null,
    dataLNBase: null,
    errorLNBase: null
}

const loiNhuanBaseReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_LNBASE:
            return Object.assign({}, state, {
                loadingLNBase: true,
                dataLNBase: null,
                errorLNBase: null
            })

        case GET_LNBASE_SUCCESS:
            return Object.assign({}, state, {
                loadingLNBase: false,
                errorLNBase: null,
                dataLNBase: action.response
            })

        case GET_LNBASE_ERROR:
            return Object.assign({}, state, {
                loadingLNBase: false,
                dataLNBase: null,
                errorLNBase: action.error
            })
        default:
            return state
    }
}

export default loiNhuanBaseReducer