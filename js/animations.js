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

// Initialize skill progress bars with Intersection Observer
const initializeSkills = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percentage = progress.getAttribute('data-percentage');
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        progress.style.setProperty('--progress-width', percentage + '%');
                        progress.classList.add('animate');
                    }, index * 150);
                });
                // Unobserve after animation is triggered
                progressObserver.unobserve(progress);
            }
        });
    }, {
        threshold: 0.2
    });

    progressBars.forEach(progress => {
        // Reset progress bar before observing
        progress.style.setProperty('--progress-width', '0%');
        progress.classList.remove('animate');
        progressObserver.observe(progress);
    });
};

// Loading screen management
const initLoadingScreen = () => {
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
                initializeSkills(); // Initialize skills after loading
            }, 500); // Wait for fade out animation
        }
    };

    // Hide loading screen when DOM is ready
    document.addEventListener('DOMContentLoaded', hideLoading);
    // Also try on window load
    window.addEventListener('load', hideLoading);
    // Fallback: Hide after 1.5 seconds maximum
    setTimeout(hideLoading, 1500);
};

// Initialize all animations
const initAnimations = () => {
    initLoadingScreen();
    // Initialize animations when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        setupRevealOnScroll();
        initializeSkills();
    });
    // Also initialize on dynamic content changes
    window.addEventListener('load', () => {
        setupRevealOnScroll();
        initializeSkills();
    });
};

export { initAnimations, setupRevealOnScroll };
