/**
 * Blue Marlin OS - Main JavaScript
 * 
 * This is the entry point for all JavaScript functionality in the Blue Marlin OS.
 * It preserves the underwater visual effects and theme system while providing
 * a more maintainable and modular structure.
 */

// Import underwater effects
import './underwater-effects.js';

// Log initialization
console.log('Blue Marlin OS initialized with underwater effects');

// Handle custom events and additional functionality
document.addEventListener('DOMContentLoaded', () => {
  // Enable smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Smooth scroll to the target
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Handle navigation active state
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
      // Remove active class from all links
      link.classList.remove('active');
      
      // Set active class based on current path
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath === '/index.html') ||
          (linkPath !== '/' && linkPath !== '/index.html' && currentPath.includes(linkPath))) {
        link.classList.add('active');
      }
    });
  };
  
  // Set active nav link on page load
  setActiveNavLink();
}); 