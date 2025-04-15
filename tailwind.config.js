/**
 * Blue Marlin OS - Tailwind CSS Configuration
 * 
 * This configuration extends Tailwind with custom colors, animations, and plugins
 * specifically designed to preserve the underwater visual effects and theme system.
 *
 * ---
 * ANNOTATION: This file is the central configuration for all theme and animation
 * utilities in Blue Marlin OS. It defines custom color palettes for both day (origin)
 * and night (apex) themes, and registers all keyframes and animation utilities
 * required for underwater effects, content transitions, and theme toggling.
 *
 * The custom plugin at the bottom injects component classes for underwater effects
 * (light shafts, particles, ripples, etc.) and ensures theme-specific variations
 * are handled via the `.phase-origin` class on <html>.
 *
 * Accessibility: All animations are compatible with `prefers-reduced-motion` via
 * Tailwind's variants and media queries in CSS/JS.
 *
 * For a full reference of animation parameters and theme variables, see
 * docs/migration_index.md (Animation Reference Sheet).
 */

module.exports = {
  content: [
    './src/**/*.{html,js,njk,md}',
    './.eleventy.js',
  ],
  theme: {
    extend: {
      colors: {
        // --- Night Mode (phase-apex) Colors ---
        // These variables define the default (night/deep sea) theme colors and are used
        // when <html> does NOT have the .phase-origin class. All underwater effects and
        // UI elements use these by default.
        apex: {
          bg: '#0a0e17',          // Deep blue-black background for night mode
          'container-bg': 'rgba(14, 22, 39, 0.7)', // Semi-transparent container background
          'header-bg': 'rgba(10, 17, 33, 0.8)',     // Semi-transparent header background
          text: '#e1e8f5',         // Light blue-white text for night mode
          accent: '#3e8ede',       // Bright blue accent for links, buttons, highlights
          muted: '#768aa8',        // Muted blue for secondary text
          'accent-rgb': '62, 142, 222', // RGB values for use in gradients/animations
          shafts: 'rgba(62, 142, 222, 0.15)' // Light shaft color for underwater effect
        },
        // --- Day Mode (phase-origin) Colors ---
        // These variables are used when <html> has the .phase-origin class, switching
        // the UI to a warm, sunlit theme. All color values are matched to the design spec.
        origin: {
          bg: '#faf5f0',          // Cream background for day mode
          'container-bg': 'rgba(250, 245, 240, 0.7)', // Semi-transparent container background
          'header-bg': 'rgba(250, 245, 240, 0.8)',     // Semi-transparent header background
          text: '#2a2724',         // Dark brown text for day mode
          accent: '#f27405',       // Orange accent for links, buttons, highlights
          muted: '#a3917c',        // Muted sand for secondary text
          'accent-rgb': '242, 116, 5', // RGB values for use in gradients/animations
          shafts: 'rgba(242, 116, 5, 0.05)' // Light shaft color for underwater effect (day)
        }
      },
      animation: {
        // --- Light Shaft Animations ---
        // Each shaft uses a unique keyframe and duration for natural movement
        'shaft-sway-1': 'lightShaftSway1 9s ease-in-out infinite',
        'shaft-sway-2': 'lightShaftSway2 11s ease-in-out infinite',
        'shaft-sway-3': 'lightShaftSway3 10s ease-in-out infinite',
        'shaft-sway-4': 'lightShaftSway4 12s ease-in-out infinite',
        'shaft-glow': 'shaftGlow 15s ease-in-out infinite',
        
        // --- Particle Animation ---
        // Base animation for particles; duration/delay randomized in JS
        'drift': 'drift 20s linear infinite',
        
        // --- Content Animations ---
        'float-in': 'floatIn 0.8s ease-out',
        
        // --- Button/Element Animations ---
        'pulse-glow-apex': 'pulseGlowApex 3s ease-in-out infinite',
        'pulse-glow-origin': 'pulseGlow 3s ease-in-out infinite',
        'pulse': 'pulse 2s infinite',
        
        // --- Ripple Animation ---
        'ripple-effect': 'rippleEffect 2.5s ease-out forwards'
      },
      keyframes: {
        // --- Light Shaft Keyframes ---
        // Each keyframe animates transform for a unique swaying effect
        lightShaftSway1: {
          '0%, 100%': { 
            transform: 'translateX(0) rotate(-4deg) scaleX(1)' 
          },
          '33%': { 
            transform: 'translateX(-20px) rotate(-4.5deg) scaleX(0.95)' 
          },
          '66%': { 
            transform: 'translateX(20px) rotate(-3.5deg) scaleX(1.05)' 
          }
        },
        lightShaftSway2: {
          '0%, 100%': { 
            transform: 'translateX(0) rotate(-5.5deg) scaleX(1)' 
          },
          '33%': { 
            transform: 'translateX(25px) rotate(-5deg) scaleX(1.05)' 
          },
          '66%': { 
            transform: 'translateX(-25px) rotate(-6deg) scaleX(0.95)' 
          }
        },
        lightShaftSway3: {
          '0%, 100%': { 
            transform: 'translateX(0) rotate(-3deg) scaleX(1)' 
          },
          '33%': { 
            transform: 'translateX(-15px) rotate(-3.5deg) scaleX(0.9)' 
          },
          '66%': { 
            transform: 'translateX(15px) rotate(-2.5deg) scaleX(1.1)' 
          }
        },
        lightShaftSway4: {
          '0%, 100%': { 
            transform: 'translateX(0) rotate(-6deg) scaleX(1)' 
          },
          '33%': { 
            transform: 'translateX(-20px) rotate(-6.5deg) scaleX(0.95)' 
          },
          '66%': { 
            transform: 'translateX(20px) rotate(-5.5deg) scaleX(1.05)' 
          }
        },
        shaftGlow: {
          '0%, 100%': { 
            opacity: '0.4',
            filter: 'blur(20px)'
          },
          '50%': { 
            opacity: '0.7',
            filter: 'blur(15px)'
          }
        },
        
        // --- Particle Animation Keyframes ---
        drift: {
          '0%': {
            transform: 'translateY(50px) translateX(0px)',
            opacity: '0'
          },
          '10%': {
            opacity: '0.6'
          },
          '20%': {
            transform: 'translateY(-20px) translateX(-5px)'
          },
          '40%': {
            transform: 'translateY(-40px) translateX(3px)'
          },
          '60%': {
            transform: 'translateY(-60px) translateX(-2px)'
          },
          '80%': {
            transform: 'translateY(-80px) translateX(4px)'
          },
          '90%': {
            opacity: '0.6'
          },
          '100%': {
            transform: 'translateY(-150px) translateX(0px)',
            opacity: '0'
          }
        },
        
        // --- Content Entrance Animation ---
        floatIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        
        // --- Button Glow Animations ---
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 8px rgba(var(--origin-accent-rgb), 0.4), inset 0 0 3px rgba(255,255,255,0.2)'
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(var(--origin-accent-rgb), 0.8), inset 0 0 8px rgba(255,255,255,0.4)'
          }
        },
        pulseGlowApex: {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(var(--apex-accent-rgb), 0.4), inset 0 0 4px rgba(255,255,255,0.1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(var(--apex-accent-rgb), 0.9), inset 0 0 10px rgba(255,255,255,0.2)'
          }
        },
        
        // --- Status Indicator Animation ---
        pulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        },
        
        // --- Water Ripple Animation ---
        rippleEffect: {
          '0%': {
            width: '0',
            height: '0',
            opacity: '0.6'
          },
          '100%': {
            width: '400px',
            height: '400px',
            opacity: '0.4'
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px'
      },
      transitionDuration: {
        DEFAULT: '200ms',
        '300': '300ms',
        '500': '500ms',
        '800': '800ms',
        '2000': '2000ms',
        '2500': '2500ms'
      }
    }
  },
  plugins: [
    // --- Custom Underwater Effect Plugin ---
    // This plugin injects component classes for all underwater effects and ensures
    // theme-specific variations are handled via the .phase-origin class on <html>.
    // All classes are documented for maintainability and AI reference.
    function({ addComponents, theme }) {
      const components = {
        // --- Light Shaft Component ---
        // Container for all light shafts
        '.light-shafts': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: '0',
          overflow: 'hidden'
        },
        // Individual light shaft, animated via keyframes
        '.light-shaft': {
          position: 'absolute',
          top: '-10%',
          height: '120%',
          width: '30px',
          background: `linear-gradient(to bottom, ${theme('colors.apex.shafts')}, transparent)`,
          transformOrigin: 'top center',
          '--min-opacity': '0.05',
          '--max-opacity': '0.15',
          animation: theme('animation.shaft-sway-1'),
          willChange: 'transform, opacity'
        },
        // Each shaft gets unique position, width, and animation
        '.light-shaft:nth-child(1)': {
          left: '15%',
          width: '25px',
          animationDelay: '-2s',
          animation: theme('animation.shaft-sway-1')
        },
        '.light-shaft:nth-child(2)': {
          left: '30%',
          width: '40px',
          animationDelay: '-1s',
          animation: theme('animation.shaft-sway-2')
        },
        '.light-shaft:nth-child(3)': {
          left: '60%',
          width: '20px',
          animationDelay: '-4s',
          animation: theme('animation.shaft-sway-3')
        },
        '.light-shaft:nth-child(4)': {
          left: '80%',
          width: '35px',
          animationDelay: '-3s',
          animation: theme('animation.shaft-sway-4')
        },
        // Theme variation for day mode (phase-origin)
        'html.phase-origin .light-shaft': {
          '--min-opacity': '0',
          '--max-opacity': '0.05',
          background: `linear-gradient(to bottom, ${theme('colors.origin.shafts')}, transparent)`
        },
        
        // --- Particle System Components ---
        // Container for all particles
        '.particles': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: '1'
        },
        // Individual particle, styled and animated
        '.particle': {
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: '50%',
          opacity: '0.7',
          boxShadow: '0 0 8px rgba(0, 132, 255, 0.8)',
          transition: 'box-shadow 1s',
          animation: theme('animation.drift')
        },
        // Theme variation for day mode (no glow)
        'html.phase-origin .particle': {
          boxShadow: 'none'
        },
        
        // --- Water Ripple Effect ---
        // Ripple element, animated on mouse movement
        '.water-ripple': {
          position: 'absolute',
          pointerEvents: 'none',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 76, 158, 0.08) 0%, rgba(10, 76, 158, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: '5',
          opacity: '0'
        },
        // Theme variation for day mode (lighter blue)
        'html.phase-origin .water-ripple': {
          background: 'radial-gradient(circle, rgba(74, 143, 231, 0.08) 0%, rgba(74, 143, 231, 0) 70%)'
        },
        
        // --- Content Container with Animation ---
        // Glass-morphic content container with entrance animation
        '.content-container': {
          position: 'relative',
          zIndex: '10',
          margin: '1rem',
          padding: '1.5rem',
          backgroundColor: theme('colors.apex.container-bg'),
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0.5rem',
          animation: theme('animation.float-in'),
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        },
        // Theme variation for day mode
        'html.phase-origin .content-container': {
          backgroundColor: theme('colors.origin.container-bg'),
          border: '1px solid rgba(14, 14, 14, 0.1)'
        }
      };
      
      addComponents(components);
    }
  ],
  // --- Accessibility: Motion Reduction Variants ---
  // Ensures all animations can be disabled or reduced for users who prefer reduced motion
  variants: {
    extend: {
      animation: ['motion-safe', 'motion-reduce']
    }
  }
}; 