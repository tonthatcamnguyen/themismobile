export async function donViBoPhanApi(input) {

    let url = "https://themismobile01.herokuapp.com/getDonViBoPhan"
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
            console.log("error login");
            console.log(error);
        });
}
