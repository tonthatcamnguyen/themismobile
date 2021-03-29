import axios from 'axios';

export async function KyTinhKhoan() {
  return axios({
    method: 'GET',
    url: 'https://themismobile01.herokuapp.com/getKyTinhKhoan',
    data: null,
  });
}
