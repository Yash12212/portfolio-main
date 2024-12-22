// Import modules
import { setThemeIcon, toggleTheme, setInitialTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initContactForm } from './contact.js';

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    setInitialTheme();

    // Initialize navigation features
    initNavigation();

    // Initialize animations
    initAnimations();

    // Initialize contact form
    initContactForm();
});
