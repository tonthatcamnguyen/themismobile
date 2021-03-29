import axios from 'axios';

export async function getquantriduan() {
  return axios({
    method: 'GET',
    url: 'https://mockthemis.herokuapp.com/quantriduanThongtinduan',
    data: null,
  });
}
