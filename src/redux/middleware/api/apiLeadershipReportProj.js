import axios from 'axios';

export async function postDashboardProject() {
    return axios({
        method: 'GET',
        url: 'https://mockthemis.herokuapp.com/baocaolanhdaoDA',
        data: null,
  })
}
