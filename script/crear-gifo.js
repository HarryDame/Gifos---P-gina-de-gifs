const b = document.getElementById('crearGifo');
const video = document.getElementById('video');
const accion = document.getElementById('accion');
accion.addEventListener('click', crearGifo);

function crearGifo() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then(stream => {
        video.style.display = "initial";
        video.srcObject = stream;
    }).catch(console.error);
}