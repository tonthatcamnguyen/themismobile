import {
    GET_TTDV,
    GET_TTDV_SUCCESS,
    GET_TTDV_ERROR,
} from '../../../actions/dashboard/donViAction,';
import { call, takeEvery, put } from 'redux-saga/effects';
import { donViApi } from '../../api/dashboard/donViApi'

export function* watchDonViSaga() {
    yield takeEvery(GET_TTDV, donViSaga)
}

function* donViSaga() {
    try {
        const response = yield donViApi();
        if (response !== undefined) {
            
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_TTDV_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_TTDV_ERROR, errorDVBP: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_TTDV_ERROR, errorDV: message });
        }
    } catch (errorDV) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorDV);
        yield put({ type: GET_TTDV_ERROR, errorDV: message });
    }
}