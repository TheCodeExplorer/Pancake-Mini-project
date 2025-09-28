document.addEventListener('DOMContentLoaded', () => {
    // Element Selectors
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const heroSection = document.getElementById('home');
    const congratsModal = document.getElementById('congrats-modal');
    const searchBar = document.getElementById('search-bar');

    // Recipe Data
    const recipeData = {
        "Savory Uttapam": {
            instructions: [
                "Prepare the batter: Measure 1 cup millet, 2 tbsp rice, and 2 tbsp urad dal.Place them in a bowl and pour hot water over the grains.Let it soak while other ingredients are prepared.This quick soak reduces grinding time and helps the grains blend into a smooth batter.",
                "Prepare toppings: Finely chop onion, tomato, green chilies, and coriander. Keep them ready in a bowl.",
                "Grind the batter: Drain the water and grind the soaked ingredients to a smooth, thick batter, adding water as needed. Add salt, mix well, and let it ferment in a warm place for 8-12 hours.",
                "Mix Batter & Add Fluff: Add salt to taste.Sprinkle ¼ tsp ENO or baking soda.Mix gently to incorporate air and activate fluffiness.",
                "Preheat Pan: Preheat a tawa on medium heat.Lightly grease with 1 tsp oil.",
                "Cook First Pancake: Pour ⅓ of batter onto the pan.Spread it slightly thick (not too thin).Sprinkle chopped vegetables evenly on top.",
                "Flip and cook: Once the edges firm up and the bottom turns light golden brown, flip carefully with a spatula.Cook for 1–2 minutes until fully cooked but still soft.",
                "Cook Remaining Pancakes: Repeat Step 6 and 7 for the second and third pancakes.Use remaining batter and vegetables.",
                "Plate & Garnish: Place pancakes on plates.Add coconut chutney, tomato chutney, and sambar on the side.Garnish with fresh coriander leaves."
            ]
        },
        "Classic Buttermilk": {
            instructions: ["Instructions for Classic Buttermilk pancakes are coming soon!"]
        },
        "Blueberry Delight": {
            instructions: ["Instructions for Blueberry Delight pancakes are coming soon!"]
        }
    };


// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

    // Centralized function to show a section and hide others
    function showSection(targetId) {
        const isFullScreenView = ['#recipes', '#recipe-detail', '#cooking-instructions'].includes(targetId);

        sections.forEach(section => {
            const sectionId = `#${section.id}`;

            if (sectionId === targetId) {
                // Show the target section
                section.style.display = section.id === 'home' ? 'flex' : 'block';
                section.classList.add('active');
            } else if (section.id === 'about' || section.id === 'contact') {
                // Show 'about' and 'contact' only when NOT in a full-screen view.
                section.style.display = isFullScreenView ? 'none' : 'block';
            } else {
                // Hide all other "page-like" sections (recipes, recipe-detail, etc.)
                section.style.display = 'none';
                section.classList.remove('active');
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

    // Navigation click handling using event delegation
    navMenu.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection && ['#home', '#recipes', '#recipe-detail', '#cooking-instructions'].includes(targetId)) {
                showSection(targetId);
            } else if (targetSection) {
                // For sections like #about, #contact that are on the page
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

// Header background change on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

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
            
            // For now, only handle Savory Uttapam
            if (recipeTitle === 'Savory Uttapam') {
                showSection('#recipe-detail'); // This will need to be updated to handle dynamic data
            } else {
                alert('Recipe details coming soon!');
            }
        }
        // Back to recipes button
        else if (e.target.matches('#back-to-recipes')) {
            showSection('#recipes');
        }
        // Start cooking button
        else if (e.target.matches('#start-cooking-btn')) {
            const recipeTitle = document.querySelector('.recipe-detail-title').textContent;
            showCookingInstructions(recipeTitle);
        }
        // Finish cooking button
        else if (e.target.matches('#finish-cooking-btn')) {
            congratsModal.classList.add('active');
        }
        // Close congratulations modal button
        else if (e.target.matches('#close-congrats-modal-btn')) {
            congratsModal.classList.remove('active');
            showSection('#recipe-detail');
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

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Initially show the home section
    showSection('#home');
});
});