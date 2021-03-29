export async function detailBusinessYearApi(input) {

    let url = "https://themismobile01.herokuapp.com/chitietkinhdoanhYear"
  
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