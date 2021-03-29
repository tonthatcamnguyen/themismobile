import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../components/login/Login';
import{ postLoginAction} from '../redux/actions/index';

export class loginContainer extends Component {
  render() {
      return (
          <Login {...this.props} />
      )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      onPostLoginAction: (data) => {
          dispatch(postLoginAction(data));
      },

  };
};
const mapStateToProps = (state) => {
  return {
      errorLogin: state.loginReducers.error,
      loadingLogin: state.loginReducers.loading,
      responseLogin: state.loginReducers.response,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(loginContainer)
