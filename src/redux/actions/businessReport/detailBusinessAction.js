export const GET_DETAILKD = 'GET_DETAILKD';
export const GET_DETAILKD_SUCCESS = 'GET_DETAILKD_SUCCESS';
export const GET_DETAILKD_ERROR = 'GET_DETAILKD_ERROR';

export const detailBusinessAction = (info) => {
    return {
        type: GET_DETAILKD,
        data: info, 
    };
};

