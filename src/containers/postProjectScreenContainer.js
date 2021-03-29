import Produces from '../components/product/ProductScreen';
import {postProjectHomeAction,getKyTinhKhoanAction} from '../redux/actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React,{Component} from 'react';

const mapStateToProps = (state) => {
  // console.log('1234==========',state.postProjectScreenReducer.data);
  return {
    loading: state.postProjectScreenReducer.loading,
    data: state.postProjectScreenReducer.data,
    error: state.postProjectScreenReducer.error,

    loadingKy : state.kyTinhKhoanReducer.loadingKy,
    dataKy : state.kyTinhKhoanReducer.dataKy,
    errorKy: state.kyTinhKhoanReducer.errorKy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProjectHomeAction: () => dispatch(postProjectHomeAction()),
    getKyTinhKhoanAction: ()=> dispatch(getKyTinhKhoanAction()),
  }
}

class ProductScreenContainer extends Component {
  render() {
    return <Produces {...this.props} ></Produces>;
  }
}
export default ProductScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductScreenContainer);
