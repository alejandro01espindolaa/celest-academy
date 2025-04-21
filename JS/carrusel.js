// JavaScript para el carrusel
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlides = document.getElementById('carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    const indicators = document.querySelectorAll('.indicator-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Inicializar contador
    totalSlidesElement.textContent = totalSlides;
    updateCounter();
    
    // Función para actualizar el contador
    function updateCounter() {
        currentSlideElement.textContent = currentSlide + 1;
    }
    
    // Función para actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Función para cambiar slide
    function goToSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        carouselSlides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
        updateCounter();
        updateIndicators();
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Funcionalidad de swipe para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselSlides.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselSlides.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Umbral mínimo para considerar un swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe hacia la izquierda - avanzar slide
            goToSlide(currentSlide + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe hacia la derecha - retroceder slide
            goToSlide(currentSlide - 1);
        }
    }
    
    // Cambio automático de slides (opcional)
    let autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000); // Cambiar cada 5 segundos
    
    // Pausar el cambio automático cuando el usuario interactúa
    carouselSlides.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselSlides.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });
    
    // También pausar en dispositivos táctiles
    carouselSlides.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselSlides.addEventListener('touchend', () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });
    
    // Manejar teclas de flecha (accesibilidad)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
});