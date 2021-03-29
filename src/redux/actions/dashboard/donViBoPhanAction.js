export const GET_DVBP = 'GET_DVBP';
export const GET_DVBP_SUCCESS = 'GET_DVBP_SUCCESS';
export const GET_DVBP_ERROR = 'GET_DVBP_ERROR';

export const donViBoPhanAction = (info) => {
    // console.log('donViBoPhanAction')
    return {
        type: GET_DVBP,
        data: info, 
    };
};