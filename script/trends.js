'use strict';

const apiKey = "bPvCCZM88k66UZXoKNKFiP66bA1HCe4B";

let contAll = document.getElementById("trends");

async function buscar() {
    try {
        //Hacemos una llamada a la API.
        let request = await (fetch(`https://api.giphy.com/v1/trending/searches?&api_key=${apiKey}`));
        //Lo parseamos a JSON.
        let response = await request.json();
        //Creamos un parrafo(p) que va a contener lo que nos devuelve.
        let text = document.createElement('p');
        //Recortamos el arreglo devuelto con .splice(desde, hasta). 
        response.data.splice(5, 20);
        //Al contenido del parrafo que creamos antes le agregamos los arreglos y entre cada arreglo le agregamos una ', '.
        text.textContent = response.data.join(", ");
        //Finalmente a nuestro articulo le agreagamos el parrafo.
        contAll.appendChild(text);
    } catch (error) {
        console.log("Error:", error);
    }

}
buscar();
//Esto es para mostrar un gif
// async function buscar() {
//     try {
//         let request = await (fetch(`https://api.giphy.com/v1/gifs/random?api_key=bPvCCZM88k66UZXoKNKFiP66bA1HCe4B&tag=&rating=g`));
//         let response = await request.json();
//         console.log(response);
//         let gif = document.createElement('div');
//         let text = document.createElement('p');
//         text.textContent = response.data[0];
//         gif.style.width = "200px";
//         gif.style.height = "200px";
//         gif.style.backgroundSize = "contain";
//         gif.style.backgroundImage = `url(${response.data.images.fixed_width.url})`;
//         contAll.appendChild(text);
//         contAll.appendChild(gif);
//     } catch (error) {
//         console.log("Error:", error);
//     }

// }