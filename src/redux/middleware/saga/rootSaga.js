import {all} from 'redux-saga/effects';

//import { watchLoginSaga } from './login/loginSaga'
import {watchBusinessEmpSaga} from './businessEmp/businessEmpSaga';
import {watchKyTinhKhoan} from './kytinhkhoanSaga';
import {watchPostProject} from './projectScreenSaga';
import {watchLoginSaga} from './loginSaga';
import {watchPostProjectDetail} from './projectDetailSaga';
import {watchPostDashboardPoject} from './postDashboardprojSaga';
import {watchNamTinhKhoanSaga} from './namtinhkhoanSaga';
import { watchDVBPSaga} from './dashboard/donViBoPhanSaga';
import { watchDVKDDASaga } from './dashboard/donViKDDASaga';
import { watchLNBaseSaga } from './dashboard/loiNhuanBaseSaga';
import {watchDonViSaga} from './dashboard/donViSaga'
import {watchLNBaseKDSaga} from './dashboardBusiness/lnBaseKDSaga'
import {watchDetailBusinessSaga} from './businessReport/detailBusinessSaga'
import {watchDetailBusinessYearSaga} from './businessReport/detailBusinessYearSaga'

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchPostProject(),
    watchPostProjectDetail(),
    watchPostDashboardPoject(),
    watchBusinessEmpSaga(),
    watchKyTinhKhoan(),
    watchNamTinhKhoanSaga(),
    watchDVBPSaga(),
    watchDVKDDASaga(),
    watchLNBaseSaga(),
    watchDonViSaga(),
    watchLNBaseKDSaga(),
    watchDetailBusinessSaga(),
    watchDetailBusinessYearSaga(),
  ]);
}
