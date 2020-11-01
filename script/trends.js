'use strict';

const apiKey = "bPvCCZM88k66UZXoKNKFiP66bA1HCe4B";
const trendsCont = document.getElementById("trends");
const trendingCont = document.getElementById('carrusel');
const contCarrusel = document.getElementById('contCarrusel');
const prevBtn = document.getElementById('slider-left');
const nextBtn = document.getElementById('slider-right');
const prevBtn1 = document.getElementById('slider-left-hover');
const nextBtn1 = document.getElementById('slider-right-hover');
const downloadBtn = document.getElementById('btnDownload');
const expandBtn = document.getElementById('btnExpand');
let modalCtn = document.createElement("div");
traerTrendingGifos();
traerTrending();

nextBtn.addEventListener('click', () => {
    contCarrusel.scrollLeft += 400;

});
prevBtn.addEventListener('click', () => {
    contCarrusel.scrollLeft -= 400;

});
nextBtn1.addEventListener('click', () => {
    contCarrusel.scrollLeft += 400;

});
prevBtn1.addEventListener('click', () => {
    contCarrusel.scrollLeft -= 400;

});

function activeFavorite(id, img, title, username) {
    let favoriteBtn = document.getElementById('btnFavorite-' + id);

    if (favoriteBtn.className != "favActive") {
        favoriteBtn.setAttribute('src', './images/icon-fav-active.svg');
        favoriteBtn.className = "favActive";
        //TODO ESTO es una prueba para el localStorage.
        localStorage.setItem(title, img);
        const ctnFav = document.getElementById('ctnFavoritos');
        let h1 = document.createElement('img');
        h1.setAttribute('src', localStorage.getItem('Struggling Mental Health GIF by YouTube'));
        ctnFav.appendChild(h1);
    } else {
        favoriteBtn.setAttribute('src', './images/icon-fav.svg');
        favoriteBtn.className = "favInactive";
    }


}
async function traerTrending() {
    try {
        let request = await (fetch(`https://api.giphy.com/v1/trending/searches?&api_key=${apiKey}`));
        let response = await request.json();
        let text = document.createElement('p');
        response.data.splice(5, 20);
        text.textContent = response.data.join(", ");
        trendsCont.appendChild(text);
        console.log("Excelente");
    } catch (error) {
        console.log("Error:", error);
    }

}
async function traerTrendingGifos() {
    try {
        let request = await (fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=14&rating=g`));
        let response = await request.json();
        mostrarTrendingGifos.innerHTML = '';
        for (let i = 0; i < response.data.length; i++) {
            mostrarTrendingGifos(response.data[i]);
        }
    } catch (error) {
        console.log("Error:", error);
    }

}
async function activeDownload(url, name) {
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(url);
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = name;
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download



    a.click();
};

function cerrarModalCtn() {
    modalCtn.style.display = "none";
}

function expandGifDesktop(image, id, userName, title) {
    if (window.matchMedia("(min-width: 1023px)").matches) {
        modalCtn.style.display = 'block';
        modalCtn.innerHTML = `
        <button class="modal-close" onclick="cerrarModalCtn()"><img src="./images/button-close.svg"></button>
        <img src="${image}" alt="${id}" class="modal-gif">
        <div class="ctn-expand-data">
            <div class="expand-data-text">
                <p class="text-user">${userName}</p>
                <p class="text-title">${title}</p>
            </div>
            <div class="expand-data-button">
                <button class="button-download-favorite" onclick="activeFavorite('${id}', '${image}', '${title}', '${userName}')"><img src="./images/icon-fav.svg" id="btnFavorite-${id}"></button>
                <button class="button-download-favorite" onclick="activeDownload('${image}', '${title}')"><img src="./images/icon-download.svg" id="btnDownload"></button>
            </div>
        </div>
  
        `
        modalCtn.classList.add("expandActive");
        document.body.appendChild(modalCtn);
    }
}

function expandGifMobile(image, id, userName, title) {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        modalCtn.style.display = 'block';
        modalCtn.innerHTML = `
        <button class="modal-close" onclick="cerrarModalCtn()"><img src="./images/button-close.svg"></button>
        <img src="${image}" alt="${id}" class="modal-gif">
        <div class="ctn-expand-data">
            <div class="expand-data-text">
                <p class="text-user">${userName}</p>
                <p class="text-title">${title}</p>
            </div>
            <div class="expand-data-button">
                <button class="button-download-favorite" onclick="activeFavorite('${id}', '${image}', '${title}', '${userName}')"><img src="./images/icon-fav.svg" id="btnFavorite-${id}"></button>
                <button class="button-download-favorite" onclick="activeDownload('${image}', '${title}')"><img src="./images/icon-download.svg" id="btnDownload"></button>
            </div>
        </div>
  
        `
        modalCtn.classList.add("expandActive");
        document.body.appendChild(modalCtn);
    }
}

function mostrarTrendingGifos(object) {
    console.log(object);
    trendingCont.innerHTML += `
    <div class="gif" onclick="expandGifMobile('${object.images.downsized.url}','${object.id}','${object.username}','${object.title}')">
    <img class="imgGif" src="${object.images.downsized.url}" id="gif-id-${object.id}" alt="${object.title}">
    <div class="filter"></div>
    <div class="btnGifs">
    <button class="ctnBtn favorite" onclick="activeFavorite('${object.id}', '${object.images.downsized.url}', '${object.title}', '${object.username}')"><img src="./images/icon-fav.svg" id="btnFavorite-${object.id}"></button>
    <button class="ctnBtn download" onclick="activeDownload('${object.images.downsized.url}', '${object.title}')"><img src="./images/icon-download.svg" id="btnDownload"></button>
    <button class="ctnBtn expand" onclick="expandGifDesktop('${object.images.downsized.url}','${object.id}','${object.username}','${object.title}')"><img src="./images/icon-max-normal.svg" id="btnExpand"></button>
    </div>
    <div class="namesGifs"><span class="userName">${object.username}</span><h5 class="titleGif">${object.title}</h5></div></div>`

};