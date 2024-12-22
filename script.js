// Theme toggle functionality with improved state management
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const setThemeIcon = (isDark) => {
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    setThemeIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Set initial theme based on user preference or stored value
const setInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    const shouldBeDark = storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches);
    
    if (shouldBeDark) {
        document.body.classList.add('dark-mode');
    }
    setThemeIcon(shouldBeDark);
};

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const shouldBeDark = e.matches;
        document.body.classList.toggle('dark-mode', shouldBeDark);
        setThemeIcon(shouldBeDark);
    }
});

themeToggle.addEventListener('click', toggleTheme);
setInitialTheme();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation elements
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const navbar = document.querySelector('nav');

// Navbar hide/show on scroll
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
        const sectionHeight = section.clientHeight;
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

// Scroll reveal with Intersection Observer
const setupRevealOnScroll = () => {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add revealed class with optimized staggered delay
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 80); // Slightly faster stagger for smoother appearance
                });
            } else {
                // Remove revealed class when out of view
                entry.target.classList.remove('revealed');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
        
        // Reset any previously revealed elements
        element.classList.remove('revealed');
    });
};

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', setupRevealOnScroll);

// Reinitialize on dynamic content changes
const resetAnimations = () => {
    document.querySelectorAll('.reveal').forEach(element => {
        element.classList.remove('revealed');
    });
    setupRevealOnScroll();
};

// Mobile menu toggle
const nav = document.querySelector('nav ul');
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

// Initialize progress bars immediately
const initializeSkills = () => {
    document.querySelectorAll('.progress').forEach((progress, index) => {
        const percentage = progress.getAttribute('data-percentage');
        requestAnimationFrame(() => {
            setTimeout(() => {
                progress.style.setProperty('--progress-width', percentage + '%');
                progress.classList.add('animate');
            }, index * 150);
        });
    });
};

// Initialize skill animations immediately when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSkills);

// Loading Animation
const loadingScreen = document.querySelector('.loading');
let isLoadingHidden = false;

const hideLoading = () => {
    if (!isLoadingHidden) {
        isLoadingHidden = true;
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start reveal animations after loading
            setupRevealOnScroll();
        }, 500); // Wait for fade out animation
    }
};

// Hide loading screen immediately when DOM is ready
document.addEventListener('DOMContentLoaded', hideLoading);

// Also try on window load
window.addEventListener('load', hideLoading);

// Fallback: Hide after 1.5 seconds maximum
setTimeout(hideLoading, 1500);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    };

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual backend integration)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form and button
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});
