import axios from 'axios';

export async function DonViBoPhan() {
    return axios({
        method: 'GET',
        url: 'https://mockthemis.herokuapp.com/getbophandonvi',
        data: null,
  })
}
