// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const currentYear = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.querySelector('.projects-grid');

// Set current year
currentYear.textContent = new Date().getFullYear();

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.dataset.theme = savedTheme;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Load GitHub Projects
async function loadGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/yourusername/repos?sort=updated&per_page=6');
        const projects = await response.json();
        
        projectsGrid.innerHTML = ''; // Clear loading skeletons
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-desc">${project.description || 'No description available'}</p>
                    <div class="project-tech">
                        <span class="tech-tag">${project.language || 'Various'}</span>
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.html_url}" class="project-link" target="_blank">View on GitHub</a>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        projectsGrid.innerHTML = '<p>Unable to load projects. Please check back later.</p>';
    }
}

// Initialize
loadGitHubProjects();