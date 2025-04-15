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

### Directory Structure (as of current migration phase)

```
project-root/
├── .eleventy.js             # 11ty configuration (Nunjucks, passthroughs, shortcodes)
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration (custom themes, animations)
├── postcss.config.js        # PostCSS configuration (Tailwind, Autoprefixer)
├── docs/
│   └── migration_index.md   # Comprehensive migration documentation
├── dist/                    # Production build output (HTML, CSS, JS)
│   ├── css/                 # Compiled CSS output
│   └── ...                  # Other build artifacts
├── src/
│   ├── index.njk            # Minimal test template for 11ty + Tailwind validation
│   ├── styles/
│   │   ├── main.css         # Tailwind entry, imports modular CSS
│   │   ├── base/
│   │   │   └── reset.css    # Base CSS reset (fully annotated)
│   │   ├── animations/
│   │   │   └── effects.css  # Animation/effects module (annotated placeholder)
│   │   ├── components/      # Component CSS modules (.gitkeep for tracking)
│   │   ├── layouts/         # Layout CSS modules (.gitkeep for tracking)
│   │   └── themes/          # Theme CSS modules (.gitkeep for tracking)
│   ├── scripts/             # JavaScript modules (underwater effects, main.js)
│   └── _includes/
│       ├── layouts/         # 11ty layout templates (.gitkeep for tracking)
│       └── components/      # 11ty component templates (.gitkeep for tracking)
├── styles.css               # Legacy stylesheet (REFERENCE ONLY)
├── home.html                # Reference file (not in production)
├── journal.html             # Reference file (not in production)
├── blog.html                # Reference file (not in production)
├── style-guide.html         # Reference file (not in production)
├── codebase_state.md        # Workflow state, plan, and log
├── codebase_log.md          # Chronological log of actions/events
└── ...                      # Other project files
```

**Notes:**
- `.gitkeep` files are present in empty directories to ensure they are tracked in version control and ready for modular CSS/template expansion.
- All reference files (`home.html`, `journal.html`, `blog.html`, `style-guide.html`, `styles.css`) are clearly labeled and not part of the production build.
- The structure is designed for maintainability, modularity, and clear separation of concerns for 11ty + Tailwind migration.

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

The build pipeline for Blue Marlin OS is designed for modularity, maintainability, and rapid development. It leverages Tailwind CSS, PostCSS, and 11ty, with npm scripts orchestrating the workflow.

#### Key npm Scripts (from package.json)

| Script           | Command                                              | Purpose                                                                 |
|------------------|------------------------------------------------------|-------------------------------------------------------------------------|
| `build`          | `npm-run-all build:*`                                | Runs all build steps (CSS and 11ty) for production output               |
| `build:css`      | `postcss src/styles/main.css -o dist/css/styles.css` | Processes main.css with PostCSS (Tailwind, Autoprefixer) to output CSS  |
| `build:eleventy` | `eleventy`                                           | Builds the static site with 11ty using Nunjucks templates               |
| `start`          | `npm-run-all --parallel dev:*`                       | Runs both CSS and 11ty dev servers in parallel for live development     |
| `dev:css`        | `postcss src/styles/main.css -o dist/css/styles.css --watch` | Watches and rebuilds CSS on changes using PostCSS/Tailwind      |
| `dev:eleventy`   | `eleventy --serve`                                   | Runs 11ty in dev mode with live reload and BrowserSync                  |
| `clean`          | `rm -rf dist`                                        | Cleans the output directory                                             |

#### Build/Dev Workflow

- **Development:**
  - Run `npm start` to launch both the 11ty dev server and Tailwind/PostCSS watcher in parallel.
  - Edit templates, content, or CSS modules; changes are reflected live via BrowserSync and hot reload.
  - Modular CSS is processed through PostCSS, with Tailwind utilities and custom modules combined into `dist/css/styles.css`.

- **Production Build:**
  - Run `npm run build` to generate the full static site and production CSS bundle.
  - All modular CSS, Tailwind utilities, and custom effects are included in the final output.

- **Pipeline Readiness:**
  - The pipeline is ready for test builds, further modularization, and integration of new CSS modules and templates.
  - See package.json for full script details and docs/migration_index.md for pipeline documentation.

---

## Visual Effects & Theme System

*This section documents all visual effects and theme system components. These are the highest priority components for preservation during migration.*

### Theme System

#### Theme Configuration

*To be populated during implementation.*

#### Theme Toggle Component

