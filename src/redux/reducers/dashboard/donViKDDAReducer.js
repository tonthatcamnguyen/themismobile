import {
    GET_DVKINHDOANHDUAN, GET_DVKINHDOANHDUAN_ERROR, GET_DVKINHDOANHDUAN_SUCCESS
} from "../../actions/dashboard/donViKDDAAction"

const initialState = {
    loadingKDDA: null,
    dataKDDA: null,
    errorKDDA: null
}

const donViKDDAReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DVKINHDOANHDUAN:
            return Object.assign({}, state, {
                loadingKDDA: true,
                dataKDDA: null,
                errorKDDA: null
            })

        case GET_DVKINHDOANHDUAN_SUCCESS:
            return Object.assign({}, state, {
                loadingKDDA: false,
                errorKDDA: null,
                dataKDDA: action.response
            })

        case GET_DVKINHDOANHDUAN_ERROR:
            return Object.assign({}, state, {
                loadingKDDA: false,
                dataKDDA: null,
                errorKDDA: action.error
            })
        default:
            return state
    }
}

export default donViKDDAReducer

