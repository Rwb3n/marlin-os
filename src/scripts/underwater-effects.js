/**
 * Underwater Effects - JavaScript for Visual Effects
 *
 * This file handles the dynamic underwater visual effects for Blue Marlin OS:
 * - Particle system generation and animation
 * - Water ripple effect on mouse movement
 * - Accessibility considerations for reduced motion
 * - Theme toggle functionality
 *
 * ---
 * ANNOTATION: This module is responsible for all runtime visual effects that
 * require JavaScript. It works in tandem with Tailwind CSS and custom plugins
 * to deliver a seamless underwater experience. All functions are documented for
 * maintainability and AI reference.
 *
 * Theme variations are handled via the `.phase-origin` class on <html>.
 * Accessibility: Reduced motion is supported via media queries and runtime checks.
 *
 * For animation parameters and theme details, see docs/migration_index.md.
 */

// Check for reduced motion preference
// If true, disables or reduces non-essential animations for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ----------------------
// Particle System
// ----------------------
/**
 * createParticles()
 *
 * Dynamically generates and animates floating particles to simulate underwater
 * atmosphere. Each particle is given a random size, position, duration, and delay
 * for natural movement. The effect is disabled if reduced motion is preferred.
 *
 * - Container: .particles (can be multiple per page)
 * - Particle: .particle (styled via Tailwind and CSS)
 * - Theme: Glow is enabled in night mode, disabled in day mode
 * - Accessibility: Skipped if prefers-reduced-motion
 */
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
/**
 * initWaterRippleEffect()
 *
 * Creates interactive water ripple effects that follow the user's cursor movements.
 * Ripples are dynamically created and animated at the mouse position, then removed
 * after the animation completes. Throttling is used to prevent performance issues.
 *
 * - Element: .water-ripple (styled via Tailwind and CSS)
 * - Theme: Gradient color changes with theme
 * - Accessibility: Disabled if prefers-reduced-motion
 */
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
/**
 * initThemeToggle()
 *
 * Handles the theme toggle button, allowing users to switch between day (phase-origin)
 * and night (phase-apex) themes. Updates the <html> class, toggle icon, and aria-label
 * for accessibility. Saves user preference in localStorage.
 *
 * - Button: #themeToggle (injected via Eleventy shortcode)
 * - Theme: .phase-origin class on <html> triggers day mode
 * - Accessibility: Updates aria-label and icon for screen readers
 */
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
/**
 * initContentAnimations()
 *
 * Adds entrance animation to .content-container elements as they enter the viewport.
 * Uses a simple viewport check on scroll to trigger the animation. Disabled if
 * reduced motion is preferred.
 *
 * - Element: .content-container (styled via Tailwind and CSS)
 * - Accessibility: Disabled if prefers-reduced-motion
 */
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
/**
 * On DOMContentLoaded, initialize all underwater effects and theme system features.
 * Ensures all effects are only started after the DOM is ready.
 */
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