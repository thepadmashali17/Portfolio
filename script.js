// Menu Toggle Functions
function toggleMenu() {
    const navbar = document.querySelector(".dropdown");
    const currentTransform = navbar.style.transform;
    navbar.style.transform = currentTransform === "translateY(0px)" ? "translateY(-100vh)" : "translateY(0px)";
}

function closeMenu() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-100vh)";
}

// Typewriter Effect
const texts = ["DEVELOPER", "CRICKETER"];
let textIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeWriter() {
    const textElement = document.querySelector(".typewriter-text");
    const currentText = texts[textIndex];

    if (!isWaiting) {
        if (!isDeleting) {
            textElement.textContent = currentText.substring(0, characterIndex + 1);
            characterIndex++;

            if (characterIndex === currentText.length) {
                isWaiting = true;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                }, 1500);
            }
        } else {
            textElement.textContent = currentText.substring(0, characterIndex - 1);
            characterIndex--;

            if (characterIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
    }

    // Adjust typing speed
    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isWaiting ? 1500 : typingSpeed;

    setTimeout(typeWriter, delay);
}

// Start the typewriter effect when the page loads
window.onload = () => {
    typeWriter();
    setupScrollEvents();
};

// Smooth scrolling for navigation links
function setupScrollEvents() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMenu(); // Close mobile menu after clicking
            }
        });
    });
}

// Contact button functionality
function contactMe() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "mailto:your.email@example.com"; // Replace with your email
    }
}

// Add scroll event listener for navbar shadow effect on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Handle mobile menu clicks outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const hamburg = document.querySelector('.hamburg');
    if (!dropdown.contains(event.target) && !hamburg.contains(event.target)) {
        closeMenu();
    }
});

// Add resize event listener to handle menu state on screen size change
window.addEventListener('resize', function() {
    if (window.innerWidth > 884) { // This matches the media query in CSS
        closeMenu();
    }
});

// Optional: Add loading animation or section fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out';
    });

    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }, 100);
});

// Add these functions to your existing script.js file

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form Data:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Skill bar animation on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 200);
    });
}

// Initialize skill bar animation when skills section is in view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
