import axios from 'axios';

export async function postProjectDetail() {
    return axios({
        method: 'GET',
        url: 'https://mockthemis.herokuapp.com/chitiet',
        data: null,
  })
}
