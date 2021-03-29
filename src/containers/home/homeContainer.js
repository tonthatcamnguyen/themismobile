import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../../components/home/homeComponent';
import { getBusinessEmpAction } from '../../redux/actions/businessEmp/businessEmpAction';
import { getNamtinhkhoanAction } from '../../redux/actions/index';
import { getKyTinhKhoanAction } from '../../redux/actions/index';

const mapStateToProps = (state) => { 
  return {
    errorBusinessEmp: state.businessEmpReducers.error,
    loadingBusinessEmp: state.businessEmpReducers.loading,
    responseBusinessEmp: state.businessEmpReducers.response,

    loadingNam: state.namTinhKhoanReducer.loadingNam,
    dataNam: state.namTinhKhoanReducer.dataNam,
    errorNam: state.namTinhKhoanReducer.errorNam,

    loadingKy: state.kyTinhKhoanReducer.loadingKy,
    dataKy: state.kyTinhKhoanReducer.dataKy,
    errorKy: state.kyTinhKhoanReducer.errorKy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessEmpAction: (data) => {
      dispatch(getBusinessEmpAction(data));
    },
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),

    getKyTinhKhoanAction: () => dispatch(getKyTinhKhoanAction()),
  };
};

class homeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
}

export default homeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(homeContainer);