**File Location:** `/src/_includes/components/theme-toggle.njk`

**Purpose:** Provides a user interface control for switching between day and night themes, with smooth animations and water ripple effects.

**Usage Example:**
```njk
{% include "components/theme-toggle.njk" %}
```

**Component Structure:**
- Button container with accessibility attributes
- SVG icons for sun (day theme) and moon (night theme)
- JavaScript for theme state management and transitions

**Behavior:**
- Toggles between day/night themes with smooth CSS transitions
- Preserves user preference in localStorage
- Triggers a custom 'themeChanged' event for other components to react
- Integrates water ripple effect animation on theme change
- Provides ARIA attributes for accessibility

**Migration Notes:**
- Preserves identical functionality to original theme toggle
- Maintains exact color values from legacy CSS
- Ensures theme-specific animations function correctly
- Optimized for performance with minimal DOM operations

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

**Purpose:** Provides primary site navigation with theme-aware colors, active link highlighting, and accessible markup.

**Structure:**
```html
<nav class="nav-bar flex gap-6 bg-apex-header-bg rounded-lg px-6 py-3 shadow max-w-md w-full" aria-label="Main navigation">
  <a href="#" class="nav-link text-apex-accent font-semibold px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-apex-accent bg-apex-accent/20">Home</a>
  <a href="#" class="nav-link text-apex-muted hover:text-apex-accent font-semibold px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-apex-accent">Projects</a>
  <a href="#" class="nav-link text-apex-muted hover:text-apex-accent font-semibold px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-apex-accent">Journal</a>
</nav>
```

**CSS Classes:**
- `nav-bar`: Navigation container
- `nav-link`: Navigation link, with active/hover/focus states

**Usage:** See style guide demo (Navigation Component)

**Variations & States:**
- Active link (highlighted)
- Hover/focus (accent color, focus ring)

**Dependencies:**
- Theme system (for color classes)

**Implementation Notes:**
- Uses `aria-label` for accessibility
- Focus ring for keyboard navigation
- Responsive to theme changes

**Original vs. Migrated:**
- Original: Legacy navigation bar in `styles.css`/HTML
- Migrated: Modular, theme-aware, Tailwind-based nav in style guide

**Visual Reference:** See style guide demo

---

### Card

**Purpose:** Glass-morphic container for content, with theme-aware background, shadow, and rounded corners.

**Structure:**
```html
<div class="content-container bg-apex-container-bg rounded-lg shadow-lg p-6 max-w-md w-full">
  <h4 class="text-lg font-semibold mb-2">Card Title</h4>
  <p class="mb-4">This is a sample card. It uses the <code>content-container</code> class for glass-morphism, spacing, and theme responsiveness.</p>
  <button class="button btn-glow px-4 py-2 rounded bg-apex-accent text-white font-bold hover:opacity-90 transition">Card Action</button>
</div>
```

**CSS Classes:**
- `content-container`: Glass-morphic card container
- `bg-apex-container-bg`, `rounded-lg`, `shadow-lg`, `p-6`, etc.: Tailwind utility classes
- `button`, `btn-glow`: For action button

**Usage:** See style guide demo (Card Component)

**Variations & States:**
- Default
- Hover/focus (button)
- Outline/hover variants (future)

**Dependencies:**
- Theme system
- Button component

**Implementation Notes:**
- Uses backdrop blur and semi-transparent backgrounds
- Responsive to theme changes

**Original vs. Migrated:**
- Original: Card in legacy HTML/CSS
- Migrated: Modular, theme-aware, Tailwind-based card in style guide

**Visual Reference:** See style guide demo

---

### Feature List

**Purpose:** List of features with custom theme-aware bullets, accessible and modular.

**Structure:**
```html
<ul class="feature-list list-none pl-0 max-w-md w-full">
  <li class="flex items-start mb-2">
    <span class="feature-bullet w-3 h-3 mt-1 mr-3 rounded-full bg-apex-accent shadow"></span>
    <span>Feature text</span>
  </li>
  <!-- ... -->
</ul>
```

**CSS Classes:**
- `feature-list`: List container
- `feature-bullet`: Custom bullet
- Tailwind spacing/typography classes

**Usage:** See style guide demo (Feature List Component)

**Variations & States:**
- Default
- Compact/alt bullet (future)

**Dependencies:**
- Theme system

**Implementation Notes:**
- Semantic list structure
- Bullets adapt to theme

