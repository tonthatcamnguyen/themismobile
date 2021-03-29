import axios from 'axios';

export async function postProject() {
  return  axios({
        method: 'GET',
        url: 'https://mockthemis.herokuapp.com/baocaonhanviensanxuat',
        data: null,
  })
}
