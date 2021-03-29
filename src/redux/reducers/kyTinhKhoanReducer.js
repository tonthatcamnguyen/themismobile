import {
    GET_KYTINHKHOAN,
    GET_KYTINHKHOAN_SUCCESS,
    GET_KYTINHKHOAN_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    loadingKy: false,
    dataKy: '',
    errorKy: null,
  };
  
  const kyTinhKhoanReducer = (state = initialState, action) => {
    console.log( action);
    switch (action.type) {
      case GET_KYTINHKHOAN:
        return {
          loadingKy: true,
          dataKy: null,
          errorKy: null,
        };
      case GET_KYTINHKHOAN_SUCCESS:
        //console.log('kytinhkhoanReducer', action);
        return {
          loadingKy: false,
          dataKy: action.response,
          errorKy: null,
        };
      case GET_KYTINHKHOAN_ERROR:
        return {
          loadingKy: false,
          dataKy: null,
          errorKy: action.error,
        };
      default:
        return state;
    }
  };
  export default kyTinhKhoanReducer;
  
