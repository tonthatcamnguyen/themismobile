import {
  GET_DONVIBOPHAN,
  GET_DONVIBOPHAN_SUCCESS,
  GET_DONVIBOPHAN_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {DonViBoPhan} from '../api/apiDonViBoPhan';

export function* watchdonvibophan() {
  yield takeEvery(GET_DONVIBOPHAN, DonvibophanSaga);
}

function* DonvibophanSaga() {
  try {
    const response = yield DonViBoPhan();
    const dataDVBP = response.data;
    //   console.log("responseKy",response);
    if (dataDVBP !== undefined) {
      if (dataDVBP.error_code === 'SUCCESSFUL') {
        yield put({type: GET_DONVIBOPHAN_SUCCESS, response: dataDVBP.data});
      } else {
        yield put({type: GET_DONVIBOPHAN_ERROR, errorDVBP: response.message});
      }
    } else {
      const message = 'không kết nối được server!';
      //console.log(message);
      yield put({type: GET_DONVIBOPHAN_ERROR, errorDVBP: message});
    }
  } catch (errorDVBP) {
    const message = 'không có kết quả trả về!';
    //console.log('errorSaga',errorKy);
    yield put({type: GET_DONVIBOPHAN_ERROR, errorDVBP: message});
  }
}
