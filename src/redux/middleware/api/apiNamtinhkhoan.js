import axios from 'axios';

export async function NamTinhKhoan() {
  return axios({
    method: 'GET',
    url: 'https://themismobile01.herokuapp.com/getNamTinh',
    data: null,
  })
}
