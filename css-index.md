# BLUE MARLIN OS - CSS Index

This document provides a comprehensive index of all the CSS styling elements used in the Blue Marlin OS project. The styles create a dual-theme underwater-inspired interface with responsive design and subtle animations.

## Table of Contents

1. [Core Styles](#core-styles)
2. [Theming System](#theming-system)
3. [Layout Components](#layout-components)
4. [UI Components](#ui-components)
5. [Underwater Effects](#underwater-effects)
6. [Form Elements](#form-elements)
7. [Animation & Effects](#animation--effects)
8. [Responsive Design](#responsive-design)
9. [Accessibility Features](#accessibility-features)

---

## Core Styles

### Reset & Base Styles
- **Selector**: `*, *::before, *::after`
- **Lines**: 16-20
- **Purpose**: Removes browser defaults, standardizes box-sizing model

### Typography Foundation
- **Selector**: `html`, `body`, headings, links, code
- **Lines**: 70-106
- **Purpose**: Sets base font size/family, establishes hierarchies

### Base Element Styling
- **Font Families**: 'Space Grotesk', 'Instrument Serif', 'Special Gothic Expanded One'
- **Base Font Size**: `clamp(16px, 4vw, 24px)`
- **Line Height**: 1.6 (body), 1.2 (headings)
- **Link Styling**: Inherits surrounding text color, no underlines

---

## Theming System

### Color Variables
- **Lines**: 28-64
- **Night Theme (phase-apex)**:
  - `--apex-bg`: #050c14 (Deep blue-black background)
  - `--apex-text`: #e6edf5 (Off-white text)
  - `--apex-accent`: #0084ff (Vibrant blue accent)
  - `--apex-accent-rgb`: 0, 132, 255
  - `--apex-water`, `--apex-shafts`, `--apex-card-bg`, `--apex-container-bg`, `--apex-header-bg`, `--apex-muted`
  
- **Day Theme (phase-origin)**:
  - `--origin-bg`: #fdfcfb (Light cream background)
  - `--origin-text`: #0e0e0e (Near-black text)
  - `--origin-accent`: #ff4400 (Vibrant orange accent)
  - `--origin-accent-rgb`: 255, 68, 0
  - `--origin-water`, `--origin-shafts`, `--origin-card-bg`, `--origin-container-bg`, `--origin-header-bg`, `--origin-muted`

- **Form Colors**:
  - `--color-success`: #00c853
  - `--color-danger`: #ff3d00
  - `--color-primary`: (inherits from accent color)

### Theme Application
- **Night Theme**: Default applied to `body`
- **Day Theme**: Applied with class `.phase-origin` on `html` element
- **Theme Toggle**: `.theme-toggle` class with responsive knob position

---

## Layout Components

### Content Container
- **Selector**: `.content-container`
- **Lines**: 359-370
- **Features**: Glass-morphic effect with backdrop blur, consistent spacing, border-radius
- **Properties**: Relative positioning, z-index: 10, margin, padding, background-color

### Header
- **Selector**: `.header`, `.header-top`
- **Lines**: 198-226
- **Features**: Sticky positioning, glass-morphism effect with blur(8px)
- **Sub-elements**: `.logo`, `.header-controls`

### Navigation
- **Desktop Nav**: `.nav`, `.nav-links`
- **Lines**: 278-307
- **Mobile Nav**: `.mobile-nav`
- **Lines**: 309-329
- **Mobile/Desktop Toggle**: Media query at 768px

### Grid Layouts
- **Project Grid**: `.project-grid` (1fr on mobile, 1fr 1fr on desktop)
- **Journal Grid**: `.journal-grid` (1fr on mobile, 1fr 1fr on desktop)
- **Journal Layout**: `.journal-layout` (1fr on mobile, 2fr 1fr on desktop at 960px)

### Footer
- **Selector**: `.footer-bar`
- **Lines**: 1591-1602
- **Features**: Fixed height, glass-morphism effect

---

## UI Components

### Project Cards
- **Selector**: `.project-image`, `.project-status`, `.project-id`, `.project-content`
- **Lines**: 386-434
- **Features**: Card-based display with status indicators, decorative elements

### Journal/Blog Cards
- **Selector**: `.journal-card`, `.journal-date`
- **Lines**: 490-529
- **Features**: Card design with hover effects, date display, excerpt truncation

### Feature Lists
- **Selector**: `.feature-list`, `.feature-item`, `.feature-bullet`
- **Lines**: 438-460
- **Features**: Custom bullet points using accent color

### Blog Elements
- **Headers**: `.blog-header`, `.blog-meta`, `.blog-title`
- **Content**: `.blog-content` (with child elements)
- **Sidebar**: `.blog-sidebar`, `.entry-list`, `.entry-list-item`
- **Navigation**: `.post-navigation`, `.post-nav-link`, `.post-nav-label`

### Hero Section
- **Selector**: `.hero`
- **Lines**: 374-384
- **Features**: Main welcome area with large heading and accent colors

### Call to Action Links
- **Selector**: `.read-more`
- **Lines**: 464-489
- **Features**: Links with arrow indicators, animated hover effects

---

## Underwater Effects

### Environment Container
- **Selector**: `.underwater-environment`
- **Lines**: 111-120
- **Features**: Fixed positioning for parallax-like effect, z-index: 0

### Light Shafts
- **Selector**: `.light-shafts`, `.light-shaft`
- **Lines**: 122-174
- **Features**: Positioned absolutely, gradient backgrounds, blur filters
- **Animation**: Each shaft uses dedicated animation keyframes

### Floating Particles
- **Selector**: `.particles`, `.particle`
- **Lines**: 176-195
- **Features**: White particles with blue glow, positioned randomly via JS
- **Animation**: `drift` keyframe animation for floating effect

### Water Ripple Effect
- **Selector**: `.water-ripple`
- **Lines**: 1555-1568
- **Features**: Cursor-following effect, radial gradient background
- **Animation**: `rippleEffect` keyframe when activated

---

## Form Elements

### Form Layout
- **Basic Form**: `.form-group`, `.form-label`
- **Lines**: 1573-1589
- **Inline Forms**: `.form-inline`
- **Lines**: 1783-1799

### Input Types
- **Text/Textarea**: `.form-input`, `.form-textarea`
- **Select**: `.form-select` (with custom dropdown arrow)
- **Checkboxes/Radio**: `.form-check`, `.form-check-input`
- **Range**: `.form-range` (with custom thumb and track)

### Validation States
- **Valid States**: `.is-valid` (green indicators)
- **Invalid States**: `.is-invalid` (red indicators)
- **Feedback**: `.form-feedback.valid`, `.form-feedback.invalid`

---

## Animation & Effects

### Keyframe Animations
- **Light Shaft Movements**: `shaftMove1`, `shaftMove2`, `shaftMove3`, `shaftMove4`
- **Lines**: 1470-1532
- **Light Shaft Glow**: `shaftGlow`
- **Lines**: 1539-1549
- **Particle Drift**: `drift`
- **Lines**: 1585-1608
- **Content Entrance**: `floatIn` (opacity + translateY)
- **Status Indicator**: `pulse`

### Transitions
- **Theme Toggle**: Knob sliding animation with 0.3s transition
- **Hover Effects**: 
  - Card scale: `transform: scale(1.02)` on hover
  - Text colors: `transition: color 0.2s`
  - Read-more arrow: `transform: translateX(5px)` on hover

---

## Responsive Design

### Breakpoints
- **Primary**: 768px (mobile to desktop transition)
- **Secondary**: 960px (for journal sidebar layout)
- **Additional**: 900px, 1100px (for project grid refinements)

### Mobile-First Approach
- **Default**: Single column layouts, bottom fixed navigation
- **Desktop**: Multi-column layouts, top navigation, increased spacing

### Media Queries
- **Desktop Navigation**: Show/hide based on breakpoint 
- **Column Layouts**: Change from 1 to 2+ columns at breakpoints
- **Typography**: Adjust sizes with clamp() or at breakpoints

---

## Accessibility Features

### Reduced Motion
- **Selector**: `@media (prefers-reduced-motion)`
- **Lines**: 1551-1554
- **Features**: Disables all animations and transitions when user prefers reduced motion

### Focus States
- All interactive elements have visible focus states
- Form elements use outlines and box-shadows for focus indication

### Color Contrast
- Text colors maintain sufficient contrast ratios with backgrounds in both themes
- Accent colors used sparingly and with proper contrast
