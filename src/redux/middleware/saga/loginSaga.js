import {
    POST_LOGIN, POST_LOGIN_SUCCESS, POST_LOGIN_ERROR

} from "../../actions/actionTypes";

import { call, takeEvery, put } from "redux-saga/effects";
import { loginApi } from '../api/loginApi'

const error = "Không có dữ liệu";

function* loginSaga(action) {
    try {
        // console.log("dataSG", action.data)
        // let response = {
        //     "error_code": "SUCCESSFUL",
        //     "error_message": "",
        //     "data": "6f0a0474-a8d5-46f8-9acc-fd21a03b1843-1612407735834"
        // }
        // yield put({ type: POST_LOGIN_SUCCESS, response });


        const response = yield loginApi(action.data);
        // console.log("response", response);
        if (response === undefined) {
            yield put({ type: POST_LOGIN_ERROR, error });
        } else {
            yield put({ type: POST_LOGIN_SUCCESS, response });
        }
    } catch (error) {
        const err = "Không kết nối được với máy chủ";
        console.log(err)
        yield put({ type: LOGIN_ERROR, err });
    }
}
export function* watchLoginSaga() {
    yield takeEvery(POST_LOGIN, loginSaga);
}