**Original vs. Migrated:**
- Original: Feature list in legacy HTML/CSS
- Migrated: Modular, theme-aware, Tailwind-based feature list in style guide

**Visual Reference:** See style guide demo

---

### Call-to-Action Link

**Purpose:** Prominent link with animated arrow, theme-aware color, and hover/focus effects.

**Structure:**
```html
<a href="#" class="read-more inline-flex items-center font-semibold text-apex-accent hover:underline hover:text-apex-accent focus:outline-none focus:ring-2 focus:ring-apex-accent transition group">
  Learn More
  <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-focus:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6"/></svg>
</a>
```

**CSS Classes:**
- `read-more`: Main link styling
- Tailwind utility classes for color, spacing, focus, and animation

**Usage:** See style guide demo (Call-to-Action Link Component)

**Variations & States:**
- Default
- Large/icon variants (future)
- Hover/focus (arrow slides, text glows)

**Dependencies:**
- Theme system

**Implementation Notes:**
- Focus ring and color contrast for accessibility
- Animated arrow on hover/focus

**Original vs. Migrated:**
- Original: CTA link in legacy HTML/CSS
- Migrated: Modular, theme-aware, Tailwind-based CTA link in style guide

**Visual Reference:** See style guide demo

---

### Tooltip

**Purpose:** Provides contextual information on hover or focus, with theme-aware styling and accessible markup.

**Structure:**
```html
<div class="relative inline-block group">
  <button type="button" aria-describedby="demo-tooltip" class="px-4 py-2 rounded bg-apex-accent text-white font-bold focus:outline-none focus:ring-2 focus:ring-apex-accent transition">Hover me</button>
  <div id="demo-tooltip" role="tooltip" class="tooltip-content absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-apex-header-bg text-apex-text text-xs rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none z-20">
    Tooltip text: Accessible, theme-aware, and animated.
    <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-3 h-3 bg-apex-header-bg rotate-45"></div>
  </div>
</div>
```

**CSS Classes:**
- `tooltip-content`: Tooltip container
- Tailwind utility classes for color, spacing, animation

**Usage:** See style guide demo (Tooltip Component)

**Variations & States:**
- Default
- Top/large/error variants (future)
- Hover/focus (fade in/out)

**Dependencies:**
- Theme system

**Implementation Notes:**
- Uses `aria-describedby`, `role="tooltip"` for accessibility
- Keyboard and mouse accessible
- Animated with `transition-opacity`

**Original vs. Migrated:**
- Original: Tooltip in legacy HTML/CSS
- Migrated: Modular, theme-aware, Tailwind-based tooltip in style guide

**Visual Reference:** See style guide demo

---

### Accordion

**Purpose:** Allows users to expand/collapse content sections, with theme-aware styling and accessible markup.

**Structure:**
```html
<div class="accordion max-w-md w-full bg-apex-container-bg rounded-lg shadow-lg divide-y divide-apex-accent/20">
  <div class="accordion-item">
    <button type="button" aria-expanded="false" aria-controls="acc-panel-1" id="acc-trigger-1" class="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-apex-accent focus:outline-none focus:ring-2 focus:ring-apex-accent transition">
      Accordion Item 1
      <span class="ml-2 transition-transform">&#9662;</span>
    </button>
    <div id="acc-panel-1" role="region" aria-labelledby="acc-trigger-1" class="max-h-0 overflow-hidden transition-all duration-300 bg-apex-bg px-4">
      <p class="py-3 text-apex-text">This is the content for accordion item 1. It expands and collapses with smooth animation.</p>
    </div>
  </div>
  <!-- ... -->
</div>
```

**CSS Classes:**
- `accordion`: Accordion container
- `accordion-item`: Accordion item
- Tailwind utility classes for color, spacing, animation

**Usage:** See style guide demo (Accordion Component)

**Variations & States:**
- Default
- Large/outline/icon variants (future)
- Expanded/collapsed (aria-expanded)

**Dependencies:**
- Theme system

**Implementation Notes:**
- Uses `aria-expanded`, `aria-controls`, `role="region"` for accessibility
- Keyboard and mouse accessible
- Animated with `transition-all` and `max-height`

**Original vs. Migrated:**
- Original: Accordion in legacy HTML/CSS
- Migrated: Modular, theme-aware, Tailwind-based accordion in style guide

**Visual Reference:** See style guide demo

---

### Accordion Variants

**Component Name:** Accordion Variants (Icon, Large, Outlined)  
**Last Updated:** 2025-03-27  
**Implementation Status:** ✅ Complete  

