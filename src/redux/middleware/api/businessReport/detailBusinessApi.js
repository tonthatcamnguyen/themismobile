export async function detailBusinessApi(input) {

    let url = "https://themismobile01.herokuapp.com/kinhdoanhchitiet"
  
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
            return result
        })
        .catch((error) => {
            console.log(error);
        });
    }