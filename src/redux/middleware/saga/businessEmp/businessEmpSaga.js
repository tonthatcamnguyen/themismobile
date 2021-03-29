import {
    GET_BUSINESSEMP, GET_BUSINESSEMP_ERROR, GET_BUSINESSEMP_SUCCESS
} from "../../../actions/businessEmp/businessEmpAction";

import { call, takeEvery, put } from "redux-saga/effects";
import { businessEmpApi } from '../../api/businessEmp/businessEmpApi'

const error = "Không có dữ liệu";

function* businessEmpSaga(action) {
    try {

        const response = yield businessEmpApi();
        // console.log("responseeeeeeeeeeeeeeeeee",response);
        if (response === undefined) {
            yield put({ type: GET_BUSINESSEMP_ERROR, error });
        } else {
            yield put({ type: GET_BUSINESSEMP_SUCCESS, response });
        }
    } catch (error) {
        const err = "Không kết nối được với máy chủ";
        console.log(err)
        yield put({ type: GET_BUSINESSEMP_ERROR, err });
    }
}
export function* watchBusinessEmpSaga() {
    yield takeEvery(GET_BUSINESSEMP, businessEmpSaga);
}