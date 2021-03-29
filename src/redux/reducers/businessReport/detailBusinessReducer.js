import {
    GET_DETAILKD, GET_DETAILKD_ERROR, GET_DETAILKD_SUCCESS
} from "../../actions/businessReport/detailBusinessAction"

const initialState = {
    loadingDetai: null,
    dataDetail: null,
    errorDetai: null
}

const detailBusinessReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_DETAILKD:
            return Object.assign({}, state, {
                loadingDetai: true,
                dataDetail: null,
                errorDetai: null
            })

        case GET_DETAILKD_SUCCESS:
            return Object.assign({}, state, {
                loadingDetai: false,
                errorDetai: null,
                dataDetail: action.response
            })

        case GET_DETAILKD_ERROR:
            return Object.assign({}, state, {
                loadingDetai: false,
                dataDetail: null,
                errorDetai: action.error
            })
        default:
            return state
    }
}

export default detailBusinessReducer