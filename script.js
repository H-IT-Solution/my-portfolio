const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const sideHamburger = document.getElementById('side-hamburger');

// Toggle side menu from the header hamburger
hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    sideHamburger.classList.toggle('active')


    // Hide or show the header hamburger based on the side menu state
    if (sideMenu.classList.contains('active')) {
        hamburger.style.display = 'none'; // Hide header hamburger
    } else {
        hamburger.style.display = 'flex'; // Show header hamburger (assuming it uses flex)
    }
});

// Toggle side menu from the side hamburger
sideHamburger.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    sideHamburger.classList.remove('active');

    // Show the header hamburger when the menu is closed
    hamburger.style.display = 'flex'; // Show header hamburger
});
