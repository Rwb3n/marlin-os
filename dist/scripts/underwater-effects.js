/**
 * Underwater Effects - JavaScript for Visual Effects
 * 
 * This file handles the dynamic underwater visual effects for Blue Marlin OS:
 * - Particle system generation and animation
 * - Water ripple effect on mouse movement
 * - Accessibility considerations for reduced motion
 * - Theme toggle functionality
 */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ----------------------
// Particle System
// ----------------------
function createParticles() {
  // Skip particles creation if reduced motion is preferred
  if (prefersReducedMotion) return;
  
  // Select all .particles containers
  document.querySelectorAll('.particles').forEach(particlesContainer => {
    if (!particlesContainer) return;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles with identical parameters to original
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size (1px to 5px)
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 90 + 5}%`;
      particle.style.top = `${Math.random() * 90 + 5}%`;
      
      // Random animation timing
      const duration = Math.random() * 20 + 15; // 15s to 35s
      const delay = Math.random() * 15; // 0s to 15s
      
      // Set animation properties
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  });
}

// ----------------------
// Water Ripple Effect
// ----------------------
function initWaterRippleEffect() {
  // Skip water ripple effect if reduced motion is preferred
  if (prefersReducedMotion) return;
  
  const body = document.body;
  let throttled = false;
  
  body.addEventListener('mousemove', (e) => {
    // Throttle the effect creation (one ripple every 150ms max)
    if (!throttled) {
      throttled = true;
      setTimeout(() => { throttled = false; }, 150);
      
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.classList.add('water-ripple');
      
      // Position at mouse coordinates
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      
      // Add to DOM
      body.appendChild(ripple);
      
      // Apply animation
      ripple.style.animation = 'rippleEffect 2.5s ease-out forwards';
      
      // Remove after animation completes
      setTimeout(() => {
        if (ripple.parentNode === body) {
          body.removeChild(ripple);
        }
      }, 2500);
    }
  });
}

// ----------------------
// Theme Toggle Function
// ----------------------
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', function() {
    // Toggle theme class on html element
    document.documentElement.classList.toggle('phase-origin');
    
    // Update the toggle button appearance and aria-label
    const isDarkMode = !document.documentElement.classList.contains('phase-origin');
    const toggleKnob = document.querySelector('.theme-toggle-knob');
    const icon = toggleKnob.querySelector('.theme-toggle-icon');
    
    // Update the aria-label for screen readers
    this.setAttribute('aria-label', isDarkMode ? 'Switch to day mode' : 'Switch to night mode');
    
    // Update the icon (moon for night, sun for day)
    if (icon) {
      icon.textContent = isDarkMode ? '☾' : '☀';
    }
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
  
  // Apply saved theme preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('phase-origin');
    const toggleKnob = document.querySelector('.theme-toggle-knob');
    const icon = toggleKnob.querySelector('.theme-toggle-icon');
    themeToggle.setAttribute('aria-label', 'Switch to night mode');
    if (icon) {
      icon.textContent = '☀';
    }
  }
}

// ----------------------
// Content Animation
// ----------------------
function initContentAnimations() {
  if (prefersReducedMotion) return;
  
  const animateElements = document.querySelectorAll('.content-container');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function handleScroll() {
    animateElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('has-animated')) {
        element.classList.add('has-animated');
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

// ----------------------
// Initialization
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme toggle
  initThemeToggle();
  
  // Create particles for underwater effect
  createParticles();
  
  // Initialize water ripple effect
  initWaterRippleEffect();
  
  // Initialize content animations
  initContentAnimations();
}); 