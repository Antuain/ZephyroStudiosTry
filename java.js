const video = document.getElementById('miVideo');
const overlay = document.getElementById('overlay-text');

video.addEventListener('play', () => {
    overlay.classList.add('hidden');
});


video.addEventListener('pause', () => {
    overlay.classList.remove('hidden');
});

function toggleTexto(boton) {
    const contenedor = boton.parentElement;
    const overlay = contenedor.querySelector('.video-overlay');
    overlay.classList.toggle('hidden');
}