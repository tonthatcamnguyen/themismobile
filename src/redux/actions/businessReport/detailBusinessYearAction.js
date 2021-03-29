export const GET_DETAILYEAR = 'GET_DETAILYEAR';
export const GET_DETAILYEAR_SUCCESS = 'GET_DETAILYEAR_SUCCESS';
export const GET_DETAILYEAR_ERROR = 'GET_DETAILYEAR_ERROR';

export const detailYearsAction = (info) => {
  
    
    return {
        type: GET_DETAILYEAR,
        data: info, 
    };
};