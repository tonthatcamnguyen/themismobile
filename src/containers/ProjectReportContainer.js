import ProjectReport from "../components/projectReport/ProjectReport";
import {  getquantrithongtinduanAction   } from "../redux/actions/index";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React,{Component} from 'react';

const mapStateToProps = (state) => {
    // console.log('1234==========',state.postProjectScreenReducer.data);
    return {
      loading: state.quantriduanReducer.loading,
      data: state.quantriduanReducer.data,
      error: state.quantriduanReducer.error,

    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getquantrithongtinduanAction : () => dispatch( getquantrithongtinduanAction ()),
    }
  }
  
  class ProjectReportContainer extends Component {
    render() {
      return <ProjectReport {...this.props} />;
    }
  }
  export default ProjectReportContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProjectReportContainer);
  