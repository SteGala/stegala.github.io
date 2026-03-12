class SiteHeader extends HTMLElement {
    connectedCallback() {
        // Determine base path to handle local testing vs GitHub Pages root
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        // In this specific setup with GitHub Pages (stegala.github.io), root / works fine!
        const getRootPath = () => {
            const path = window.location.pathname;
            if (path.includes('stegala.github.io')) {
                return '/stegala.github.io/';
            }
            return '/';
        };
        const root = getRootPath();

        this.innerHTML = `
            <header class="site-header">
                <nav class="navbar container">
                    <a href="${root}" class="brand">Stefano Galantino</a>
                    <ul class="nav-links">
                        <li><a href="${root}about/" class="nav-link">About</a></li>
                        <li><a href="${root}publications/" class="nav-link">Publications</a></li>
                        <li><a href="${root}teaching/" class="nav-link">Teaching</a></li>
                        <li><a href="${root}projects/" class="nav-link">Projects</a></li>
                    </ul>
                    <div class="nav-controls">
                        <button class="theme-toggle" aria-label="Toggle dark mode">
                            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </button>
                        <button class="mobile-menu-btn" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </nav>
            </header>
        `;

        this.setupTheme();
        this.setupMobileMenu();
        this.highlightCurrentPage();
    }

    setupTheme() {
        const toggleBtn = this.querySelector('.theme-toggle');
        const sunIcon = this.querySelector('.sun-icon');
        const moonIcon = this.querySelector('.moon-icon');
        
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const applyTheme = (isDark) => {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            sunIcon.style.display = isDark ? 'block' : 'none';
            moonIcon.style.display = isDark ? 'none' : 'block';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        // Initialize theme
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        } else {
            applyTheme(prefersDark);
        }

        // Toggle on click
        toggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(!isDark);
        });
    }

    setupMobileMenu() {
        const btn = this.querySelector('.mobile-menu-btn');
        const links = this.querySelector('.nav-links');
        
        btn.addEventListener('click', () => {
            links.classList.toggle('show');
        });
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            // Basic active link detection
            if (currentPath === linkPath || (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            }
        });
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="container footer-content">
                    <div class="footer-info">
                        <h3>Stefano Galantino</h3>
                        <p>Academic & Researcher</p>
                        <p>&copy; ${new Date().getFullYear()} Stefano Galantino. All rights reserved.</p>
                    </div>
                    <div class="social-links">
                        <a href="https://github.com/stegala" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