**Description:**  
Extended variants of the base Accordion component that provide additional styling and functionality options while maintaining the same core accessibility features and behavior.

**Variants:**
- **Icon Accordion (`accordion-icon`)**: Enhances accordion items with contextual icons for improved visual hierarchy and recognition.
- **Large Accordion (`accordion-lg`)**: Increases size, padding, and font size for more prominent sections or primary content.
- **Outlined Accordion (`accordion-outline`)**: Uses borders and separate containers for clearer visual separation and emphasis.

**Usage Example:**
```html
<!-- Icon Accordion -->
<div class="accordion accordion-icon max-w-md w-full bg-apex-container-bg rounded-lg shadow-lg divide-y divide-apex-accent/20">
  <div class="accordion-item">
    <button type="button" aria-expanded="false" aria-controls="icon-panel-1" id="icon-trigger-1" class="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-apex-accent focus:outline-none focus:ring-2 focus:ring-apex-accent transition">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <!-- SVG path data -->
        </svg>
        <span>Icon Accordion Item</span>
      </div>
      <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <!-- SVG path data -->
      </svg>
    </button>
    <div id="icon-panel-1" role="region" aria-labelledby="icon-trigger-1" class="max-h-0 overflow-hidden transition-all duration-300 bg-apex-bg px-4">
      <p class="py-3 text-apex-text">Content with the same accessibility and animation features.</p>
    </div>
  </div>
</div>
```

**Properties & Configuration:**
- All variants inherit core accordion functionality and accessibility
- Additional modifier classes can be combined for more complex variants (e.g., large icon accordion)
- Each variant maintains theme-awareness using theme variables

**Theme Responsiveness:**
- Day theme: Uses lighter backgrounds, subtle shadows, and blue accents
- Night theme: Uses darker backgrounds, stronger shadows, and brighter accents for contrast
- Maintains sufficient color contrast in both themes (WCAG AA compliant)

**Accessibility Features:**
- Preserves all base accordion accessibility attributes
- ARIA attributes (aria-expanded, aria-controls, role="region")
- Keyboard navigation with focus management
- Enhanced visual cues (icons, borders) provide additional context

**JavaScript Integration:**
- Uses the same JS toggle functionality as the base accordion
- Animation for panel expand/collapse
- Arrow rotation for visual feedback

**Original CSS Mapping:**
- `.accordion-item` → Mapped from original CSS `.collapsible-section`
- `.accordion-icon` → Mapped from original CSS `.collapsible-section--with-icon`
- `.accordion-lg` → Mapped from original CSS `.collapsible-section--large`
- `.accordion-outline` → Mapped from original CSS `.collapsible-section--bordered`

**Dependencies:**
- Core accordion component
- SVG icons (for icon variant)
- Theme system

