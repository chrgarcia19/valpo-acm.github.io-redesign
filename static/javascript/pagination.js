document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.activity-container');
    const cards = document.querySelectorAll('.activity-card');
    const paginationContainer = document.querySelector('.activity-pagination');
    
    cards.forEach((card, index) => {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (index === 0) dot.classList.add('active');
        
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
    
    container.addEventListener('scroll', () => {
        const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
        
        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);
            
            if (distance < card.offsetWidth / 2) {
                dots.forEach(d => d.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    });
});