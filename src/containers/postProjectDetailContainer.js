import ProductDetail from "../components/DetailProject/ProducDetail";
import { postProjectDetailAction } from "../redux/actions/index";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React,{Component} from 'react';

const mapStateToProps = (state) => {
    return {
      loading: state.postProjectDetailReducer.loading,
      data: state.postProjectDetailReducer.data,
      error: state.postProjectDetailReducer.error,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        postProjectDetailAction: () => dispatch(postProjectDetailAction()),
    }
  }
  
  class ProductDetialContainer extends Component {
    render() {
      return <ProductDetail {...this.props} />;
    }
  }
  export default ProductDetialContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductDetialContainer);
  