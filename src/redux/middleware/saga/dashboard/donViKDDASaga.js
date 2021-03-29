import {
    GET_DVKINHDOANHDUAN,
    GET_DVKINHDOANHDUAN_SUCCESS,
    GET_DVKINHDOANHDUAN_ERROR,
} from '../../../actions/dashboard/donViKDDAAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { donViDVKDDAApi } from '../../api/dashboard/donViKDDAApi'

export function* watchDVKDDASaga() {
    yield takeEvery(GET_DVKINHDOANHDUAN, donViKDDASaga)
}

function* donViKDDASaga() {
    try {
        const response = yield donViDVKDDAApi();
        console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', response);

        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_DVKINHDOANHDUAN_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_DVKINHDOANHDUAN_ERROR, errorDVBP: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_DVKINHDOANHDUAN_ERROR, errorDV: message });
        }
    } catch (errorKDDA) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorDV);
        yield put({ type: GET_DVKINHDOANHDUAN_ERROR, errorDV: message });
    }
}