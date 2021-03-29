import {
  POST_DASHBOARDPROJECT,
  POST_DASHBOARDPROJECT_ERROR,
  POST_DASHBOARDPROJECT_SUCCESS,
} from '../actions/actionTypes';

const initialState ={
    loading:false,
    data:'',
    error:null,
};

const postDashboardProjReducer = (state = initialState,action)=>{
    //console.log(action.type)
    switch (action.type) {
        case POST_DASHBOARDPROJECT:
          return {
            loading: true,
            data: null,
            error: null,
          }; 
        case POST_DASHBOARDPROJECT_SUCCESS:
          console.log('dashboardProjectReducer',action);
          return {
            loading: false,
            data: action.response,
            error: null,
          };
        case POST_DASHBOARDPROJECT_ERROR:
          return {
            loading: false,
            data: null,
            error: action.error,
          };
        default:
          return state;
      }
}
export default postDashboardProjReducer