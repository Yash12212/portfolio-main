// Navigation elements
const nav = document.querySelector('nav ul');
const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

// Smooth scrolling for navigation links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Navbar hide/show on scroll
const initScrollNavigation = () => {
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide navbar based on scroll direction
        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // Scrolling down & past threshold - hide navbar
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or at top - show navbar
            navbar.classList.remove('hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // Update active section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Mobile menu functionality
const initMobileMenu = () => {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').insertBefore(menuButton, nav);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuButton.innerHTML = nav.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('show');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
};

// Initialize all navigation features
const initNavigation = () => {
    initSmoothScroll();
    initScrollNavigation();
    initMobileMenu();
};

export { initNavigation };
