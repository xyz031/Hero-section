document.addEventListener('DOMContentLoaded', function() {
    // Set up the animated heading
    const titleText = "DIGITAL EXPERIENCES";
    const titleElement = document.getElementById('animated-heading');
    const words = titleText.split(' ');
    
    // Create word lines and characters
    words.forEach(word => {
        const wordLine = document.createElement('div');
        wordLine.className = 'word-line';
        
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word';
        
        word.split('').forEach(char => {
            const charElement = document.createElement('span');
            charElement.className = 'char';
            charElement.textContent = char;
            wordContainer.appendChild(charElement);
        });
        
        wordLine.appendChild(wordContainer);
        titleElement.appendChild(wordLine);
    });
    
    // Create a master timeline for synchronized animations
    const masterTL = gsap.timeline();
    
    // Add text animation to timeline
    masterTL.to('.char', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0
    }, 0); // Start at 0 seconds
    
    // Add image pop-up animation to timeline (starts at same time)
    masterTL.to('.image-item', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.15
    }, 0); // Start at 0 seconds
    
   
    
    // Image movement effects
    const imageItems = document.querySelectorAll('.image-item');
    const movementRange = 80;
    const heading = document.querySelector('.hero-heading');
    
    imageItems.forEach(item => {
        const img = item.querySelector('img');
        let isHovering = false;
        
        item.addEventListener('mouseenter', () => {
            isHovering = true;
            item.style.zIndex = '4';
            heading.style.color = 'var(--hover-text-color)';
            heading.style.textShadow = 
                '1px 1px 0 var(--text-outline), ' +
                '-1px -1px 0 var(--text-outline), ' +
                '1px -1px 0 var(--text-outline), ' +
                '-1px 1px 0 var(--text-outline)';
        });
        
        item.addEventListener('mouseleave', () => {
            isHovering = false;
            item.style.zIndex = '1';
            heading.style.color = 'var(--secondary-color)';
            heading.style.textShadow = 'none';
            gsap.to(img, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        
        item.addEventListener('mousemove', (e) => {
            if (isHovering) {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width/2;
                const y = e.clientY - rect.top - rect.height/2;
                
                const moveX = (x / (rect.width/2)) * movementRange;
                const moveY = (y / (rect.height/2)) * movementRange;
                
                gsap.to(img, {
                    x: moveX,
                    y: moveY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
});