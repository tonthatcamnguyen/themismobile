import React, {Component} from 'react';
import {connect} from 'react-redux';
import BusinessReport from '../../components/businessReport/BusinessReport';
import {donViBoPhanAction} from '../../redux/actions/dashboard/donViBoPhanAction'
import {getNamtinhkhoanAction} from '../../redux/actions/index'
import {getKyTinhKhoanAction} from '../../redux/actions/index'
import {detailBusinessAction} from '../../redux/actions/businessReport/detailBusinessAction'
import {detailYearsAction} from '../../redux/actions/businessReport/detailBusinessYearAction'
const mapStateToProps = (state) => {
//   console.log(state.donViBoPhanReducer.loadingDVBP)
  return {
    
    loadingNam: state.namTinhKhoanReducer.loadingNam,
    dataNam: state.namTinhKhoanReducer.dataNam,
    errorNam: state.namTinhKhoanReducer.errorNam,

    loadingKy: state.kyTinhKhoanReducer.loadingKy,
    dataKy: state.kyTinhKhoanReducer.dataKy,
    errorKy: state.kyTinhKhoanReducer.errorKy,

    loadingDVBP: state.donViBoPhanReducer.loadingDVBP,
    dataDVBP: state.donViBoPhanReducer.dataDVBP,
    errorDVBP: state.donViBoPhanReducer.errorDVBP,

    loadingDetai: state.detailBusinessReducer.loadingDetai,
    dataDetail: state.detailBusinessReducer.dataDetail,
    errorDetai: state.detailBusinessReducer. errorDetai,
     
    loadingDetaiYear: state.detailYearReducer.loadingDetailYear,
    dataDetailYear: state.detailYearReducer.dataDetailYear,
    errorDetailYear: state.detailYearReducer.errorDetaiYear
     
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    donViBoPhanAction: () => dispatch(donViBoPhanAction()),
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),
    getKyTinhKhoanAction: () => dispatch(getKyTinhKhoanAction()),
    detailBusinessAction: () => dispatch(detailBusinessAction()),
    detailYearsAction : () => dispatch(detailYearsAction()),
  };
};

class businessReportContainer extends Component {
  render() {
   
    return <BusinessReport {...this.props} />;
  }
}

export default businessReportContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(businessReportContainer);
