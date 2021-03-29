import {
    GET_LNBASEKD, GET_LNBASEKD_ERROR, GET_LNBASEKD_SUCCESS
} from "../../actions/dashboardBusiness/LNBaseKDAction"

const initialState = {
    loadingLNBase: null,
    dataLNBaseKD: null,
    errorLNBase: null
}

const lnBaseKDReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_LNBASEKD:
            return Object.assign({}, state, {
                loadingLNBase: true,
                dataLNBaseKD: null,
                errorLNBase: null
            })

        case GET_LNBASEKD_SUCCESS:
            return Object.assign({}, state, {
                loadingLNBase: false,
                errorLNBase: null,
                dataLNBaseKD: action.response
            })

        case GET_LNBASEKD_ERROR:
            return Object.assign({}, state, {
                loadingLNBase: false,
                dataLNBaseKD: null,
                errorLNBase: action.error
            })
        default:
            return state
    }
}

export default lnBaseKDReducer