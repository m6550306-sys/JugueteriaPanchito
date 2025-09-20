document.addEventListener('DOMContentLoaded', () => {
    // --- Navegación entre secciones ---
    const homeLink = document.getElementById('home-link');
    const productsLink = document.getElementById('products-link');
    const mobileHomeLink = document.getElementById('mobile-home-link');
    const mobileProductsLink = document.getElementById('mobile-products-link');
    const backToCategoriesBtn = document.getElementById('back-to-categories');
    
    const homeContent = document.getElementById('home-content');
    const productsContent = document.getElementById('products-content');
    const puzzlesContent = document.getElementById('puzzles-content');

    // Mapeo de IDs de categorías a IDs de contenido
    const categoryContentMap = {
        'puzzles': puzzlesContent,
        'didacticos': document.getElementById('didacticos-content'),
        'estacion-de-servicios': document.getElementById('estacion-de-servicios-content'),
        'juegos-de-mesa': document.getElementById('juegos-de-mesa-content'),
        'playa': document.getElementById('playa-content'),
        'linea-minis': document.getElementById('linea-minis-content'),
        'rodados-chicos': document.getElementById('rodados-chicos-content'),
        'rodados-medios': document.getElementById('rodados-medios-content'),
        'rodados-grandes': document.getElementById('rodados-grandes-content'),
        'linea-hogar': document.getElementById('linea-hogar-content'),
        'linea-masas': document.getElementById('linea-masas-content'),
        'linea-blocks': document.getElementById('linea-blocks-content'),
        'linea-juegos': document.getElementById('linea-juegos-content'),
        'linea-taller': document.getElementById('linea-taller-content'),
        'linea-jardin': document.getElementById('linea-jardin-content'),
    };

    // --- Funciones para mostrar/ocultar secciones ---
    function showSection(sectionToShow) {
        // Oculta todas las secciones de contenido
        const allSections = [homeContent, productsContent, puzzlesContent, ...Object.values(categoryContentMap)];
        allSections.forEach(section => {
            if (section) section.classList.add('hidden');
        });

        // Muestra la sección seleccionada
        sectionToShow.classList.remove('hidden');
    }

    // --- Event Listeners de navegación ---
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(homeContent);
    });

    productsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(productsContent);
    });
    
    mobileHomeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(homeContent);
        document.getElementById('mobile-menu').classList.add('hidden');
    });

    mobileProductsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(productsContent);
        document.getElementById('mobile-menu').classList.add('hidden');
    });

    // Usa un evento de delegado para el botón de retroceso genérico
    document.addEventListener('click', (e) => {
        if (e.target.closest('#back-to-categories')) {
            showSection(productsContent);
        }
    });

    // --- Navegación de categorías ---
    const categoryCards = document.querySelectorAll('#products-content [id$="-category-card"]');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = card.id.replace('-category-card', '');
            const contentSection = categoryContentMap[categoryId];

            if (contentSection) {
                // Si la sección existe, la muestra
                showSection(contentSection);
            } else {
                // Si la sección no existe, muestra una alerta (puedes eliminar esto cuando crees el contenido)
                alert(`¡Próximamente! Estamos preparando la sección de ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}.`);
            }
        });
    });

    // --- Barra de búsqueda y menú móvil ---
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('hidden');
    });

    // --- Carrusel de productos ---
    const carousel = document.getElementById('product-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Función para actualizar la tarjeta activa (la del centro)
    function updateActiveCard() {
        const cards = Array.from(carousel.children);
        const scrollCenter = carousel.scrollLeft + carousel.offsetWidth / 2;

        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            if (Math.abs(cardCenter - scrollCenter) < card.offsetWidth / 2) {
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -288, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 288, behavior: 'smooth' });
    });

    // Actualizar la tarjeta activa al cargar y al hacer scroll
    carousel.addEventListener('scroll', updateActiveCard);
    updateActiveCard();
});