document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewAllBtn = document.getElementById('view-all');
    
    // Filter gallery items based on selected tab
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || filterValue === 'all-photos' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // View all photos button functionality
    viewAllBtn.addEventListener('click', () => {
        // Find and click the "ALL PHOTOS" tab
        const allPhotosTab = document.querySelector('[data-filter="all-photos"]');
        allPhotosTab.click();
        
        // Scroll to gallery section
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        
        // Expand images to full view
        galleryItems.forEach(item => {
            item.classList.add('full-view');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add watermark effect to images on hover
    const heroImage = document.querySelector('.hero-image');
    
    heroImage.addEventListener('mousemove', (e) => {
        const watermark = document.querySelector('.hero-overlay .watermark');
        const xPos = (e.clientX / window.innerWidth) * 20 - 10;
        const yPos = (e.clientY / window.innerHeight) * 20 - 10;
        
        watermark.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Initialize with "FAVOURITES" tab active
    document.querySelector('[data-filter="all"]').click();
});

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    function showImage(index) {
        // Verifica si ya existe una imagen en pantalla completa y la elimina
        const existingFullscreen = document.querySelector('.fullscreen');
        if (existingFullscreen) {
            existingFullscreen.remove();
        }

        // Crear el contenedor de imagen en pantalla completa
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.classList.add('fullscreen');

        // Crear la imagen
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = galleryItems[index].src;
        fullscreenImg.alt = galleryItems[index].alt;
        currentIndex = index; // Actualizar el índice actual

        // Crear botones de navegación
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '⭠'; // Flecha izquierda
        prevBtn.classList.add('nav-btn', 'prev-btn');

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '⭢'; // Flecha derecha
        nextBtn.classList.add('nav-btn', 'next-btn');

        // Funciones para cambiar de imagen
        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentIndex > 0) {
                showImage(currentIndex - 1);
            }
        });

        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentIndex < galleryItems.length - 1) {
                showImage(currentIndex + 1);
            }
        });

        // Cerrar la imagen al hacer clic fuera
        fullscreenDiv.addEventListener('click', function () {
            fullscreenDiv.remove();
        });

        // Agregar los elementos al contenedor y luego al body
        fullscreenDiv.appendChild(fullscreenImg);
        if (currentIndex > 0) fullscreenDiv.appendChild(prevBtn);
        if (currentIndex < galleryItems.length - 1) fullscreenDiv.appendChild(nextBtn);
        document.body.appendChild(fullscreenDiv);
    }

    // Agregar evento de clic a cada imagen
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function () {
            showImage(index);
        });
    });
});


