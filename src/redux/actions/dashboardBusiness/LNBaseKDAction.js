export const GET_LNBASEKD = 'GET_LNBASEKD';
export const GET_LNBASEKD_SUCCESS = 'GET_LNBASEKD_SUCCESS';
export const GET_LNBASEKD_ERROR = 'GET_LNBASEKD_ERROR';

export const lnBaseKDAction = (info) => {
    return {
        type: GET_LNBASEKD,
        data: info, 
    };
};