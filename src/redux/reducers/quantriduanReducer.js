import {
  GET_THONGTINCHITIETDUAN,
  GET_THONGTINCHITIETDUAN_SUCCESS,
  GET_THONGTINCHITIETDUAN_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: '',
  error: null,
};

const quantriduanReducer = (state = initialState, action) => {
    //console.log(action.type)
    switch (action.type) {
      case  GET_THONGTINCHITIETDUAN:
        return {
          loading: true,
          data: null,
          error: null,
        }; 
      case GET_THONGTINCHITIETDUAN_SUCCESS:
        //console.log('asdaas',action);
        return {
          loading: false,
          data: action.response,
          error: null,
        };
      case GET_THONGTINCHITIETDUAN_ERROR:
        //console.log('asdaas',action);
        return {
          loading: false,
          data: null,
          error: action.error,
        };
      default:
        return state;
    }
  };
  export default quantriduanReducer;
  