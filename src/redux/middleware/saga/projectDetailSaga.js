import {
  POST_PRODUCTDETAIL,
  POST_PRODUCTDETAIL_SUCCESS,
  POST_PRODUCTDETAIL_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postProjectDetail} from '../api/apiProjectDetail';

export function* watchPostProjectDetail(){
    yield takeEvery (POST_PRODUCTDETAIL,postProjectDetailSaga);
}

function*postProjectDetailSaga(){
    try {
        //console.log("SagaProjectDetail");
        const response = yield postProjectDetail();
        const data = response.data;
        if (data !== undefined) {
            if (data.error_code ==="SUCCESSFUL") {
                yield put({type:POST_PRODUCTDETAIL_SUCCESS,response:data.data});
            } else {
                yield put({type:POST_PRODUCTDETAIL_ERROR,error: response.message});
            }
        } else {
            const message = 'không kết nối được server!';
            //console.log(message);
            yield put ({type:POST_PRODUCTDETAIL_ERROR,error:message});
        }
    } catch (error) {
        const message = 'không có kết quả trả về!';
        //console.log(message);
        yield put({type:POST_PRODUCT_ERROR,error:message});
    }
}