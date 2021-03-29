import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dashboard from '../../components/dashboard/Dasboard';
import {donViAction} from '../../redux/actions/dashboard/donViAction,'
import {donViBoPhanAction} from '../../redux/actions/dashboard/donViBoPhanAction'
import {donViKDDAAction} from '../../redux/actions/dashboard/donViKDDAAction'
import {loiNhuanBaseAction} from '../../redux/actions/dashboard/loiNhuanBaseAction'
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

    errorDonVi: state.donViReducer.errorDonVi,
    loadingDonVi: state.donViReducer.loadingDonVi,
    dataDV: state.donViReducer.dataDV,

    loadingDVBP: state.donViBoPhanReducer.loadingDVBP,
    dataDVBP: state.donViBoPhanReducer.dataDVBP,
    errorDVBP: state.donViBoPhanReducer.errorDVBP,

    loadingKDDA: state.donViKDDAReducer.loadingKDDA,
    dataKDDA: state.donViKDDAReducer.dataKDDA,
    errorKDDA: state.donViKDDAReducer.errorKDDA,

    loadingLNBase: state.loiNhuanBaseReducer.loadingLNBase,
    dataLNBase: state.loiNhuanBaseReducer.dataLNBase,
    errorLNBase: state.loiNhuanBaseReducer.errorLNBase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    donViAction: (data) => {dispatch(donViAction(data)); },
    donViBoPhanAction: (data) => dispatch(donViBoPhanAction(data)),
    donViKDDAAction: (data) => dispatch(donViKDDAAction(data)),
    loiNhuanBaseAction: (data)=> dispatch(loiNhuanBaseAction(data)),
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),
    getKyTinhKhoanAction: () => dispatch(getKyTinhKhoanAction()),
  };
};

class dashboardContainer extends Component {
  render() {
   
    return <Dashboard {...this.props} />;
  }
}

export default dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(dashboardContainer);
