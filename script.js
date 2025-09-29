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
});