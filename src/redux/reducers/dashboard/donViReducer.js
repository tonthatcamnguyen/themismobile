import {
    GET_TTDV, GET_TTDV_ERROR, GET_TTDV_SUCCESS
} from "../../actions/dashboard/donViAction,"

const initialState = {
    loadingDonVi: null,
    dataDV: null,
    errorDonVi: null
}

const donViReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TTDV:
            return Object.assign({}, state, {
                loadingDonVi: true,
                dataDV: null,
                errorDonVi: null
            })

        case GET_TTDV_SUCCESS:
            return Object.assign({}, state, {
                loadingDonVi: false,
                errorDonVi: null,
                dataDV: action.response
            })

        case GET_TTDV_ERROR:
            return Object.assign({}, state, {
                loadingDonVi: false,
                dataDV: null,
                errorDonVi: action.error
            })
        default:
            return state
    }
}

export default donViReducer