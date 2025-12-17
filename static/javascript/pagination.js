document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.activity-container');
    const cards = document.querySelectorAll('.activity-card');
    const paginationContainer = document.querySelector('.activity-pagination');
    
    if (!container || !paginationContainer || cards.length === 0) return;
    
    const storageKey = 'activityCarouselScroll';
    
    cards.forEach((card, index) => {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        
        dot.addEventListener('click', () => {
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        });
        
        paginationContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.pagination-dot');
    
    function updateActiveDot() {
        const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        
        dots.forEach(d => d.classList.remove('active'));
        if (dots[closestIndex]) {
            dots[closestIndex].classList.add('active');
        }
    }
    
    let scrollTimeout;
    container.addEventListener('scroll', function() {
        updateActiveDot();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            localStorage.setItem(storageKey, container.scrollLeft);
        }, 150);
    }, { passive: true });
    
    const savedScroll = localStorage.getItem(storageKey);
    
    if (savedScroll !== null && savedScroll !== '0') {
        const targetScroll = parseInt(savedScroll, 10);
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.scrollLeft = targetScroll;
                updateActiveDot();
            });
        });
    } else {
        updateActiveDot();
    }
});