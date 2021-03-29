export const GET_TTDV = 'GET_TTDV';
export const GET_TTDV_SUCCESS = 'GET_TTDV_SUCCESS';
export const GET_TTDV_ERROR = 'GET_TTDV_ERROR';

export const donViAction = (info) => {
    // console.log('donViAction')
    return {
        type: GET_TTDV,
        data: info, 
    };
};