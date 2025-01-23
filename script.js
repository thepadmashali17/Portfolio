function toggleMenu() {
    const navbar = document.querySelector(".dropdown");
    const currentTransform = navbar.style.transform;
    navbar.style.transform = currentTransform === "translateY(0px)" ? "translateY(-100vh)" : "translateY(0px)";
}

function closeMenu() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-100vh)";
}

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

    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isWaiting ? 1500 : typingSpeed;

    setTimeout(typeWriter, delay);
}

window.onload = () => {
    typeWriter();
    setupScrollEvents();
};

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
                closeMenu(); 
            }
        });
    });
}

function contactMe() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "mailto:your.email@example.com"; 
    }
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const hamburg = document.querySelector('.hamburg');
    if (!dropdown.contains(event.target) && !hamburg.contains(event.target)) {
        closeMenu();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 884) { 
        closeMenu();
    }
});

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

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
         
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
           
            console.log('Form Data:', formData);
            alert('Thank you for your message! I will get back to you soon.');
           
            contactForm.reset();
        });
    }
});

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
