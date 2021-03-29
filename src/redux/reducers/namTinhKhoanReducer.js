import {
    GET_NAMTINHKHOAN,
    GET_NAMTINHKHOAN_SUCCESS,
    GET_NAMTINHKHOAN_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    loadingNam: false,
    dataNam: '',
    errorNam: null,
  };

  const namTinhKhoanReducer = (state = initialState, action) => {
    // console.log('ReducerNamTinh', action);
    switch (action.type) {
      case GET_NAMTINHKHOAN:
        return {
          loadingNam: true,
          dataNam: null,
          errorNam: null,
        };
      case GET_NAMTINHKHOAN_SUCCESS:
        return {
          loadingNam: false,
          dataNam: action.response,
          errorNam: null,
        };
      case GET_NAMTINHKHOAN_ERROR:
        return {
          loadingNam: false,
          dataNam: null,
          errorNam: action.error,
        };
        default:
            return state;
    }
  };
  export default namTinhKhoanReducer;
