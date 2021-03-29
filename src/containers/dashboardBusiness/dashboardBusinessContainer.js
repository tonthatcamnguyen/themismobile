import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardBusiness from '../../components/dashboardBusiness/dashboardBusiness';
import {donViBoPhanAction} from '../../redux/actions/dashboard/donViBoPhanAction'
import {lnBaseKDAction} from '../../redux/actions/dashboardBusiness/LNBaseKDAction'
import {getNamtinhkhoanAction} from '../../redux/actions/index'
import {getKyTinhKhoanAction} from '../../redux/actions/index'
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

    loadingLNBase: state.lnBaseKDReducer.loadingLNBase,
    dataLNBaseKD: state.lnBaseKDReducer.dataLNBaseKD,
    errorLNBase: state.lnBaseKDReducer.errorLNBase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    donViBoPhanAction: (data) => dispatch(donViBoPhanAction(data)),
    lnBaseKDAction: (data)=> dispatch(lnBaseKDAction(data)),
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),
    getKyTinhKhoanAction: () => dispatch(getKyTinhKhoanAction()),
  };
};

class dashboardBusinessContainer extends Component {
  render() {
   
    return <DashboardBusiness {...this.props} />;
  }
}

export default dashboardBusinessContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(dashboardBusinessContainer);
