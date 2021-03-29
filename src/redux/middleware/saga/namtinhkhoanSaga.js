import {
    GET_NAMTINHKHOAN,
    GET_NAMTINHKHOAN_SUCCESS,
    GET_NAMTINHKHOAN_ERROR,
  } from '../../actions/actionTypes';
  import {call, takeEvery, put} from 'redux-saga/effects';
  import { NamTinhKhoan } from "../api/apiNamtinhkhoan";
  
  export function* watchNamTinhKhoanSaga(){
      yield takeEvery(GET_NAMTINHKHOAN,namTinhKhoanSaga)
  }
  
  function* namTinhKhoanSaga(){
      try{
          const response = yield NamTinhKhoan();
          const dataNam = response.data;
          if(dataNam !== undefined){
              if (dataNam.error_code ==="SUCCESSFUL"){
                  yield put({type:GET_NAMTINHKHOAN_SUCCESS,response:dataNam.data});
              }else{
                  yield put({type:GET_NAMTINHKHOAN_ERROR,errorNam: response.message});
              }
          }else{
              const message = 'không kết nối được server năm tính khoán !';
            //   console.log(message);
              yield put ({type:GET_NAMTINHKHOAN_ERROR,errorNam:message});
          }
      }catch (errorNam){
          const message = 'không có kết quả trả về!';
          //console.log('errorSaga',errorKy);
          yield put({type:GET_NAMTINHKHOAN_ERROR,errorNam:message});
      }
  }

