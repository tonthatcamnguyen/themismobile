import { API_URL } from '../../../config/settings'
export async function loginApi(input) {
  console.log('dzzzzzzzzzooooooooooooooooooooooooooooooooooooooooooo');
    var data ={
        user:"tienltt8@fpt.com.vn"
    }

    let url = "/Mobile/login";
    console.log("link", API_URL + url)
    return fetch(API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
          
            return response.json();
        })
        .catch((error) => {
            console.log("error login");
            console.log(error);
        });
}