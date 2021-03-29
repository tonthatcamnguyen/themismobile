export const GET_DVKINHDOANHDUAN = 'GET_DVKINHDOANHDUAN';
export const GET_DVKINHDOANHDUAN_SUCCESS = 'GET_DVKINHDOANHDUAN_SUCCESS';
export const GET_DVKINHDOANHDUAN_ERROR = 'GET_DVKINHDOANHDUAN_ERROR';

export const donViKDDAAction = (info) => {
    return {
        type: GET_DVKINHDOANHDUAN,
        data: info, 
    };
};