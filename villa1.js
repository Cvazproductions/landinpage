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
