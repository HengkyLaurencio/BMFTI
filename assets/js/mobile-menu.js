// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 550;
    }

    // Create mobile menu toggle if on mobile
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.navbar__menu');
        const navActions = document.querySelector('.navbar__actions');
        
        if (!navbar || !navMenu || !navActions) return;

        // Create toggle button
        let toggleBtn = document.querySelector('.navbar__toggle');
        if (!toggleBtn && isMobile()) {
            toggleBtn = document.createElement('button');
            toggleBtn.className = 'navbar__toggle';
            toggleBtn.innerHTML = '☰';
            toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert as last child of navbar__actions
            navActions.insertBefore(toggleBtn, navActions.lastChild);
            
            // Toggle functionality
            toggleBtn.addEventListener('click', function() {
                const isVisible = navMenu.style.display === 'flex';
                
                if (isVisible) {
                    navMenu.style.display = 'none';
                    toggleBtn.innerHTML = '☰';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'var(--bg)';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.padding = '16px';
                    navMenu.style.borderTop = '1px solid var(--border)';
                    navMenu.style.zIndex = '1001';
                    toggleBtn.innerHTML = '✕';
                }
            });
        }
        
        // Remove toggle button if not mobile
        if (toggleBtn && !isMobile()) {
            toggleBtn.remove();
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.flexDirection = '';
            navMenu.style.padding = '';
            navMenu.style.borderTop = '';
        }
    }

    // Initial setup
    createMobileMenu();
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createMobileMenu, 100);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.navbar__menu');
        const toggleBtn = document.querySelector('.navbar__toggle');
        
        if (isMobile() && navMenu && toggleBtn && 
            !navbar.contains(e.target) && 
            navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
            toggleBtn.innerHTML = '☰';
        }
    });
    
    // Close mobile menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.navbar__menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile()) {
                const navMenu = document.querySelector('.navbar__menu');
                const toggleBtn = document.querySelector('.navbar__toggle');
                
                if (navMenu && toggleBtn) {
                    navMenu.style.display = 'none';
                    toggleBtn.innerHTML = '☰';
                }
            }
        });
    });
});