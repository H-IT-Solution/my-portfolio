const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active'); // Toggle side menu visibility
    hamburger.classList.toggle('active'); // Toggle hamburger active state
});
