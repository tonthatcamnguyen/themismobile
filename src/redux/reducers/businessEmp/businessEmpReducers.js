import {
    GET_BUSINESSEMP, GET_BUSINESSEMP_ERROR, GET_BUSINESSEMP_SUCCESS
} from "../../actions/businessEmp/businessEmpAction"

const initialState = {
    loading: null,
    response: null,
    error: null
}

const businessEmpReducers = (state = initialState, action) => {
    // console.log('businessEmpReducers',action.response)
    switch (action.type) {
        case GET_BUSINESSEMP:
            return Object.assign({}, state, {
                loading: true,
                response: null,
                error: null
            })

        case GET_BUSINESSEMP_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                response: action.response
            })

        case GET_BUSINESSEMP_ERROR:
            return Object.assign({}, state, {
                loading: false,
                response: null,
                error: action.error
            })
        default:
            return state
    }
}

export default businessEmpReducers