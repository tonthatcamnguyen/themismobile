import {
  GET_THONGTINCHITIETDUAN,
  GET_THONGTINCHITIETDUAN_SUCCESS,
  GET_THONGTINCHITIETDUAN_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import { getquantriduan } from "../api/apiquantriduan";

export function* watchquantriduan() {
    yield takeEvery(GET_THONGTINCHITIETDUAN,getquantriduanFlow);
  }

function* getquantriduanFlow(){
    try{
        //console.log("Sagaquanttriduan");
        const response = yield getquantriduan();
        const data = response.data;
        //console.log("Sagaquanttriduan",data);
        if (data !== undefined ){
             //console.log('1234=====',data.error_code);
            if(data.error_code === "SUCCESSFUL"){
                //console.log("SagaProjectScreen====",data);  
                yield put({type:GET_THONGTINCHITIETDUAN_SUCCESS,response:data.data});
            }else{
                yield put({type:GET_THONGTINCHITIETDUAN_ERROR,error: response.message});
            }
        }else{
            const message = 'không kết nối được server!';
           // console.log(message);
            yield put({type:GET_THONGTINCHITIETDUAN_ERROR,error:message});
        }
    }catch(error){
        const message = 'không có kết quả trả về!';
        //console.log("error o day ne",error);
        yield put({type:GET_THONGTINCHITIETDUAN_ERROR,error:message});
    }
}

  