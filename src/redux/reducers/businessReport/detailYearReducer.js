import {
    GET_DETAILYEAR, GET_DETAILYEAR_ERROR, GET_DETAILYEAR_SUCCESS
} from "../../actions/businessReport/detailBusinessYearAction"

const initialState = {
    loadingDetaiYear: null,
    dataDetailYear: null,
    errorDetaiYear: null
}

const detailYearReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_DETAILYEAR:
            return Object.assign({}, state, {
                loadingDetailYear: true,
                dataDetailYear: null,
                errorDetaiYear: null
            })

        case GET_DETAILYEAR_SUCCESS:
            return Object.assign({}, state, {
                loadingDetailYear: false,
                errorDetaiYear: null,
                dataDetailYear: action.response
            })

        case GET_DETAILYEAR_ERROR:
            return Object.assign({}, state, {
                loadingDetailYear: false,
                dataDetailYear: null,
                errorDetaiYear: action.error
            })
        default:
            return state
    }
}

export default detailYearReducer