// Prevent automatic scroll restoration so we can handle it ourselves
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.activity-container');
    const cards = document.querySelectorAll('.activity-card');
    const paginationContainer = document.querySelector('.activity-pagination');
    
    if (!container || !paginationContainer || cards.length === 0) return;
    
    // Create pagination dots
    cards.forEach((card, index) => {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        
        // Click handler to scroll to specific card
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
    
    // Function to update active dot
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
    
    // Update on scroll
    container.addEventListener('scroll', updateActiveDot, { passive: true });
    
    // Use requestAnimationFrame to check after browser has finished rendering
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            updateActiveDot();
        });
    });
});