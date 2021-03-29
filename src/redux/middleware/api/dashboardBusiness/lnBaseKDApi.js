export async function lnBaseKDApi(input) {

    let url = "https://themismobile01.herokuapp.com/lnBaseKinhDoanh"
  
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    })
        .then((response) => {
          
            return response.json();
      
            
        }).then(result => {
            console.log(result)
            return result
        })
        .catch((error) => {
            console.log(error);
        });
    }