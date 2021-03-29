import {
  POST_PRODUCT,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: '',
  error: null,
};

const postProjectScreenReducer = (state = initialState, action) => {
  //console.log(action.type)
  switch (action.type) {
    case POST_PRODUCT:
      return {
        loading: true,
        data: null,
        error: null,
      }; 
    case POST_PRODUCT_SUCCESS:
      //console.log('asdaas',action);
      return {
        loading: false,
        data: action.response,
        error: null,
      };
    case POST_PRODUCT_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};
export default postProjectScreenReducer;
