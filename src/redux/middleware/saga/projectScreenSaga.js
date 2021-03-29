import {
  POST_PRODUCT,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postProject} from "../api/projectScreen";

export function* watchPostProject() {
    yield takeEvery(POST_PRODUCT,postProjectFlow);
  }

function* postProjectFlow(){
    try{
        //console.log("SagaProjectScreen");
        const response = yield postProject();
        const data = response.data;
        
        if (data !== undefined ){
            // console.log('1234=====',data.error_code);
            if(data.error_code === "SUCCESSFULL"){
                // console.log("SagaProjectScreen====",data);  
                yield put({type:POST_PRODUCT_SUCCESS,response:data.data});
            }else{
                yield put({type:POST_PRODUCT_ERROR,error: response.message});
            }
        }else{
            const message = 'không kết nối được server!';
            //console.log(message);
            yield put({type:POST_PRODUCT_ERROR,error:message});
        }
    }catch(error){
        const message = 'không có kết quả trả về!';
        //console.log("error o day ne",error);
        yield put({type:POST_PRODUCT_ERROR,error:message});
    }
}

  