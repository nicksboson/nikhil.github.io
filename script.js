// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero h1');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroText = document.querySelector('.hero p');

function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card, .education-card, .experience-card, .project-card, .achievement-card').forEach(element => {
    observer.observe(element);
});

// Skill progress animation
const skillItems = document.querySelectorAll('.skill-item'); // Select all skill-item elements

const animateSkills = () => {
    skillItems.forEach(skillItem => {
        const progressBar = skillItem.querySelector('.skill-progress-bar');
        const progressValue = skillItem.dataset.progress; // Get the data-progress attribute

        if (progressBar && progressValue) {
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressBar.style.width = `${progressValue}%`; // Set width based on data-progress
                        }, 200);
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            skillObserver.observe(skillItem); // Observe the skillItem itself
        }
    });
};

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    });
});

// Theme toggle functionality
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('.navbar').appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    typeEffect(heroTitle, heroTitle.textContent, 100);
    setTimeout(() => {
        typeEffect(heroSubtitle, heroSubtitle.textContent, 80);
    }, 1000);
    setTimeout(() => {
        typeEffect(heroText, heroText.textContent, 50);
    }, 2000);
    animateSkills(); // Call animateSkills on page load
});

// Add CSS for new JavaScript features
const style = document.createElement('style');
style.textContent = `
    .scroll-down {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .scroll-up {
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    /* Removed redundant skill progress styles as they are now in style.css */
    
    .theme-toggle {
        background: none;
        border: none;
        color: var(--dark);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .theme-toggle:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
    .dark-theme .theme-toggle {
        color: var(--dark);
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style); 