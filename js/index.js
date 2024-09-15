const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let currentIndex = 0;

function navigateTo(index) {
    const container = document.querySelector('.sections-container');
    currentIndex = index;
    container.style.transform = `translateX(-${index * 100}vw)`;
    triggerAnimation(index);
}

// IntersectionObserver to detect section visibility
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.content');
            anime({
                targets: content,
                opacity: [0, 1], // Fades in from invisible to opaque
                translateX: [-100, 0], // Slides in from left to right
                duration: 2000, // Animation duration
                delay: 400,
                easing: 'easeOutExpo', // Smooth easing
            });
        }
    });
}, { threshold: 0.5 });

// Apply observer to each section
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Trigger animation on navigation click
function triggerAnimation(index) {
    const section = document.querySelectorAll('.section')[index];
    const content = section.querySelector('.content');
    anime({
        targets: content,
        opacity: [0, 1], // Fades in from invisible to opaque
        translateX: [-100, 0], // Slides in from left to right
        duration: 2000, // Animation duration
        delay: 600,
        easing: 'easeOutExpo', // Smooth easing
    });
}