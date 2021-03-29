import DashboardProject from '../components/DashboardProject/DashboardProject';
import {postDashboardProjectAction} from '../redux/actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';

const mapStateToProps = (state) => {
  return {
    loading: state.postDashboardProjReducer.loading,
    data: state.postDashboardProjReducer.data,
    error: state.postDashboardProjReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postDashboardProjectAction: () => dispatch(postDashboardProjectAction()),
  };
};

class DashboardProjContainer extends Component {
  render() {
    return <DashboardProject {...this.props} />;
  }
}

export default DashboardProjContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardProjContainer);
