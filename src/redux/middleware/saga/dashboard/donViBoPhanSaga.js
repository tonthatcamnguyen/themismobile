import {
    GET_DVBP,
    GET_DVBP_SUCCESS,
    GET_DVBP_ERROR,
} from '../../../actions/dashboard/donViBoPhanAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { donViBoPhanApi } from '../../api/dashboard/donViBoPhanApi'


function* donViBoPhanSaga() {
    try {
        const response = yield donViBoPhanApi();
        // console.log('asadddddddadasdasdasdadasdasdd',response)
        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_DVBP_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_DVBP_ERROR, errorDVBP: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_DVBP_ERROR, errorDVBP: message });
        }
    } catch (errorDVBP) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorDVBP);
        yield put({ type: GET_DVBP_ERROR, errorDVBP: message });
    }
}


export function* watchDVBPSaga() {
    yield takeEvery(GET_DVBP, donViBoPhanSaga)
}
