import {
    GET_DVBP, GET_DVBP_ERROR, GET_DVBP_SUCCESS
} from "../../actions/dashboard/donViBoPhanAction"

const initialState = {
    loadingDVBP: null,
    dataDVBP: null,
    errorDVBP: null
}

const donViBoPhanReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DVBP:
       
            return Object.assign({}, state, {
                loadingDVBP: true,
                dataDVBP: null,
                errorDVBP: null
            })

        case GET_DVBP_SUCCESS:
            return Object.assign({}, state, {
                loadingDVBP: false,
                errorDVBP: null,
                dataDVBP: action.response
            })

        case GET_DVBP_ERROR:
            return Object.assign({}, state, {
                loadingDVBP: false,
                dataDVBP: null,
                errorDVBP: action.error
            })
        default:
            return state
    }
}

export default donViBoPhanReducer