
export async function businessEmpApi(input) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 9f68a10e-2cf9-4132-b17d-f4480964523c-1611469083347");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "_firo_crfs=_W3q9c7XnzuZLBUNQQJsypdj7kNq73WDrHLZg-0aftpZxbeb6F37QPiypCnBsYhfF5U=; adfs=1; sstk=10e6a801-0e41-4aa8-b0fb-34d875deec88-1615193066096");

    var raw = JSON.stringify();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        // redirect: 'follow'
    };
    
     return fetch("https://themismobile01.herokuapp.com/baocaokhoanNhanvien", requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error businessEmpApi', error));

        

}
