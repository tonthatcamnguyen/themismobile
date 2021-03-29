import {combineReducers} from 'redux';
import postProjectScreenReducer from './postProjectScreenReducer';
import loginReducers from './loginReducers';
import postProjectDetailReducer from "./postProjectDetailReducer";
import postDashboardProjReducer from "./postDashboardProjReducer";
import businessEmpReducers from './businessEmp/businessEmpReducers';
import kyTinhKhoanReducer from "./kyTinhKhoanReducer";
import namTinhKhoanReducer from "./namTinhKhoanReducer";
import donvibophanReducer from "./donvibophanReducer";
import quantriduanReducer from "./quantriduanReducer";
import donViBoPhanReducer from '../../redux/reducers/dashboard/donViBoPhanReducer'
import donViKDDAReducer from '../../redux/reducers/dashboard/donViKDDAReducer'
import loiNhuanBaseReducer from '../../redux/reducers/dashboard/loiNhuanBaseReducer'
import donViReducer from '../../redux/reducers/dashboard/donViReducer'
import lnBaseKDReducer from '../../redux/reducers/dashboardBusiness/lnBaseKDReducer'
import detailBusinessReducer from '../../redux/reducers/businessReport/detailBusinessReducer'
import detailYearReducer from '../../redux/reducers/businessReport/detailYearReducer'

const allReducers = combineReducers({
  postProjectDetailReducer,
  postProjectScreenReducer,
  loginReducers,
  postDashboardProjReducer,
  businessEmpReducers,
  kyTinhKhoanReducer,
  namTinhKhoanReducer,
  donvibophanReducer,
  quantriduanReducer,
  donViBoPhanReducer,
  donViReducer,
  loiNhuanBaseReducer,
  donViKDDAReducer,
  lnBaseKDReducer,
  detailBusinessReducer,
  detailYearReducer
});

export default allReducers;
