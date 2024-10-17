const sideMenu = document.getElementById('side-menu');
const sideHamburger = document.getElementById('side-hamburger');
const navLinks = document.querySelectorAll('nav a'); // Select all nav links

// Toggle side menu from the header hamburger
hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    sideHamburger.classList.toggle('active');
});

// Toggle side menu from the side hamburger
sideHamburger.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    sideHamburger.classList.remove('active');
});

// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetId = link.getAttribute('href'); // Get the target ID from href
        const targetElement = document.querySelector(targetId); // Select the target element

        // Scroll to the target element smoothly
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Close the side menu if clicked from side hamburger
        sideMenu.classList.remove('active');
        sideHamburger.classList.remove('active');
    });
});
