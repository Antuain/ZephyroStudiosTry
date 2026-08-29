document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MENÚ HAMBURGUESA MÓVIL
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const enlacesNav = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        // Abrir o cerrar al tocar el botón hamburguesa
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('menu-abierto');
        });

        // Cerrar el menú al hacer clic en cualquier enlace
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('menu-abierto');
            });
        });
    }

    // ==========================================
    // 2. MODAL DE INFORMACIÓN DEL EQUIPO
    // ==========================================
    const modalInfoOverlay = document.getElementById('modal-overlay');
    const modalCerrarBtn = document.getElementById('modal-cerrar');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalTexto = document.getElementById('modal-texto');
    const botonesInfo = document.querySelectorAll('button[data-rol]');

    // Textos informativos según el rol
    const infoRoles = {
        disenadores: {
            titulo: 'Game Designers',
            texto: 'Encargados de idear mecánicas, balance de niveles, curva de dificultad y la experiencia psicológica inmersiva de Pueblo Chico.'
        },
        programadores: {
            titulo: 'Programadores',
            texto: 'Responsables de la arquitectura técnica, comportamiento de la inteligencia artificial, optimización y mecánicas de supervivencia en 3D.'
        },
        artistas: {
            titulo: 'Artistas 3D & 2D',
            texto: 'Creadores de los entornos rurales de los 80, modelos de criaturas folclóricas, iluminación retro y postprocesado analógico.'
        }
    };

    if (botonesInfo.length > 0 && modalInfoOverlay) {
        botonesInfo.forEach(boton => {
            boton.addEventListener('click', () => {
                const rol = boton.getAttribute('data-rol');
                if (infoRoles[rol]) {
                    modalTitulo.textContent = infoRoles[rol].titulo;
                    modalTexto.textContent = infoRoles[rol].texto;
                    modalInfoOverlay.classList.add('activo');
                }
            });
        });

        if (modalCerrarBtn) {
            modalCerrarBtn.addEventListener('click', () => {
                modalInfoOverlay.classList.remove('activo');
            });
        }
    }

    // ==========================================
    // 3. MODAL DE CONTACTO
    // ==========================================
    const abrirContactoBtn = document.getElementById('abrir-contacto');
    const modalContactoOverlay = document.getElementById('modal-contacto-overlay');
    const modalContactoCerrarBtn = document.getElementById('modal-contacto-cerrar');

    if (abrirContactoBtn && modalContactoOverlay) {
        abrirContactoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContactoOverlay.classList.add('activo');
        });

        if (modalContactoCerrarBtn) {
            modalContactoCerrarBtn.addEventListener('click', () => {
                modalContactoOverlay.classList.remove('activo');
            });
        }
    }

    // Cerrar cualquier modal al hacer clic en el fondo oscuro
    window.addEventListener('click', (e) => {
        if (e.target === modalInfoOverlay) modalInfoOverlay.classList.remove('activo');
        if (e.target === modalContactoOverlay) modalContactoOverlay.classList.remove('activo');
    });

    // ==========================================
    // 4. ANIMACIÓN DE APARICIÓN (REVEAL ON SCROLL)
    // ==========================================
    const elementosReveal = document.querySelectorAll('.reveal');

    function checkScrollReveal() {
        const alturaVentana = window.innerHeight;
        elementosReveal.forEach(el => {
            const distanciaTop = el.getBoundingClientRect().top;
            if (distanciaTop < alturaVentana - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScrollReveal);
    checkScrollReveal(); // Comprobación inicial al cargar
});