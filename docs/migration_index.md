# Blue Marlin OS Migration Index

*This document serves as the comprehensive reference guide for all project components during the Tailwind CSS and 11ty migration process. It is regularly updated throughout development to catalog components, document implementation details, and serve as an AI reference guide.*

**Last Updated:** 2023-12-04

## Table of Contents

1. [About This Document](#about-this-document)
2. [Project Structure](#project-structure)
3. [Visual Effects & Theme System](#visual-effects--theme-system)
4. [UI Components](#ui-components)
5. [Layout System](#layout-system)
6. [Content Collections](#content-collections)
7. [Templates](#templates)
8. [Build System](#build-system)
9. [Component Cross-Reference](#component-cross-reference)
10. [Migration Traceability](#migration-traceability)

---

## About This Document

### Purpose

This migration index serves as:

1. A **living reference** that evolves throughout the migration process
2. A **comprehensive catalog** of all project components and their relationships
3. An **AI reference guide** for consistent implementation decisions
4. A **traceability map** between original and migrated components

### How To Use This Guide

- **AI Assistants:** Reference this document when implementing or modifying components to maintain consistency
- **Developers:** Use as documentation for understanding component structure and relationships
- **QA/Validation:** Use during quality validation to ensure comprehensive coverage

### Documentation Guidelines

Each component entry should include:

1. **Component Name & Purpose:** Clear identification of what the component is and does
2. **Structure:** HTML structure, CSS classes, and relevant attributes
3. **Usage Examples:** Code snippets showing typical implementation
4. **Variations & States:** Different configurations and interactive states
5. **Relationships:** Dependencies and connections to other components
6. **Implementation Notes:** Design decisions, special considerations, accessibility features
7. **Original vs. Migrated:** Comparison to the original implementation
8. **Visual Reference:** Links to screenshots or design mockups when appropriate

---

## Project Structure

> **REFERENCE FILES:**
> - `home.html`, `journal.html`, `blog.html`, `style-guide.html`, and `styles.css` are **REFERENCE ONLY** and are **NOT PART OF PRODUCTION FILES**. These files are static design references for migration and are not used in the 11ty/Tailwind build or deployment. All production pages are generated via 11ty templates and Markdown content. `styles.css` is the legacy stylesheet provided for reference only.

*This section documents the overall project structure and organization. It will be populated as the project structure is established.*

### Directory Structure

```
project-root/
├── .eleventy.js             # 11ty configuration
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── src/
│   ├── styles/
│   │   ├── main.css
│   │   ├── base/
│   │   │   └── reset.css
│   │   ├── animations/
│   │   │   └── effects.css
│   │   ├── themes/          # (present, currently empty)
│   │   ├── layouts/         # (present, currently empty)
│   │   └── components/      # (present, currently empty)
│   ├── scripts/
│   │   ├── main.js
│   │   └── underwater-effects.js
│   └── _includes/
│       ├── components/      # (present, currently empty)
│       └── layouts/         # (present, currently empty)
├── dist/
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   ├── main.js
│   │   └── underwater-effects.js
│   └── css/
│       └── styles.css
├── docs/
│   └── migration_index.md
├── README.md
├── codebase_state.md
├── codebase_log.md
├── home.html                # REFERENCE ONLY
├── journal.html             # REFERENCE ONLY
├── blog.html                # REFERENCE ONLY
├── style-guide.html         # REFERENCE ONLY
└── ... (other files)
```

- **Note:** Some directories (e.g., `src/pages`, `src/projects`, `src/journal`, `public/`, `src/_data`) are referenced in documentation but do not currently exist in the file system.

### Modular CSS Organization

- **Legacy Stylesheet:** `styles.css` (project root) — **REFERENCE ONLY, NOT PART OF PRODUCTION FILES**. This is the legacy CSS file provided for migration reference and is not used in the new Tailwind/11ty build.
- **Base Styles:** `src/styles/base/reset.css` — *Created. Contains detailed annotations and serves as the foundation for all styles.*
- **Main Stylesheet:** `src/styles/main.css` (imports all modules) — *Created. Entry point for Tailwind and PostCSS, imports base reset and is annotated for maintainability.*
- **Animation/Effects Styles:** `src/styles/animations/effects.css` — *Created. Placeholder for custom keyframes and effect-specific styles, to be expanded as effects are migrated.*
- **Component Styles:** `src/styles/components/` — *Directory present, tracked with .gitkeep for future component CSS modules.*
- **Layout Styles:** `src/styles/layouts/` — *Directory present, tracked with .gitkeep for future layout CSS modules.*
- **Theme Styles:** `src/styles/themes/` — *Directory present, tracked with .gitkeep for future theme CSS modules.*

#### CSS Module Reference

| File/Directory                        | Role & Contents                                                                 | Status/Notes                                 |
|---------------------------------------|---------------------------------------------------------------------------------|----------------------------------------------|
| `styles.css`                          | Legacy stylesheet, **REFERENCE ONLY, NOT PART OF PRODUCTION FILES**              | Provided for migration reference only         |
| `src/styles/main.css`                 | Main stylesheet, imports all modules, defines root theme variables              | Created, entry point for Tailwind/PostCSS     |
| `src/styles/base/reset.css`           | CSS reset and normalization, base element styles                                | Created, fully annotated                     |
| `src/styles/animations/effects.css`   | Custom animation helpers, effect-specific enhancements                          | Created, placeholder for effect styles        |
| `src/styles/components/`              | Component-specific styles (cards, nav, buttons, etc.)                           | Directory present, tracked with .gitkeep      |
| `src/styles/layouts/`                 | Layout-specific styles (grid, containers, breakpoints)                          | Directory present, tracked with .gitkeep      |
| `src/styles/themes/`                  | Theme-specific overrides and variables (day/night)                              | Directory present, tracked with .gitkeep      |

*Empty directories are tracked with `.gitkeep` files to ensure they are included in version control and ready for modular CSS expansion as the migration progresses.*

### Build Pipeline

*To be populated during implementation.*

---

## Visual Effects & Theme System

*This section documents all visual effects and theme system components. These are the highest priority components for preservation during migration.*

### Theme System

#### Theme Configuration

*To be populated during implementation.*

#### Theme Toggle Component

**Purpose:** Allows users to switch between day (phase-origin) and night (phase-apex) themes with an animated toggle switch.

**Structure:**
```html
<button id="themeToggle" class="theme-toggle" aria-label="Switch to day mode">
  <div class="theme-toggle-knob">
    <span class="theme-toggle-icon">☾</span>
  </div>
</button>
```

**CSS Classes:**
- `theme-toggle`: Main container for the toggle switch
- `theme-toggle-knob`: The movable button inside the toggle
- `theme-toggle-icon`: The sun/moon icon within the knob

**JavaScript Behavior:**
```javascript
document.getElementById('themeToggle').addEventListener('click', function() {
    // Toggle theme classes on html element
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
});
```

**CSS Implementation:**
```css
.theme-toggle {
    position: relative;      /* Positioning context for the knob */
    width: 48px;
    height: 24px;
    background-color: var(--apex-accent);
    border: none;
    border-radius: 12px;     /* Rounded toggle switch */
    cursor: pointer;
    transition: background-color 0.3s;
}
  
html.phase-origin .theme-toggle {
    background-color: var(--origin-accent);
}
  
.theme-toggle-knob {
    position: absolute;
    left: 26px;              /* Starting position for night mode (right side) */
    top: 2px;
    width: 20px;
    height: 20px;
    background-color: var(--apex-bg);
    border-radius: 50%;      /* Circular knob */
    display: flex;           /* Center the icon */
    align-items: center;
    justify-content: center;
    transition: left 0.3s;   /* Smooth sliding animation */
    color: var(--apex-text); /* Default icon color for night mode */
}
  
html.phase-origin .theme-toggle-knob {
    left: 2px;               /* Day mode position (left side) */
    background-color: var(--origin-bg);
    color: var(--origin-text); /* Icon color for day mode */
}

.theme-toggle-icon {
    display: block;
    font-size: 0.65rem;
    transform: translateY(0px);
    line-height: 1;
}
```

**States:**
- Default state (night mode): Knob positioned right, moon icon, blue accent background
- Toggled state (day mode): Knob positioned left, sun icon, orange accent background

**Accessibility Features:**
- Updated `aria-label` to indicate the action that will occur when pressed
- Visual distinction between states through both position and iconography
- Supports both mouse and keyboard interaction

**Implementation Notes:**
- The transition between states is 0.3s for smooth animation
- The theme affects the entire document via classes on the `html` element
- The toggle state is synced with the current theme on page load
- The toggle maintains its state across page navigations

**Tailwind Migration Approach:**
- Convert fixed pixel sizes to Tailwind's sizing system
- Maintain exact transition timing (0.3s)
- Preserve the exact positions of the knob (2px/26px)
- Configure theme variables to match current color values exactly

### Animation Components

#### Light Shaft Effect

**Purpose:** Creates animated light beams that simulate underwater light penetration, reinforcing the deep-sea environment theme.

**Structure:**
```html
<div class="light-shafts">
  <div class="light-shaft"></div>
  <div class="light-shaft"></div>
  <div class="light-shaft"></div>
  <div class="light-shaft"></div>
</div>
```

**Visual Characteristics:**
- Vertical beams of light with varying:
  - Width (20-40px)
  - Opacity (0.05-0.15)
  - Animation timing
  - Positioning
- Visible primarily in night mode (phase-apex)
- Subtle/reduced in day mode (phase-origin)

**CSS Implementation:**
```css
@keyframes lightShaftSway {
  0% { transform: translateX(-5px) rotate(1deg); opacity: var(--min-opacity); }
  50% { transform: translateX(5px) rotate(-1deg); opacity: var(--max-opacity); }
  100% { transform: translateX(-5px) rotate(1deg); opacity: var(--min-opacity); }
}

.light-shafts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.light-shaft {
  position: absolute;
  top: -10%;
  height: 120%;
  width: 30px;
  background: linear-gradient(to bottom, rgba(62, 142, 222, 0), rgba(62, 142, 222, 0.15), rgba(62, 142, 222, 0));
  transform-origin: top center;
  --min-opacity: 0.05;
  --max-opacity: 0.15;
  animation: lightShaftSway 8s ease-in-out infinite;
  will-change: transform, opacity;
}

/* Individual shaft positions and variations */
.light-shaft:nth-child(1) {
  left: 15%;
  width: 25px;
  animation-delay: -2s;
  animation-duration: 9s;
}

.light-shaft:nth-child(2) {
  left: 30%;
  width: 40px;
  animation-delay: -1s;
  animation-duration: 11s;
}

.light-shaft:nth-child(3) {
  left: 60%;
  width: 20px;
  animation-delay: -4s;
  animation-duration: 10s;
}

.light-shaft:nth-child(4) {
  left: 80%;
  width: 35px;
  animation-delay: -3s;
  animation-duration: 12s;
}

/* Day mode adjustments */
html.phase-origin .light-shaft {
  --min-opacity: 0;
  --max-opacity: 0.05;
  background: linear-gradient(to bottom, rgba(242, 116, 5, 0), rgba(242, 116, 5, 0.05), rgba(242, 116, 5, 0));
}
```

**Animation Details:**
- Keyframe: `lightShaftSway`
- Properties animated: 
  - `transform` (translateX and rotate)
  - `opacity`
- Timing functions: `ease-in-out`
- Durations: Vary between 8-12 seconds (different for each shaft)
- Delays: Varied negative values to create asynchronous movement
- Performance optimization: Uses `will-change: transform, opacity`

**Theme Variations:**
- Night mode (phase-apex): Blue light shafts with higher opacity (0.05-0.15)
- Day mode (phase-origin): Orange light shafts with reduced opacity (0-0.05)

**Implementation Notes:**
- The light shafts are positioned absolutely within a container
- Each shaft has unique dimensions, positions, and animation timings
- The effect is purely decorative and does not interfere with content interaction
- CSS variables are used to control opacity ranges for theme transitions

**Tailwind Migration Approach:**
- Create a custom animation plugin for the `lightShaftSway` keyframe
- Maintain exact gradient colors, opacity values and transition timings
- Preserve the specific width, placement and animation timing for each shaft
- Ensure CSS variables for theme-specific opacity still function correctly

#### Particle System

**Purpose:** Creates animated floating particles throughout the interface that enhance the underwater atmosphere and respond to the current theme.

**Structure:**
```html
<div class="particles" id="particles">
  <!-- Particles are dynamically generated via JavaScript -->
</div>
```

**JavaScript Implementation:**
```javascript
function createParticles() {
  // Select all .particles containers (main and demo)
  document.querySelectorAll('.particles').forEach(particlesContainer => {
    if (!particlesContainer) return;
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    const particleCount = 100; // Adjust number of particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      // Random size for each particle
      const size = Math.random() * 4 + 1; // 1px to 5px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      // Random position within the container
      particle.style.left = `${Math.random() * 90 + 5}%`;
      particle.style.top = `${Math.random() * 90 + 5}%`;
      // Random animation duration and delay for natural movement
      const duration = Math.random() * 20 + 15; // 15s to 35s
      const delay = Math.random() * 15;  // 0s to 15s
      particle.style.animation = `drift ${duration}s linear ${delay}s infinite`;
      particlesContainer.appendChild(particle);
    }
  });
}
```

**CSS Implementation:**
```css
/* Floating particles container */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;    /* Allows clicks to pass through */
  z-index: 1;
}

/* Individual particle styling */
.particle {
  position: absolute;      /* Positioned randomly via JavaScript */
  background-color: #fff;  /* White particle */
  border-radius: 50%;      /* Circular shape */
  opacity: 0.7;
  box-shadow: 0 0 8px rgba(0, 132, 255, 0.8); /* Blue glow effect */
  transition: box-shadow 1s;
  
  /* Default animation applied to all particles
     Specific duration/delay set via JavaScript */
  animation: drift 20s linear infinite;
}

/* Removes glow from particles in day mode */
html.phase-origin .particle {
  box-shadow: none;
}

/* Particle floating animation with horizontal movement */
@keyframes drift {
  0% {
    transform: translateY(50px) translateX(0px);  /* Start below and centered */
    opacity: 0;                                  /* Start invisible */
  }
  10% {
    opacity: 0.6;                               /* Fade in quickly */
  }
  20% {
    transform: translateY(-20px) translateX(-5px); /* Drift up and left */
  }
  40% {
    transform: translateY(-40px) translateX(3px);  /* Continue up, drift right */
  }
  60% {
    transform: translateY(-60px) translateX(-2px); /* Continue up, drift left */
  }
  80% {
    transform: translateY(-80px) translateX(4px);  /* Continue up, drift right */
  }
  90% {
    opacity: 0.6;                               /* Maintain visibility */
  }
  100% {
    transform: translateY(-150px) translateX(0px); /* End above and centered */
    opacity: 0;                                   /* Fade out */
  }
}
```

**Visual Characteristics:**
- Tiny white particles (1-5px) with blue glow in night mode
- No glow in day mode
- Slowly float upward with gentle side-to-side movement
- Random sizes, positions, and animation timing
- Variable opacity (fade in/out)
- Approximately 100 particles for a balanced density

**Animation Details:**
- Keyframe: `drift`
- Properties animated: 
  - `transform` (translateY and translateX)
  - `opacity`
- Duration: Randomized between 15-35 seconds per particle
- Delay: Randomized between 0-15 seconds per particle
- Easing: `linear` for smooth continuous motion
- Path: Complex upward movement with subtle left/right drift

**Theme Variations:**
- Night mode (phase-apex): Particles have blue glow (box-shadow)
- Day mode (phase-origin): Particles have no glow effect

**Accessibility Features:**
- Particles are hidden when reduced motion is preferred:
  ```javascript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Hide particles for accessibility
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      particlesContainer.style.display = 'none';
    }
  }
  ```
- `pointer-events: none` ensures particles don't interfere with user interaction

**Implementation Notes:**
- Particles are generated dynamically at runtime with JavaScript
- Each particle gets unique random properties for natural variation
- The container is positioned absolutely to fill its parent element
- Particles use z-index:1 to appear above backgrounds but below content

**Tailwind Migration Approach:**
- Create a custom animation plugin for the `drift` keyframe
- Maintain exact animation timing ranges (15-35s duration, 0-15s delay)
- Preserve the particle glowing effect and theme-specific styling
- Ensure reduced motion preference detection still works correctly
- Convert size ranges to Tailwind's sizing system while maintaining variation

#### Water Ripple Effect

**Purpose:** Creates interactive water ripple effects that follow the user's cursor movements, enhancing the underwater atmosphere with subtle disturbance effects.

**Implementation Type:** Dynamic - created and animated via JavaScript in response to mouse movement

**JavaScript Implementation:**
```javascript
function initMouseWaterEffect() {
  const body = document.body;
  let throttled = false;
  body.addEventListener('mousemove', (e) => {
    // Throttle the effect creation to avoid performance issues
    if (!throttled) {
      throttled = true;
      setTimeout(() => { throttled = false; }, 150); // Only create a new ripple every 150ms
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.classList.add('water-ripple');
      // Position at mouse coordinates
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      // Add to DOM
      body.appendChild(ripple);
      // Animate
      ripple.style.animation = 'rippleEffect 2.5s ease-out forwards'; // Slower animation
      // Remove after animation completes
      setTimeout(() => {
        body.removeChild(ripple);
      }, 2500); // Match the animation duration
    }
  });
}
```

**CSS Implementation:**
```css
/* Mouse interaction water ripple effect */
@keyframes rippleEffect {
  0% {
    width: 0;                                   /* Start as a point */
    height: 0;
    opacity: 0.6;                               /* Semi-transparent */
  }
  100% {
    width: 400px;                               /* Expand to large circle */
    height: 400px;
    opacity: 0.4;                                 /* Fade out completely */
  }
}

/* Water ripple styling */
.water-ripple {
  position: absolute;                              /* Position at cursor location */
  pointer-events: none;                            /* Don't interfere with clicks */
  border-radius: 50%;                              /* Circular shape */
  background: radial-gradient(circle, rgba(10, 76, 158, 0.08) 0%, rgba(10, 76, 158, 0) 70%); /* Fade-out gradient */
  transform: translate(-50%, -50%);                /* Center on cursor */
  z-index: 5;                                      /* Above background, below content */
  opacity: 0;                                      /* Start invisible (animated by JS) */
}

html.phase-origin .water-ripple {
  background: radial-gradient(circle, rgba(74, 143, 231, 0.08) 0%, rgba(74, 143, 231, 0) 70%); /* Day mode colors */
}
```

**Visual Characteristics:**
- Circular ripples that expand outward from cursor position
- Semi-transparent radial gradient (fades out at edges)
- Starts small and expands to 400px diameter
- Opacity gradually decreases as the ripple expands
- New ripples are created as the user moves the mouse

**Animation Details:**
- Keyframe: `rippleEffect`
- Properties animated:
  - `width` and `height` (0px to 400px)
  - `opacity` (0.6 to 0.4)
- Duration: 2.5 seconds per ripple
- Easing: `ease-out` for natural deceleration
- Timing: Throttled to create a new ripple at most every 150ms

**Theme Variations:**
- Night mode (phase-apex): Blue-tinted ripple gradient (`rgba(10, 76, 158, 0.08)`)
- Day mode (phase-origin): Lighter blue ripple gradient (`rgba(74, 143, 231, 0.08)`)

**Performance Optimizations:**
- Throttling mechanism limits ripple creation to prevent performance issues
- Ripple elements are removed from the DOM after animation completes
- Uses `pointer-events: none` to prevent interference with other interactions
- Efficient z-index placement ensures proper layering without excessive stacking

**Accessibility Features:**
- Effect is purely decorative and doesn't interfere with content interaction
- Automatically disabled when user prefers reduced motion

**Implementation Notes:**
- Ripple elements are dynamically created and positioned at cursor coordinates
- Each ripple is centered on the cursor using `transform: translate(-50%, -50%)`
- Animation uses `forwards` fill mode to maintain final state until removal
- The throttling timeout (150ms) is balanced for smooth visual effect without performance impact

**Tailwind Migration Approach:**
- Create a custom animation plugin for the `rippleEffect` keyframe
- Maintain the exact timing (2.5s duration, ease-out easing)
- Preserve gradient colors and opacity values for both themes
- Keep the exact expansion size (400px) and throttling timing (150ms)
- Ensure the JavaScript event binding is maintained in the new implementation

#### Content Transitions

**Purpose:** Provides smooth entrance animations for content containers as they enter the viewport, creating a floating, underwater-like motion effect.

**CSS Implementation:**
```css
/* Content container with glass morphism effect */
.content-container {
  position: relative;       /* Create stacking context */
  z-index: 10;              /* Position above underwater environment */
  margin: 1rem;
  padding: 1.5rem;
  background-color: var(--apex-container-bg);
  backdrop-filter: blur(10px); /* Glass effect */
  border: 1px solid rgba(255, 255, 255, 0.05); /* Subtle border */
  border-radius: 0.5rem;    /* Rounded corners */
  animation: floatIn 0.8s ease-out; /* Entrance animation */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Depth shadow */
}

/* Content entrance animation */
@keyframes floatIn {
  0% { opacity: 0; transform: translateY(20px); }  /* Start invisible and below final position */
  100% { opacity: 1; transform: translateY(0); }   /* Fade in and move up */
}
```

**JavaScript Implementation (Scroll-triggered):**
```javascript
// Adds entrance animation to .content-container elements as they enter viewport
(function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.content-container');
  
  // Helper: is element in viewport?
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // On scroll, animate elements that enter viewport
  function handleScroll() {
    animateElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('has-animated')) {
        element.classList.add('has-animated');
        element.style.animationDelay = '0s';
        element.style.animationDuration = '0.8s';
        element.style.animationName = 'floatIn';
        element.style.animationFillMode = 'backwards';
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
})();
```

**Interactive Element Animations:**

```css
/* Call to action links with animated arrows */
.read-more {
  display: inline-flex;     /* Allow width to be content-based */
  align-items: center;      /* Vertically center text and icon */
  color: var(--apex-accent);
  font-weight: 700;         /* Bolder text */
  margin-top: 1rem;
  transition: transform 0.2s ease-out, text-shadow 0.2s ease-out, color 0.2s ease-out;
}

html.phase-origin .read-more {
  color: var(--origin-accent);
}

/* Arrow icon */
.read-more svg {
  margin-left: 0.25rem;     /* Space between text and arrow */
  transition: transform 0.2s; /* Animation setup */
}

/* Animated arrow on hover */
.read-more:hover svg,
.read-more:focus svg {
  transform: translateX(5px); /* Move arrow further */
}

/* Text glow and underline on hover/focus */
.read-more:hover,
.read-more:focus {
  text-decoration: underline;
  text-shadow: 0 0 8px rgba(var(--apex-accent-rgb), 0.5); /* Add text glow */
  outline: none; /* Remove focus outline if using other indicators */
}

html.phase-origin .read-more:hover,
html.phase-origin .read-more:focus {
  text-shadow: 0 0 8px rgba(var(--origin-accent-rgb), 0.5);
}

/* Button glow animations */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(var(--origin-accent-rgb), 0.4), inset 0 0 3px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 25px rgba(var(--origin-accent-rgb), 0.8), inset 0 0 8px rgba(255,255,255,0.4); }
}

@keyframes pulseGlowApex {
  0%, 100% { box-shadow: 0 0 10px rgba(var(--apex-accent-rgb), 0.4), inset 0 0 4px rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 30px rgba(var(--apex-accent-rgb), 0.9), inset 0 0 10px rgba(255,255,255,0.2); }
}
```

**Animation Types:**

1. **Content Entrances**
   - `.content-container` elements slide upward and fade in as they enter the viewport
   - Duration: 0.8 seconds
   - Easing: `ease-out` for natural deceleration
   - Triggered automatically on page load and scroll

2. **Hover Transitions**
   - Call-to-action links with animated arrows (shift right on hover)
   - Text glow effects on interactive elements
   - Duration: 0.2 seconds
   - Theme-specific styling for all states

3. **Glow Effects**
   - Pulsing box shadows with different intensities for day/night modes
   - Inner and outer glows with theme-specific colors and opacities

**Accessibility Features:**
- All animations are disabled when user prefers reduced motion
- Focus states mirror hover states for keyboard navigation
- Transitions are short enough (0.2-0.8s) to not cause discomfort

**Implementation Notes:**
- Content entrances are triggered at 80% of the viewport height to start animation before fully in view
- Elements track their animation state via the `has-animated` class to prevent replay
- All animations use performance-friendly properties (opacity, transform)
- Theme-specific variations maintain the same timing while changing only colors

**Tailwind Migration Approach:**
- Create custom keyframes for `floatIn`, `pulseGlow`, and `pulseGlowApex`
- Maintain the exact timing (0.8s for content, 0.2s for hover states)
- Preserve the same easing functions (`ease-out`)
- Implement the scroll triggering logic using Intersection Observer instead of scroll events
- Configure theme variables to match current glow colors and opacity values exactly
- Ensure reduced motion preference detection works with the Tailwind implementation

### Dual Theme System Migration Status

**Status:** Complete (Implementation Phase)

- Theme toggle is fully implemented with smooth animation, aria-label updates, and icon switching.
- All color variables for both night (apex) and day (origin) themes are defined, documented, and match the design spec.
- Theme-specific animation behaviors (light shafts, particles, ripples, transitions) are handled via CSS, Tailwind plugin, and JS, responding to `.phase-origin`.
- User theme preference is persisted via localStorage and restored on page load.
- Accessibility is ensured: toggle is keyboard accessible, aria-labels update, and reduced motion is respected throughout.
- **Visual validation is deferred until the first pages are ready to view.**

*See codebase_state.md and codebase_log.md for detailed plan and log entries.*

## Benchmark Results

*This section is for recording the results of visual, performance, and accessibility benchmarking for all underwater effects and theme system animations. Use this checklist to ensure fidelity and performance across environments.*

### Benchmarking Checklist

#### Visual Benchmarking
- [ ] Capture reference screenshots of each effect (light shafts, particles, ripple, content transitions) in both day and night themes
- [ ] Record screen video of animations in action
- [ ] Note any visual discrepancies or artifacts
- [ ] Confirm theme toggle transitions are smooth and accurate

#### Performance Benchmarking
- [ ] Measure animation smoothness (FPS) using browser dev tools (Chrome, Firefox, etc.)
- [ ] Record CPU/GPU usage during animation
- [ ] Note load time and animation start time for each effect
- [ ] Test on at least one low-end device (if available)
- [ ] Note any performance drops or jank (especially with 100+ particles and ripple effects)

#### Accessibility Benchmarking
- [ ] Enable `prefers-reduced-motion` and confirm all effects are disabled or reduced
- [ ] Test keyboard navigation for theme toggle and interactive elements
- [ ] Test with screen reader for accessibility compliance

#### Theme-Specific Animation Benchmarking
- [ ] Toggle between day and night themes and observe:
  - [ ] Color changes
  - [ ] Animation parameter changes (opacity, glow, etc.)
  - [ ] Transition smoothness

#### Documentation
- [ ] Attach screenshots and performance metrics
- [ ] Record any issues or areas for optimization

---

### Instructions for Running Benchmarks

1. **Visual Benchmarks:**
   - Use browser screenshot and screen recording tools (e.g., Chrome DevTools, Windows Snipping Tool, macOS Screenshot, OBS Studio).
   - Compare with original implementation if available.

2. **Performance Benchmarks:**
   - Use browser DevTools (Performance tab) to measure FPS and CPU/GPU usage.
   - Use Lighthouse (in Chrome DevTools) for performance audits.
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge) and at least one low-end device if possible.

3. **Accessibility Benchmarks:**
   - Use OS/browser settings to enable reduced motion and test effect disabling.
   - Use screen readers (NVDA, VoiceOver, ChromeVox) to test accessibility.
   - Test keyboard navigation for all interactive elements.

4. **Theme-Specific Benchmarks:**
   - Toggle theme using the theme toggle button and observe all effects for correct color and animation changes.

---

*Fill in the checklist above with your results. Attach screenshots and performance data as needed. Use this as a reference for quality validation and future optimization.*

## UI Components

*This section catalogs all UI components in the system.*

### Navigation

*To be populated during implementation.*

### Cards

*To be populated during implementation.*

### Buttons & Interactive Elements

*To be populated during implementation.*

### Form Elements

*To be populated during implementation.*

### Glass-morphic Containers

*To be populated during implementation.*

---

## Layout System

*This section documents the layout system and grid components.*

### Responsive Breakpoints

*To be populated during implementation.*

### 1-Column Layout (Mobile)

*To be populated during implementation.*

### 2-Column Layout

*To be populated during implementation.*

### 3-Column Grid Layout

*To be populated during implementation.*

---

## Content Collections

*This section documents the content collection structure and frontmatter schemas.*

### Projects Collection

*To be populated during implementation.*

### Journal Collection

*To be populated during implementation.*

### Tags & Categories

*To be populated during implementation.*

---

## Templates

*This section documents all page templates and their components.*

### Collection Template

*To be populated during implementation.*

### Entry Template

*To be populated during implementation.*

### Landing Page Template

*To be populated during implementation.*

---

## Build System

*This section documents the build system configuration and processes.*

### 11ty Configuration

*To be populated during implementation.*

### Tailwind Configuration

*To be populated during implementation.*

### CI/CD Pipeline

*To be populated during implementation.*

---

## Component Cross-Reference

*This section provides a cross-reference matrix showing relationships between components. It will be populated as components are implemented.*

| Component | Dependencies | Used By | Related Components |
|-----------|--------------|---------|-------------------|
| *Example: Theme Toggle* | *ThemeSystem, IconComponent* | *Header, Footer* | *NightModeStyles, DayModeStyles* |

---

## Migration Traceability

*This section maps original components to their migrated counterparts for traceability.*

### Visual Effects

| Original Implementation | Migrated Implementation | Status |
|-------------------------|-------------------------|--------|
| *To be populated* | *To be populated* | *Not Started* |

### UI Components

| Original Implementation | Migrated Implementation | Status |
|-------------------------|-------------------------|--------|
| *To be populated* | *To be populated* | *Not Started* |

### Styles & Layouts

| Original Implementation | Migrated Implementation | Status |
|-------------------------|-------------------------|--------|
| *To be populated* | *To be populated* | *Not Started* |

---

## Component Template

Below is a template for documenting individual components:

```markdown
### Component Name

**Purpose:** Brief description of the component's purpose

**Structure:**
```html
<!-- HTML structure example -->
<div class="component-class">
  <div class="component-inner">
    <!-- Component content -->
  </div>
</div>
```

**CSS Classes:**
- `component-class`: Main component container
- `component-inner`: Inner container

**Usage:**
```html
<!-- Usage example -->
<div class="component-class">
  <div class="component-inner">
    <p>Example content</p>
  </div>
</div>
```

**Variations:**
- Default variant
- Alternative variant

**States:**
- Default state
- Hover state
- Active state

**Dependencies:**
- Dependency 1
- Dependency 2

**Implementation Notes:**
- Important consideration 1
- Accessibility feature 1

**Original vs. Migrated:**
- Original: [Description or link]
- Changes: [List of changes]

**Visual Reference:**
- [Link to screenshot or design]
``` 