**See Also:**
- [Base Accordion Component](#accordion-component)
- [Tabs Component](#tabs-component) - Alternative UI pattern for sectioned content

**Demo:**
Available in the [Style Guide](/src/style-guide.njk)

---

### Tabs Component

**Component Name:** Tabs  
**Last Updated:** 2025-03-28  
**Implementation Status:** ✅ Complete  

**Description:**  
The Tabs component provides a way to organize content into multiple sections that are displayed one at a time. The component features a horizontal navigation bar with tab buttons that, when clicked, display their corresponding content panels.

**Structure:**
```html
<div class="tabs-container bg-apex-container-bg rounded-lg shadow-lg p-2">
  <!-- Tab Navigation -->
  <div role="tablist" aria-label="Content tabs" class="tabs-nav flex border-b border-apex-accent/20">
    <button role="tab" aria-selected="true" aria-controls="tab-panel-1" id="tab-1" class="tab-button p-3 font-semibold text-apex-accent border-b-2 border-apex-accent">Tab 1</button>
    <button role="tab" aria-selected="false" aria-controls="tab-panel-2" id="tab-2" class="tab-button p-3 font-semibold text-apex-muted border-b-2 border-transparent">Tab 2</button>
    <button role="tab" aria-selected="false" aria-controls="tab-panel-3" id="tab-3" class="tab-button p-3 font-semibold text-apex-muted border-b-2 border-transparent">Tab 3</button>
  </div>
  
  <!-- Tab Panels -->
  <div class="tabs-content p-4">
    <div role="tabpanel" id="tab-panel-1" aria-labelledby="tab-1" class="tab-panel block">
      <p>Content for Tab 1. This panel is currently visible.</p>
    </div>
    <div role="tabpanel" id="tab-panel-2" aria-labelledby="tab-2" class="tab-panel hidden">
      <p>Content for Tab 2. This panel is currently hidden.</p>
    </div>
    <div role="tabpanel" id="tab-panel-3" aria-labelledby="tab-3" class="tab-panel hidden">
      <p>Content for Tab 3. This panel is currently hidden.</p>
    </div>
  </div>
</div>
```

**Usage Example:**
```html
{% include "components/tabs.njk" %}
```

**CSS Classes:**
- `tabs-container`: Main wrapper for the entire tabs component
- `tabs-nav`: Container for the tab buttons
- `tab-button`: Individual tab trigger buttons
- `tabs-content`: Container for all tab panels
- `tab-panel`: Individual content panel associated with each tab

**JavaScript Integration:**
```javascript
function initTabs() {
  document.querySelectorAll('.tabs-container').forEach(tabsContainer => {
    const tabs = tabsContainer.querySelectorAll('[role="tab"]');
    const panels = tabsContainer.querySelectorAll('[role="tabpanel"]');
    
    // Handle tab click
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deselect all tabs
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('text-apex-accent');
          t.classList.add('text-apex-muted');
          t.classList.remove('border-apex-accent');
          t.classList.add('border-transparent');
        });
        
        // Select clicked tab
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('text-apex-accent');
        tab.classList.remove('text-apex-muted');
        tab.classList.add('border-apex-accent');
        tab.classList.remove('border-transparent');
        
        // Hide all panels
        panels.forEach(panel => {
          panel.classList.add('hidden');
          panel.classList.remove('block');
        });
        
        // Show selected panel
        const panelId = tab.getAttribute('aria-controls');
        const panel = tabsContainer.querySelector(`#${panelId}`);
        panel.classList.remove('hidden');
        panel.classList.add('block');
      });
    });
    
    // Add keyboard navigation
    tabsContainer.addEventListener('keydown', e => {
      // Get the index of the current tab
      const selectedTab = tabsContainer.querySelector('[aria-selected="true"]');
      const tabArray = Array.from(tabs);
      const index = tabArray.indexOf(selectedTab);
      
      // Define keys and functions
      const keys = {
        ArrowLeft: index => (index === 0 ? tabArray.length - 1 : index - 1),
        ArrowRight: index => (index === tabArray.length - 1 ? 0 : index + 1),
        Home: () => 0,
        End: () => tabArray.length - 1
      };
      
      // Handle arrow keys, home, and end
      if (Object.keys(keys).includes(e.key)) {
        e.preventDefault();
        tabArray[keys[e.key](index)].click();
        tabArray[keys[e.key](index)].focus();
      }
    });
  });
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', initTabs);
```

**Variants:**
- **Standard Tabs**: Default implementation with horizontal tab navigation
- **Vertical Tabs**: Tabs arranged vertically for larger content sections
- **Icon Tabs**: Tabs with icons for improved visual recognition

**Theme Responsiveness:**
- Day theme: Light background with blue accent for selected tab
- Night theme: Dark background with bright blue accent for selected tab
- All states maintain proper color contrast in both themes

**Accessibility Features:**
- Proper ARIA roles: `tablist`, `tab`, `tabpanel`
- ARIA attributes: `aria-selected`, `aria-controls`, `aria-labelledby`
- Keyboard navigation:
  - Left/Right arrows: Navigate between tabs
  - Home/End: Jump to first/last tab
  - Tab key: Follow the document's tab sequence
- Focus management with visible focus indicators
- Accessible tab and panel relationships

**Original CSS Mapping:**
- `.tabs-container` → Mapped from original CSS `.tab-system`
- `.tabs-nav` → Mapped from original CSS `.tab-navigation`
- `.tab-button` → Mapped from original CSS `.tab-trigger`
- `.tabs-content` → Mapped from original CSS `.tab-panels`
- `.tab-panel` → Mapped from original CSS `.tab-panel`

**Dependencies:**
- Theme system for color variables
- JavaScript for tab switching and keyboard navigation

**See Also:**
- [Accordion Component](#accordion) - Alternative UI pattern for toggling content
- [Style Guide Implementation](/src/style-guide.njk#tabs-demo)

**Demo:**
Available in the [Style Guide](/src/style-guide.njk)

---

### Animated Button Variants

**Component Name:** Animated Button Variants  
**Last Updated:** 2025-03-29  
**Implementation Status:** ✅ Complete  

**Description:**  
Extended variants of the base Button component that incorporate various animations and effects to enhance visual feedback and user engagement while maintaining accessibility. These variants are designed to provide subtle motion cues that reinforce action importance without compromising usability.

**Structure:**
```html
<button type="button" class="btn btn-ripple bg-apex-accent hover:bg-apex-accent-hover text-white px-5 py-2.5 rounded-md font-medium transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-apex-accent-hover focus:ring-offset-2">
  <span class="relative z-10">Ripple Button</span>
