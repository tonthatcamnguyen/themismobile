import {
  POST_PRODUCTDETAIL,
  POST_PRODUCTDETAIL_SUCCESS,
  POST_PRODUCTDETAIL_ERROR,
} from '../actions/actionTypes';

const initialState = {
    loading:false,
    data:'',
    error:null,
};

const postProjectDetailReducer = (state = initialState,action)=>{
    //console.log(action.type)
    switch (action.type) {
        case POST_PRODUCTDETAIL:
          return {
            loading: true,
            data: null,
            error: null,
          }; 
        case POST_PRODUCTDETAIL_SUCCESS:
          //console.log('projectDetailReducer',action);
          return {
            loading: false,
            data: action.response,
            error: null,
          };
        case POST_PRODUCTDETAIL_ERROR:
          return {
            loading: false,
            data: null,
            error: action.error,
          };
        default:
          return state;
      }
}
export default postProjectDetailReducer;