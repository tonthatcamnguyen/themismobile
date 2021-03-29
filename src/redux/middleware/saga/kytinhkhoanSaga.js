import {
    GET_KYTINHKHOAN,
    GET_KYTINHKHOAN_SUCCESS,
    GET_KYTINHKHOAN_ERROR,
  } from '../../actions/actionTypes';
  import {call, takeEvery, put} from 'redux-saga/effects';
  import { KyTinhKhoan } from "../api/apikytinhkhoan";
  
  export function* watchKyTinhKhoan(){
      yield takeEvery (GET_KYTINHKHOAN,kyTinhKhoanSaga)
  }
  
  function* kyTinhKhoanSaga(){
      try {
          const response = yield KyTinhKhoan();
          const dataKy = response.data;
        //   console.log("responseKy",response);
          if (dataKy !== undefined) {
              if (dataKy.error_code ==="SUCCESSFUL") {
                  yield put({type:GET_KYTINHKHOAN_SUCCESS,response:dataKy.data});
              } else {
                  yield put({type:GET_KYTINHKHOAN_ERROR,errorKy: response.message});
              }
          } else {
              const message = 'không kết nối được server!';
              //console.log(message);
              yield put ({type:GET_KYTINHKHOAN_ERROR,errorKy:message});
          }
      } catch (errorKy) {
          const message = 'không có kết quả trả về!';
          //console.log('errorSaga',errorKy);
          yield put({type:GET_KYTINHKHOAN_ERROR,errorKy:message});
      }
  }
  
