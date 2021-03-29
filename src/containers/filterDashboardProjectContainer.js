import FillterDashboardProject from '../components/filterDashboardProject/FilterdashboardProject';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  getNamtinhkhoanAction,
  getbophandonviAction,
} from '../redux/actions/index';

const mapStateToProps = (state) => {
  return {
    loadingNam: state.namTinhKhoanReducer.loadingNam,
    dataNam: state.namTinhKhoanReducer.dataNam,
    errorNam: state.namTinhKhoanReducer.errorNam,

    loadingDVBP: state.donvibophanReducer.loadingDVBP,
    dataDVBP: state.donvibophanReducer.dataDVBP,
    errorDVBP: state.donvibophanReducer.errorDVBP,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNamtinhkhoanAction: () => dispatch(getNamtinhkhoanAction()),
    getbophandonviAction: () => dispatch(getbophandonviAction()),
  };
};

class fillterDashboardProjectContainer extends Component {
  render() {
    return <FillterDashboardProject {...this.props} />;
  }
}

export default fillterDashboardProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(fillterDashboardProjectContainer);
