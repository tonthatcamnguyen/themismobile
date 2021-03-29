import {
    GET_DETAILYEAR,
    GET_DETAILYEAR_SUCCESS,
    GET_DETAILYEAR_ERROR,
} from '../../../actions/businessReport/detailBusinessYearAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { detailBusinessYearApi } from '../../api/businessReport/detailYearApi'


function* detailBusinessYearSaga() {
    try {
        const response = yield detailBusinessYearApi();
        
        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_DETAILYEAR_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_DETAILYEAR_ERROR, errorLNBase: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_DETAILYEAR_ERROR, errorLNBase: message });
        }
    } catch (errorLNBase) {
        const message = 'không có kết quả trả về!';
        yield put({ type: GET_DETAILYEAR_ERROR, errorLNBase: message });
    }
}


export function* watchDetailBusinessYearSaga() {
    yield takeEvery(GET_DETAILYEAR, detailBusinessYearSaga)
}