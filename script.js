document.addEventListener('DOMContentLoaded', () => {
    // Element Selectors
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const registrationForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const loginRegistrationSection = document.getElementById('login-registration');
    const heroSection = document.getElementById('home');
    const congratsModal = document.getElementById('congrats-modal');
    const searchBar = document.getElementById('search-bar');

    // Initially hide all sections except login/registration
    sections.forEach(section => {
        if (section.id !== 'login-registration') {
            section.style.display = 'none';
        }
    });
    navMenu.classList.add('hidden');
    navToggle.classList.add('hidden');

    // Toggle mobile navigation
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Centralized function to show a section and hide others
    function showSection(targetId) {
        sections.forEach(section => {
            const sectionId = `#${section.id}`;
            if (sectionId === targetId) {
                if (section.id === 'home') {
                    section.style.display = 'flex';
                } else {
                    section.style.display = 'block';
                }
            } else {
                section.style.display = 'none';
            }
        });

        // Update active nav link
        navLinks.forEach(navLink => {
            navLink.classList.toggle('active', navLink.getAttribute('href') === targetId);
        });

        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        // Scroll to top of the page
        window.scrollTo(0, 0);
    }

    const header = document.querySelector('.header');

    // Function to handle header transparency
    function handleHeaderTransparency() {
        const homeSection = document.getElementById('home');
        if (homeSection.style.display !== 'none' && window.scrollY < 100) {
            header.classList.add('header-transparent');
        } else {
            header.classList.remove('header-transparent');
        }
    }

    // Initial check
    handleHeaderTransparency();

    // Handle scroll
    window.addEventListener('scroll', handleHeaderTransparency);

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);
            // After showing the section, check for header transparency
            setTimeout(handleHeaderTransparency, 0);
        });
    });

    const recipeData = {
        'Savory Uttapam': {
            instructions: [
                'Soak millet grains and urad dal for 4-6 hours.',
                'Grind to a smooth batter, adding water as needed.',
                'Ferment the batter for 8-10 hours.',
                'Add salt and ENO/baking soda just before cooking.',
                'Heat a pan and pour a ladleful of batter.',
                'Top with chopped onions, tomatoes, and chilies.',
                'Cook on both sides until golden brown.',
                'Serve hot with chutney.'
            ]
        },
        'Classic Buttermilk': {
            instructions: [
                'Whisk together flour, sugar, baking powder, and salt.',
                'In a separate bowl, mix buttermilk, egg, and melted butter.',
                'Pour wet ingredients into dry and mix until just combined.',
                'Heat a lightly oiled griddle or frying pan over medium-high heat.',
                'Pour or scoop the batter onto the griddle.',
                'Cook until bubbles appear on the surface, then flip.',
                'Cook until golden brown on the other side.',
                'Serve hot with your favorite toppings.'
            ]
        },
        'Blueberry Delight': {
            instructions: [
                'Follow the classic buttermilk pancake recipe.',
                'Gently fold in fresh or frozen blueberries into the batter.',
                'Be careful not to overmix.',
                'Cook as per the classic buttermilk pancake instructions.',
                'Serve with extra blueberries and maple syrup.'
            ]
        }
    };

    // --- Cooking Instructions Logic ---
    function showCookingInstructions(recipeTitle) {
        const recipe = recipeData[recipeTitle];
        if (!recipe || !recipe.instructions) {
            alert('Sorry, cooking instructions are not available for this recipe yet.');
            return;
        }

        // Populate the instructions screen
        const stepsContainer = document.getElementById('instructions-steps-container');
        document.getElementById('cooking-recipe-title').textContent = `Cooking: ${recipeTitle}`;
        stepsContainer.innerHTML = ''; // Clear previous steps

        // Show the cooking screen first
        showSection('#cooking-instructions');

        // Animate steps one by one
        recipe.instructions.forEach((stepText, index) => {
            setTimeout(() => {
                const stepElement = document.createElement('div');
                stepElement.classList.add('instruction-step');
                stepElement.innerHTML = `
                    <div class="step-number">${index + 1}</div>
                    <div class="step-text">${stepText}</div>
                `;
                stepsContainer.appendChild(stepElement);
                // Trigger the transition by changing opacity and transform
                stepElement.style.opacity = '1';
                stepElement.style.transform = 'translateY(0)';
            }, index * 300); // 300ms delay between each step
        });
    }

    // General click handler for buttons
    document.addEventListener('click', (e) => {
        // Explore Recipes button
        if (e.target.matches('#explore-btn')) {
            showSection('#recipes');
        }
        // View Recipe button
        else if (e.target.matches('.recipe-btn')) {
            const recipeCard = e.target.closest('.recipe-card');
            const recipeTitle = recipeCard.querySelector('.recipe-title').textContent;
            showCookingInstructions(recipeTitle);
        }
        // Back to recipes button from cooking
        else if (e.target.matches('#back-to-recipes-from-cooking')) {
            showSection('#recipes');
        }
        // Finish cooking button
        else if (e.target.matches('#finish-cooking-btn')) {
            congratsModal.classList.add('active');
        }
        // Close congratulations modal button
        else if (e.target.matches('#close-congrats-modal-btn')) {
            congratsModal.classList.remove('active');
            showSection('#recipes');
        }
    });

    // --- Search Bar Logic ---
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.recipe-card');

        recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Button hover effect enhancement
    const buttons = document.querySelectorAll('.cta-button, .recipe-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (heroSection && heroSection.style.display !== 'none') {
                    const rate = scrolled * -0.3; // Reduced rate for subtlety
                    heroSection.style.backgroundPositionY = `${rate}px`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- Login/Register Form Switching ---
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');

    if (showLoginBtn && showRegisterBtn && loginFormContainer && registerFormContainer) {
        showLoginBtn.addEventListener('click', () => {
            loginFormContainer.style.display = 'block';
            registerFormContainer.style.display = 'none';
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        });

        showRegisterBtn.addEventListener('click', () => {
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
            showRegisterBtn.classList.add('active');
            showLoginBtn.classList.remove('active');
        });
    }

    // Function to handle form submission with fetch
    async function handleFormSubmit(event, url) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                alert('Form submitted successfully!');
                // Optionally, redirect or show a success message
            } else {
                console.error('Error:', response.statusText);
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            handleFormSubmit(e, '/api/register');
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            console.log('Login attempt with:', { email, password });

            const registeredUserJSON = localStorage.getItem('registeredUser');
            console.log('Retrieved from local storage:', registeredUserJSON);

            const registeredUser = JSON.parse(registeredUserJSON);
            console.log('Parsed user from local storage:', registeredUser);

            if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
                alert('Login successful!');
                
                // Show navigation and home page
                navMenu.classList.remove('hidden');
                navToggle.classList.remove('hidden');
                showSection('#home');
                setTimeout(handleHeaderTransparency, 0);
            } else {
                alert('Invalid email or password.');
            }
        });
    }
});