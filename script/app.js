const apiKey = "bPvCCZM88k66UZXoKNKFiP66bA1HCe4B";

let contAll = document.getElementById("trends");

async function buscar() {
    try {
        let data = await (fetch(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${apiKey}&limit=1`));
        let data2 = data.json();
        console.log(data2);

        let image = document.createElement("img");

        image.setAttribute('src', data.data2.url);
        contAll.appendChild(image);
    } catch (error) {
        console.log("Errorrrrrrr:", error);
    }

}
buscar();