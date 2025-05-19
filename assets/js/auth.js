// auth.js - Simplified authentication and navbar user section handling

document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication display
    updateNavUserSection();
    setupMobileMenu();
    setupNavbarScroll();
});

// Update the user section in the navbar based on login status
function updateNavUserSection() {
    const navUserSection = document.getElementById('navUserSection');
    if (!navUserSection) return;
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const isPremium = localStorage.getItem('isPremium') === 'true';
    
    console.log("Auth check - Logged in:", isLoggedIn, "Username:", username, "Premium:", isPremium);
    
    if (isLoggedIn && username) {
        // User is logged in - show username and premium indicator if applicable
        navUserSection.innerHTML = `
            <a href="auth" class="text-white hover:text-red-300 transition-colors duration-300 flex items-center">
                ${isPremium ? '<i class="fas fa-crown text-yellow-400 mr-2"></i>' : ''}
                <span class="mr-1">${username}</span>
            </a>
        `;
        
        // Update mobile menu if needed
        updateMobileMenuForUser(username, isPremium);
    } else {
        // User is not logged in - show login/register buttons
        navUserSection.innerHTML = `
            <a href="/auth/" class="text-white hover:text-red-300 transition-colors duration-300">Login</a>
            <a href="/subscribe/" class="bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:from-red-600 hover:to-red-800 ml-4">Subscribe</a>
        `;
    }
}

// Update mobile menu to show user info
function updateMobileMenuForUser(username, isPremium) {
    const mobileMenuLinks = document.querySelector('#mobileMenu .flex.flex-col.space-y-6');
    if (!mobileMenuLinks) return;
    
    // Check if user section already exists to avoid duplicates
    const existingUserSection = document.getElementById('mobileUserSection');
    if (existingUserSection) return;
    
    // Create user section element
    const userSection = document.createElement('div');
    userSection.id = 'mobileUserSection';
    userSection.className = 'flex flex-col items-center mb-6';
    userSection.innerHTML = `
        <a href="auth" class="flex flex-col items-center">
            <div class="bg-gray-900 bg-opacity-30 h-16 w-16 rounded-full flex items-center justify-center mb-2 border-2 ${isPremium ? 'border-yellow-500' : 'border-red-500'}">
                <i class="fas fa-user text-2xl text-white"></i>
            </div>
            <div class="flex items-center">
                ${isPremium ? '<i class="fas fa-crown text-yellow-400 mr-2"></i>' : ''}
                <span class="text-white text-lg">${username}</span>
            </div>
        </a>
    `;
    
    // Add to mobile menu before the links
    mobileMenuLinks.parentNode.insertBefore(userSection, mobileMenuLinks);
}

// Mobile menu handling
function setupMobileMenu() {
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (openMenu && mobileMenu) {
        openMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
        });
    }
}

// Navbar scroll effect
function setupNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-lg');
            navbar.classList.remove('py-4', 'bg-opacity-80');
        } else {
            navbar.classList.remove('py-2', 'shadow-lg');
            navbar.classList.add('py-4', 'bg-opacity-80');
        }
    });
}

// Global logout function (for other pages that might need it)
window.logout = function() {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isPremium');
    localStorage.removeItem('planType');
    localStorage.removeItem('nextBillingDate');
    localStorage.removeItem('customRequests');
    localStorage.removeItem('selectedPlan');
    localStorage.removeItem('selectedPrice');
    
    // Redirect to home
    window.location.href = '../';
};