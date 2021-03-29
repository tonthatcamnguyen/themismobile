import {
    GET_LNBASEKD,
    GET_LNBASEKD_SUCCESS,
    GET_LNBASEKD_ERROR,
} from '../../../actions/dashboardBusiness/LNBaseKDAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { lnBaseKDApi } from '../../api/dashboardBusiness/lnBaseKDApi'

function* lnBaseKDSaga() {
    try {
        const response = yield lnBaseKDApi();
        // console.log('asd',response)
        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_LNBASEKD_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_LNBASEKD_ERROR, errorLNBase: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_LNBASEKD_ERROR, errorLNBase: message });
        }
    } catch (errorLNBase) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorLNBase);
        yield put({ type: GET_LNBASEKD_ERROR, errorLNBase: message });
    }
}


export function* watchLNBaseKDSaga() {
    yield takeEvery(GET_LNBASEKD, lnBaseKDSaga)
}