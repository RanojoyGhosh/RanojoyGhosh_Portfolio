// Navbar Toggle Functionality
const menuIcon = document.querySelector('#nav-menu');
const navItems = document.querySelectorAll('nav li');
let isOpen = false;
// Initial state
navItems.forEach(item => {
    item.style.display = 'none';
});
menuIcon.innerHTML = '☰';
// Toggle menu
menuIcon.addEventListener('click', (e) => {
    e.preventDefault();
    isOpen = !isOpen;
    navItems.forEach(item => {
        item.style.display = isOpen ? 'flex' : 'none';
    });
    menuIcon.innerHTML = isOpen ? '✖' : '☰';
});
// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
// Typing Animation
var typed = new Typed('#typeanimate',{
    strings : ['Frontend Web Developer','Content Creator'],
    typeSpeed: 50,
    backSpeed: 100,
    backDelay: 1000,
    loop : true
});

// Contact Form with Firebase
const contactForm = document.querySelector('footer form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        subject: contactForm.querySelector('input[name="subject"]').value,
        message: contactForm.querySelector('textarea').value,
        date: new Date().toLocaleString()
    };

    // Store message in Firebase
    const dbRef = firebase.database().ref('contactMessages');
    dbRef.push(formData)
        .then(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        })
});

// Add a link to the admin panel in the footer
document.addEventListener('DOMContentLoaded', () => {
    // Add admin link
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            window.location.href = 'admin.html';
        }
    });
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 455) { // Only for mobile view
            navbar.style.display = 'none';
            menuIcon.innerHTML = '☰';
            isOpen = false;
        }
    });
});
// scroll reveal
 ScrollReveal({ 
    reset: true,
    distance:'30px',
    duration: 1000,
    delay:100
});
ScrollReveal().reveal('#home,#about,#experience,#skills-section,#project-section,#achievements,#contact', { origin:'top' });