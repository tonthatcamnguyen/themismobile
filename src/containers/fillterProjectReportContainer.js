import FillterProjectReport from '../components/fillterProjectReport/FillterProjectReport';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {getNamtinhkhoanAction} from '../redux/actions/index';

const mapStateToProps = (state) => {
  return {
    loadingNam: state.namTinhKhoanReducer.loadingNam,
    dataNam: state.namTinhKhoanReducer.dataNam,
    errorNam: state.namTinhKhoanReducer.errorNam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),
  };
};

class fillterProjectReportContainer extends Component {
  render() {
    return <FillterProjectReport {...this.props} />;
  }
}

export default fillterProjectReportContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(fillterProjectReportContainer)
