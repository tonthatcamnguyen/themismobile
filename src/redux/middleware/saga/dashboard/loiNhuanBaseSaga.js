import {
    GET_LNBASE,
    GET_LNBASE_SUCCESS,
    GET_LNBASE_ERROR,
} from '../../../actions/dashboard/loiNhuanBaseAction';
import { call, takeEvery, put } from 'redux-saga/effects';
import { loiNhuanBaseApi } from '../../api/dashboard/loiNhuanBaseApi'


function* loiNhuanBaseSaga() {
    try {
        const response = yield loiNhuanBaseApi();
        // console.log('asd',response)
        if (response !== undefined) {
            if (response.error_code === "SUCCESSFUL") {

                yield put({ type: GET_LNBASE_SUCCESS, response: response.data });
            } else {
                yield put({ type: GET_LNBASE_ERROR, errorLNBase: response.message });
            }
        } else {
            const message = 'không kết nối được server!';
            console.log(message);
            yield put({ type: GET_LNBASE_ERROR, errorLNBase: message });
        }
    } catch (errorLNBase) {
        const message = 'không có kết quả trả về!';
        //console.log('errorSaga',errorLNBase);
        yield put({ type: GET_LNBASE_ERROR, errorLNBase: message });
    }
}


export function* watchLNBaseSaga() {
    yield takeEvery(GET_LNBASE, loiNhuanBaseSaga)
}