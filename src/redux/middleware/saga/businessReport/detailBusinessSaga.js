import {
    GET_DETAILKD,
    GET_DETAILKD_SUCCESS,
    GET_DETAILKD_ERROR,
} from '../../../actions/businessReport/detailBusinessAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { detailBusinessApi } from '../../api/businessReport/detailBusinessApi'


function* detailBusinessSaga() {
    try {
        const response = yield detailBusinessApi();
        // console.log('asd',response)
        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_DETAILKD_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_DETAILKD_ERROR, errorLNBase: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_DETAILKD_ERROR, errorLNBase: message });
        }
    } catch (errorLNBase) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorLNBase);
        yield put({ type: GET_DETAILKD_ERROR, errorLNBase: message });
    }
}


export function* watchDetailBusinessSaga() {
    yield takeEvery(GET_DETAILKD, detailBusinessSaga)
}