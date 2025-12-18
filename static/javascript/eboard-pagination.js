document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.eboard-card');
    const paginationContainer = document.querySelector('.eboard-pagination');
    
    if (!container || !paginationContainer || cards.length === 0) return;
    
    const storageKey = 'eboardCarouselScroll';
    const sessionKey = 'eboardCarouselSession';
    
    cards.forEach((card, index) => {
        const dot = document.createElement('span');
        dot.classList.add('eboard-pagination-dot');
        
        dot.addEventListener('click', () => {
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        });
        
        paginationContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.eboard-pagination-dot');
    
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

    const isNewSession = !sessionStorage.getItem(sessionKey);
    const savedScroll = localStorage.getItem(storageKey);

    if (isNewSession){
        localStorage.removeItem(storageKey);
        if (cards[0]) {
            const firstCardCenter = cards[0].offsetLeft - (container.offsetWidth / 2) + (cards[0].offsetWidth / 2);
            container.scrollLeft = firstCardCenter;
        }
        sessionStorage.setItem(sessionKey, 'true');
        updateActiveDot();
    } else if (savedScroll !== null && savedScroll !== '0') {
        const targetScroll = parseInt(savedScroll, 10);
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.scrollLeft = targetScroll;
                updateActiveDot();
            });
        });
    } else {
        if (cards[0]) {
            const firstCardCenter = cards[0].offsetLeft - (container.offsetWidth / 2) + (cards[0].offsetWidth / 2);
            container.scrollLeft = firstCardCenter;
        }
        updateActiveDot();
    }
});