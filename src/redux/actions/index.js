import {
  INCREMENT,
  POST_LOGIN,
  POST_PRODUCT,
  POST_PRODUCTDETAIL,
  POST_DASHBOARDPROJECT,
  GET_KYTINHKHOAN,
  GET_NAMTINHKHOAN,
  GET_DONVIBOPHAN,
  GET_THONGTINCHITIETDUAN
} from './actionTypes';

export const increaseAction = (step) => {
  return {
    type: INCREMENT,
    step: step,
  };
};

export const postProjectHomeAction = () => {
  return {
    type: POST_PRODUCT,
    // data:{token}
  };
};

export const loginAction = (user) => {
  return {
    type: POST_LOGIN,
    data: {user},
  };
};

export const postProjectDetailAction = () => {
  return {
    type: POST_PRODUCTDETAIL,
    //data:data,
  };
};

export const postDashboardProjectAction = () => {
    return {
      type: POST_DASHBOARDPROJECT,
      //data:data,
    };
  };

  export const getKyTinhKhoanAction = () => {
    return {
      type: GET_KYTINHKHOAN,
      //data:data,
    };
  };

  export const getNamtinhkhoanAction = () =>{
    return {
      type: GET_NAMTINHKHOAN,
      //data:data,
    }
  }

  export const getbophandonviAction = () =>{
    return {
      type: GET_DONVIBOPHAN,
      //data:data,
    }
  }

  export const getquantrithongtinduanAction =()=>{
    return{
      type: GET_THONGTINCHITIETDUAN,
      //data:data,
    }
  }
