document.addEventListener('DOMContentLoaded', function() {
    // Element selections
    const sideMenu = document.getElementById('side-menu');
    const hamburger = document.getElementById('hamburger');
    const sideHamburger = document.getElementById('side-hamburger');
    const navLinks = document.querySelectorAll('nav a, .side-menu a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const homeButtons = document.querySelectorAll('.home-buttons .btn');
    
    // Function for smooth scrolling
    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Scroll to the target element smoothly
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
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
            
            // Use history API to avoid showing the hash in URL
            history.pushState('', '', window.location.pathname);
            
            smoothScroll(targetId);
            
            // Close the side menu if clicked from side hamburger
            sideMenu.classList.remove('active');
            sideHamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for home buttons ("View My Work" and "Contact Me")
    homeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = button.getAttribute('href'); // Get the target ID from href
            
            // Use history API to avoid showing the hash in URL, matching nav links behavior
            history.pushState('', '', window.location.pathname);
            
            smoothScroll(targetId);
        });
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add a slight delay for animation effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Hide after fade out animation
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Honeypot field (anti-bot trap)
            const honeypot = document.querySelector('input[name="_honey"]');
            if (honeypot && honeypot.value.trim() !== '') {
                // Bot detected — do not submit
                console.warn('Spam detected - honeypot filled');
                return;
            }

            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            // Submit the form using Fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('There was a problem sending your message. Please try again.');
                }
            })
            .catch(error => {
                alert('Something went wrong. Please check your connection or try again later.');
                console.error('Formsubmit error:', error);
            });
        });
    }
    
    // Scroll animation for elements
    const scrollElements = document.querySelectorAll('.project-card, .skill-item');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check for elements in view
    handleScrollAnimation();
    
    // Add active class to current section in the navigation
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('header nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach((li) => {
            li.classList.remove('active');
            if (li.getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });
});