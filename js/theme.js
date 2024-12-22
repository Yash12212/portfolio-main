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

// Initialize theme
themeToggle.addEventListener('click', toggleTheme);
setInitialTheme();

export { setThemeIcon, toggleTheme, setInitialTheme };
