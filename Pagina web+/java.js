function toggleTexto(boton) {
    // Busca el overlay que está dentro del mismo slide que el botón
    const contenedor = boton.parentElement;
    const overlay = contenedor.querySelector('.video-overlay');
    overlay.classList.toggle('hidden');
}