export const GET_LNBASE = 'GET_LNBASE';
export const GET_LNBASE_SUCCESS = 'GET_LNBASE_SUCCESS';
export const GET_LNBASE_ERROR = 'GET_LNBASE_ERROR';

export const loiNhuanBaseAction = (info) => {
    return {
        type: GET_LNBASE,
        data: info, 
    };
};