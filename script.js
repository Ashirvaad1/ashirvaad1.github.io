// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// GSAP and ScrollMagic Animations
const controller = new ScrollMagic.Controller();

document.querySelectorAll('section').forEach(section => {
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false
    })
    .setClassToggle(section, 'animate__fadeInUp')
    .addTo(controller);
});