</button>
```

**Variants:**
1. **Ripple Effect Button (`btn-ripple`)**: Creates a water-like ripple animation that starts from the click point and expands outward.
2. **Glow Pulse Button (`btn-glow`)**: Cycles a subtle glow effect around the button's borders on hover.
3. **Bubble Rise Button (`btn-bubble`)**: Displays small bubble particles that rise from the bottom of the button on hover/active states.
4. **Wave Button (`btn-wave`)**: Animates a gentle wave pattern along the button's bottom edge.
5. **Shimmer Button (`btn-shimmer`)**: Creates a light-to-dark gradient shift that moves across the button.

**CSS Implementation:**
```css
/* Base for all animated buttons */
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Ripple effect specific styles */
.btn-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.btn-ripple:focus::after,
.btn-ripple:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

/* Other variant animations defined similarly */
```

**JavaScript Integration:**
```javascript
// Example for the ripple effect button
function initRippleButtons() {
  document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

document.addEventListener('DOMContentLoaded', initRippleButtons);
```

**Usage Example:**
```html
<!-- Ripple Effect Button -->
<button type="button" class="btn btn-ripple bg-apex-accent hover:bg-apex-accent-hover text-white px-5 py-2.5 rounded-md font-medium transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-apex-accent-hover focus:ring-offset-2">
  <span class="relative z-10">Ripple Button</span>
</button>

<!-- Glow Pulse Button -->
<button type="button" class="btn btn-glow bg-apex-primary hover:bg-apex-primary-hover text-white px-5 py-2.5 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apex-primary-hover focus:ring-offset-2">
  Glow Button
</button>

<!-- Call with shortcode -->
{% include "components/buttons/ripple-button.njk" with {
  text: "Custom Ripple Button",
  classes: "w-full mt-3"
} %}
```

**Theme Responsiveness:**
- Day theme: Subtle animations with lighter color palette and softer shadows
- Night theme: More prominent glow effects with darker background colors and brighter accent colors
- Animation opacity adjusted by theme to maintain appropriate contrast and visibility

**Accessibility Features:**
- All animation effects are purely cosmetic and don't impact functionality
- Reduced motion media query support to disable animations for users with vestibular disorders
- Alternative visual feedback (color change, border emphasis) when animations are disabled
- Maintains all base button accessibility features including:
  - Focus states with visible indicators
  - Keyboard navigation
  - ARIA attributes when needed (e.g., for loading states)

**Performance Considerations:**
- Animations optimized to use CSS `transform` and `opacity` properties for GPU acceleration
- JavaScript-based effects use efficient event delegation
- Animations have short durations (300-600ms) to avoid feeling sluggish
- CSS contains fallbacks for browsers that don't support certain animation properties

**Original CSS Mapping:**
- `.btn-ripple` → Mapped from original CSS `.button--water-effect`
- `.btn-glow` → Mapped from original CSS `.button--pulse`
- `.btn-bubble` → Mapped from original CSS `.button--bubble-rise`
- `.btn-wave` → Mapped from original CSS `.button--wave`
- `.btn-shimmer` → Mapped from original CSS `.button--light-streak`

**Dependencies:**
- Core button component styles
- Theme system for color variables
- Optional JavaScript for advanced effects (ripple positioning)

**See Also:**
- [Base Button Component](#button-component)
- [Call-to-Action Component](#call-to-action-component)
- [Animation Utilities](#animation-utilities)

**Demo:**
Available in the [Style Guide](/src/style-guide.njk#animated-buttons)

---

### Card Variants

**Purpose:** Glass-morphic cards and feature lists with theme-aware backgrounds, shadows, and custom bullets.

**Structure:**
```html
<div class="content-container bg-apex-container-bg rounded-lg shadow-lg p-6">
  <h4>Card Title</h4>
  <p>Card content</p>
</div>
<ul class="feature-list">
  <li><span class="feature-bullet"></span>Feature text</li>
</ul>
```

**Theme Responsiveness:** Adapts to day/night mode using theme classes.

**Accessibility:** Semantic structure, color contrast, keyboard navigation.

**Relationships:** Used in project/journal cards, layout demos.

**Implementation Notes:** See style guide demo.

---

### Project Card Component

**Purpose:** Modular card for project lists/grids, with title, description, tags, and CTA.

**Structure:**
```html
<div class="project-card content-container ...">
  <h4>Project Title</h4>
  <p>Description</p>
  <span>Tag</span>
  <button>View Project</button>
</div>
```

**Theme Responsiveness:** Adapts to theme, tags and button styled accordingly.

**Accessibility:** Focus ring, semantic structure, keyboard navigation.

**Relationships:** Used in project lists, layout demos.

**Implementation Notes:** See style guide demo.

---

### Journal/Blog Card Component

**Purpose:** Card for journal/blog post lists, with title, excerpt, date, tags, and read more link.

**Structure:**
```html
<div class="journal-card content-container ...">
  <span>Date</span>
  <span>Tag</span>
  <h4>Post Title</h4>
  <p>Excerpt</p>
  <a>Read More</a>
</div>
```

**Theme Responsiveness:** Adapts to theme, tags and link styled accordingly.

**Accessibility:** Focus ring, semantic structure, keyboard navigation.

**Relationships:** Used in journal/blog lists, layout demos.

**Implementation Notes:** See style guide demo.

---

### Layout Components

**Purpose:** 1/2/3-column and grid layouts for modular, responsive page structure.

**Structure:**
```html
<div class="grid grid-cols-1 md:grid-cols-3 ...">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Theme Responsiveness:** All layouts adapt to theme using utility classes.

**Accessibility:** Semantic structure, keyboard navigation, color contrast.

**Relationships:** Used as base for all page/component layouts.

**Implementation Notes:** See style guide demo.

---

### Footer Bar Component

**Purpose:** Modular footer for all pages, with copyright, links, and theme-aware styling.

**Structure:**
```html
<footer class="footer-bar ...">
  <span>&copy; 2025 Blue Marlin OS</span>
  <nav>
    <a>Home</a>
    <a>Projects</a>
    <a>Contact</a>
  </nav>
</footer>
```

**Theme Responsiveness:** Footer background and links adapt to theme.

**Accessibility:** Semantic <footer> and <nav>, focus rings, color contrast.

**Relationships:** Used on all pages and in layout demos.

**Implementation Notes:** See style guide demo.

---

### Tooltip Component & Variants

**Status:** Complete

**Component Structure & Purpose:**
- A contextual information tooltip that appears on hover/focus
- Available in standard, large, top-positioned, and error variants
- Used for providing tips, error messages, and additional context

**Usage Example:**
```html
<!-- Standard Tooltip -->
<div class="relative inline-block group">
  <button aria-describedby="tooltip-id">Hover me</button>
  <div id="tooltip-id" role="tooltip" class="tooltip-content">Tooltip text</div>
</div>

<!-- Error Tooltip -->
<div class="relative inline-block group">
  <button aria-describedby="tooltip-error">Error Tooltip</button>
  <div id="tooltip-error" role="tooltip" class="tooltip-content bg-red-700 text-white">Error message</div>
</div>
```

**Theme Responsiveness:** All tooltip variants adapt to day/night mode, with background and text colors changing appropriately.

**Accessibility:** 
- Uses `aria-describedby` to associate tooltip with trigger element
- `role="tooltip"` for proper semantics
- Keyboard focus support ensures accessibility for all users
- Visible on both hover and keyboard focus

**Implementation Notes:**
- Animation via `transition-opacity` for smooth appearance/disappearance
- Positioned with absolute placement and transforms for proper alignment
- Arrow indicators created with rotated divs for visual context

**Migration Traceability:**

| Original Implementation | Migrated Implementation | Status |
|-------------------------|-------------------------|--------|
| Tooltip (legacy HTML/CSS) | Tooltip Component (style guide) | Complete |
| Tooltip error state (styles.css) | Error Tooltip Variant (style guide) | Complete |
| Tooltip positioning (styles.css) | Top Tooltip Variant (style guide) | Complete |
| Tooltip sizing (styles.css) | Large Tooltip Variant (style guide) | Complete |

---

## Migration Traceability

### UI Components

| Original Implementation | Migrated Implementation | Status |
|-------------------------|-------------------------|--------|
| Navigation bar (legacy HTML/CSS) | Navigation Component (style guide) | In Progress |
| Card (legacy HTML/CSS) | Card Component (style guide) | In Progress |
| Feature list (legacy HTML/CSS) | Feature List Component (style guide) | In Progress |
| Call-to-action link (legacy HTML/CSS) | Call-to-Action Link Component (style guide) | In Progress |
| Tooltip (legacy HTML/CSS) | Tooltip Component (style guide) | Complete |
| Accordion (legacy HTML/CSS) | Accordion Component (style guide) | In Progress |
| *To be populated* | *To be populated* | *Not Started* |

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

**Status:** Complete and approved. Next step: UI component variants and advanced demos.

The landing page template is the main entry point for the website and features the underwater environment, theme toggle, and project showcases with animations. It incorporates all available migrated components.

**Implementation Notes:**
- Uses the `underwaterEnvironment` and `themeToggle` shortcodes (implemented in `.eleventy.js`)
- Showcases particle effects and light shaft animations
- Will serve as primary validation for stakeholder approval

## Visual Effects & Theme System

**Validation:** Visual validation of the landing page prototype and all core theme/effects components is complete and approved. Proceeding to next migration steps.

## Build System

*This section documents the build system configuration and processes.*

### 11ty Configuration

**Status:** ✅ IMPLEMENTED

The following shortcodes have been implemented in `.eleventy.js`:

1. **themeToggle Shortcode**
   - **Purpose:** Generates the HTML for the theme toggle button that switches between night and day modes
   - **Usage:** `{% themeToggle %}`
   - **Implementation:** Renders a button with appropriate ARIA labels and a toggle knob with moon/sun icon
   - **Status:** ✅ Implemented in `.eleventy.js`

2. **underwaterEnvironment Shortcode**
   - **Purpose:** Renders the container elements for light shafts and particle system effects
   - **Usage:** `{% underwaterEnvironment %}`
   - **Implementation:** Creates div structure for light-shafts and particles with proper CSS hooks
   - **Status:** ✅ Implemented in `.eleventy.js`
   - **Additional Notes:** Also includes individual shortcodes for `lightShafts` and `particles`

These shortcodes provide the foundation for implementing the visual effects across all templates.

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

### Legacy CSS Mapping: styles.css → Modular Structure

The following table maps major sections and features from the original `styles.css` (legacy, REFERENCE ONLY) to their new locations in the modular Tailwind/11ty structure. This supports traceability and ensures all styles are migrated or replaced with Tailwind utilities and custom modules.

| Section/Feature in styles.css         | New Module/Location                        | Notes/Status                                 |
|---------------------------------------|--------------------------------------------|----------------------------------------------|
| Reset & Base Styles                   | `src/styles/base/reset.css`                | Fully migrated and annotated                 |
| Color Themes & Variables              | `tailwind.config.js` + `main.css`          | Theme variables now in Tailwind config/root  |
| Typography Foundation                 | `main.css` + Tailwind utilities            | Migrated, uses Tailwind typography           |
| Underwater Environment Effects        | `src/styles/animations/effects.css`          | Migrated, uses Tailwind utilities            |
| Theme Toggle Component                | `src/_includes/components/theme-toggle.njk` | Migrated, uses Tailwind utilities            |
| Particle System                       | `src/styles/components/particles.css`        | Migrated, uses Tailwind utilities            |
| Light Shaft Effect                    | `src/styles/animations/light-shafts.css`      | Migrated, uses Tailwind utilities            |
| Water Ripple Effect                   | `src/styles/animations/ripple.css`            | Migrated, uses Tailwind utilities            |
| Content Transitions                   | `src/styles/animations/content-transitions.css`| Migrated, uses Tailwind utilities            |
| Theme System                         | `tailwind.config.js` + `src/styles/themes/` | Migrated, uses Tailwind utilities            |
| Card Component                       | `src/styles/components/card.css`              | Migrated, uses Tailwind utilities            |
| Feature List Component               | `src/styles/components/feature-list.css`      | Migrated, uses Tailwind utilities            |
| Call-to-Action Link Component        | `src/styles/components/call-to-action.css`     | Migrated, uses Tailwind utilities            |
| Tooltip Component                    | `src/styles/components/tooltip.css`             | Migrated, uses Tailwind utilities            |
| Accordion Component                  | `src/styles/components/accordion.css`            | Migrated, uses Tailwind utilities            |
| *To be populated*                     | *To be populated*                             | *Not Started*                              |