import {
  GET_DONVIBOPHAN,
  GET_DONVIBOPHAN_SUCCESS,
  GET_DONVIBOPHAN_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loadingDVBP: false,
  dataDVBP: '',
  errorDVBP: null,
};

const donvibophanReducer = (state = initialState, action) => {
  // console.log('kytinhkhoanactionreducer', action);
  switch (action.type) {
    case GET_DONVIBOPHAN:
      return {
        loadingDVBP: true,
        dataDVBP: null,
        errorDVBP: null,
      };
    case GET_DONVIBOPHAN_SUCCESS:
      //console.log('kytinhkhoanReducer', action);
      return {
        loadingDVBP: false,
        dataDVBP: action.response,
        errorDVBP: null,
      };
    case GET_DONVIBOPHAN_ERROR:
      return {
        loadingDVBP: false,
        dataDVBP: null,
        errorDVBP: action.error,
      };
    default:
      return state;
  }
};
export default donvibophanReducer;
