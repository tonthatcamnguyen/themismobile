import {
  POST_DASHBOARDPROJECT,
  POST_DASHBOARDPROJECT_SUCCESS,
  POST_DASHBOARDPROJECT_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import { postDashboardProject } from "../api/apiLeadershipReportProj";

export function* watchPostDashboardPoject(){
    yield takeEvery (POST_DASHBOARDPROJECT,postDashboardProjectSaga);
}

function* postDashboardProjectSaga(){
    try {
        //console.log("SagaProjectDetail");
        const response = yield postDashboardProject();
        const data = response.data;
        if (data !== undefined) {
            if (data.error_code ==="SUCCESSFUL") {
                yield put({type:POST_DASHBOARDPROJECT_SUCCESS,response:data.data});
            } else {
                yield put({type:POST_DASHBOARDPROJECT_ERROR,error: response.message});
            }
        } else {
            const message = 'không kết nối được server!';
            //console.log(message);
            yield put ({type:POST_DASHBOARDPROJECT_ERROR,error:message});
        }
    } catch (error) {
        const message = 'không có kết quả trả về!';
        //console.log(message);
        yield put({type:POST_DASHBOARDPROJECT_ERROR,error:message});
    }
}