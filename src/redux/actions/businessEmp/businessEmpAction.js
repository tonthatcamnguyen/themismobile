export const GET_BUSINESSEMP = 'GET_BUSINESSEMP';
export const GET_BUSINESSEMP_SUCCESS = 'GET_BUSINESSEMP_SUCCESS';
export const GET_BUSINESSEMP_ERROR = 'GET_BUSINESSEMP_ERROR';

export const getBusinessEmpAction = (input) => { 
    return {
        type: GET_BUSINESSEMP,
        data: input,
    };
};