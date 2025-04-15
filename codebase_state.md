# Workflow State & Rules (STM + Rules + Log)

*This file contains the dynamic state, embedded rules, active plan, and log for the current session.*
*It is read and updated frequently by the AI during its operational loop.*

---

## State

*Holds the current status of the workflow.*

```yaml
Phase: CONSTRUCT # Current workflow phase (ANALYZE, BLUEPRINT, CONSTRUCT, VALIDATE, BLUEPRINT_REVISE)
Status: IN_PROGRESS # Current status (READY, IN_PROGRESS, BLOCKED_*, NEEDS_*, COMPLETED)
CurrentTaskID: TailwindMigration # Identifier for the main task being worked on
CurrentStep: Step2_ProjectStructure # Updated to next actionable step
RetryCount: 0 # Current retry count for error handling
ModelPerspective: standard # Current model perspective (standard, creative, technical, etc.)
MigrationIndexUpdated: true # Whether the migration index.md has been updated with recent changes
ReferenceFilesLabeled: true # All reference files, including styles.css, are now labeled
```

---

## Plan

*Contains the step-by-step implementation plan generated during the BLUEPRINT phase.*

### Tailwind & 11ty Migration Plan for Blue Marlin OS

[x] **Step 1: Visual Effects & Theme System Migration [Complexity: 5/5]**
   - [x] Document & benchmark existing animations
     - [x] Measure exact timing, easing, and properties of all effects
     - [x] Document theme-specific animation behaviors
     - [x] Establish performance benchmarks on multiple devices (deferred: to be completed after implementation)
     - [x] Create reference sheets for all animation parameters
     - [x] Build animation timing diagrams for complex sequences (deferred: to be completed after implementation)
   - [x] Create custom Tailwind animation plugin
     - [x] Implement light shaft animations with exact same properties
     - [x] Recreate particle system with identical movement patterns
     - [x] Develop water ripple effect with precise behavior
     - [x] Preserve all transition and hover animations
     - [x] Add detailed annotations for all animation code
   - [x] Implement dual theme system
     - [x] Configure theme toggle with exact animation behavior
     - [x] Ensure all color values match precisely in both themes
     - [x] Verify theme-specific animations work correctly
     - [x] Document all theme variables with purpose annotations
     - [x] Develop theme transition management system
   - [ ] Validate visual fidelity (to be performed once first pages are ready)
     - [ ] Perform side-by-side visual comparison testing
     - [ ] Verify animations on multiple devices and browsers
     - [ ] Ensure reduced-motion accommodations work correctly
     - [ ] Test integration with other UI components
     - [ ] Verify performance matches or exceeds original implementation
   - [x] Create migration index entry
     - [x] Document all animation components with code references
     - [x] Create visual effects reference guide with implementation details
     - [x] Link to original vs. migrated animation code for comparison
     - [x] See 'Dual Theme System Migration Status' in migration_index.md for summary of theme system implementation and status.
     - [x] Label all legacy and reference files (home.html, journal.html, blog.html, style-guide.html, styles.css) as REFERENCE ONLY in all documentation

// Note: Performance benchmarking, animation timing diagrams, and visual validation are deferred until after first pages are implemented, per user instruction.


[ ] **Quality Validation: Visual Effects & Theme System [Complexity: 4/5]**
   - [ ] Run visual comparison tests against original implementation
   - [ ] Verify all animations match original timing and behavior
   - [ ] Test theme toggle animation for accuracy
   - [ ] Validate performance against established benchmarks
   - [ ] Document validation results with screenshots/recordings
   - [ ] Verify all code is thoroughly annotated with explanatory comments
   - [ ] Test on low-end devices for performance comparison
   - [ ] Verify accessibility with screen readers and reduced motion settings
   - [ ] **CRITICAL BLOCKER:** All visual effects must pass validation before proceeding

[ ] **Step 2: Project Structure & CSS Organization [Complexity: 4/5]**
   - [ ] Set up 11ty project framework
     - [ ] Initialize npm project with required dependencies
     - [ ] Configure 11ty with Nunjucks templating
     - [ ] Set up development server with BrowserSync
     - [ ] Create folder structure for templates, layouts and includes
   - [ ] Create Tailwind configuration
     - [ ] Define custom color scheme with exact theme values
     - [ ] Configure font families and typography scale
     - [ ] Set up responsive breakpoints for 1/2/3 column layouts
     - [ ] Configure spacing and sizing system
     - [ ] Add detailed annotations for all Tailwind configuration options
   - [ ] Organize CSS into modular structure
     - [ ] Create base styles file (reset, variables, typography)
     - [ ] Develop component-specific style files (cards, navigation, buttons)
     - [ ] Build layout-specific style files (grid systems, containers)
     - [ ] Create theme-specific style files (day/night mode variables and overrides)
     - [ ] Set up animation/effects style files (particles, light shafts, ripples)
     - [ ] Add comprehensive annotations for each CSS module explaining purpose and usage
   - [ ] Establish build pipeline
     - [ ] Set up PostCSS for Tailwind processing
     - [ ] Configure asset optimization for images and scripts
     - [ ] Create GitHub Actions workflow for automated deployment
     - [ ] Set up environment variables for development/production
   - [ ] Create migration index entry
     - [ ] Document complete folder structure with purpose annotations
     - [ ] Create CSS module reference with file roles and dependencies
     - [ ] Map original CSS to new modular structure for traceability

[ ] **Quality Validation: Project Structure & CSS Organization [Complexity: 3/5]**
   - [ ] Verify 11ty configuration with test builds
   - [ ] Validate Tailwind setup with test components
   - [ ] Test CSS modularization with hot reloading
   - [ ] Verify build pipeline with sample outputs
   - [ ] Review CSS organization for maintainability
   - [ ] Ensure all CSS files adhere to defined standards
   - [ ] Verify thorough annotation of all CSS files and configuration
   - [ ] **BLOCKER:** Project structure must pass validation before proceeding

[ ] **Step 3: UI Component System & Approval [Complexity: 5/5]**
   - [ ] Build UI component style guide for approval
     - [ ] Rebuild style-guide.html using Tailwind and 11ty
     - [ ] Implement all components with exact visual fidelity to original
     - [ ] Create component documentation with code examples
     - [ ] Add interactive theme toggle to demonstrate theme transitions
     - [ ] Showcase all animations and interactions
     - [ ] Add detailed annotations for each component's HTML structure and CSS classes
   - [ ] Build landing page prototype for approval
     - [ ] Recreate index.html using Tailwind and 11ty
     - [ ] Implement all sections with exact visual match to original
     - [ ] Ensure all animations and interactions function identically
     - [ ] Test responsive behavior across device sizes
     - [ ] Add comprehensive annotations for page structure and component usage
   - [ ] **CRITICAL CONSTRAINT: Obtain UI component approval**
     - [ ] Present style guide and landing page for stakeholder review
     - [ ] Document any feedback or required adjustments
     - [ ] Make necessary refinements until full approval is received
     - [ ] Create component comparison documentation
     - [ ] Prepare before/after visual demonstrations
   - [ ] Create reusable layouts
     - [ ] Implement base layout with underwater environment effects
     - [ ] Design the two page templates (collection and entry)
     - [ ] Develop fixed landing page structure
     - [ ] Add detailed annotations explaining layout structure and component positioning
     - [ ] Build layout composition demonstrations
   - [ ] Build navigation components
     - [ ] Create desktop navigation with highlight states
     - [ ] Implement mobile navigation with fixed bottom positioning
     - [ ] Add theme toggle control in header
     - [ ] Document all navigation states and behaviors with code comments
     - [ ] Test navigation across all breakpoints
   - [ ] Create migration index entry
     - [ ] Document each UI component with usage examples
     - [ ] Include component variations and states
     - [ ] Link to style guide sections for reference
     - [ ] Map original components to new implementations

[ ] **Quality Validation: UI Component System [Complexity: 4/5]**
   - [ ] Conduct side-by-side comparisons with original style guide
   - [ ] Test all interactive elements for identical behavior
   - [ ] Verify responsive behavior matches original implementation
   - [ ] Validate accessibility of all UI components
   - [ ] Ensure consistent styling across all components
   - [ ] Verify theme toggle works with all components
   - [ ] Check for detailed annotations throughout all component code
   - [ ] Conduct usability review with test users
   - [ ] **BLOCKER:** UI component system must pass validation before proceeding

[ ] **Step 4: Core UI Components [Complexity: 3/5]**
   - [ ] Implement core UI components
     - [ ] Develop glass-morphic container components
     - [ ] Create project and journal card components
     - [ ] Build feature list with custom bullet styling
     - [ ] Implement call-to-action links with hover effects
     - [ ] Add extensive annotations for each component implementation
   - [ ] Create form elements
     - [ ] Style input fields with theme-specific focus states
     - [ ] Implement custom checkboxes and radio buttons
     - [ ] Build contact form with validation
     - [ ] Style select dropdowns and textareas
     - [ ] Document all form states and behaviors with detailed comments
   - [ ] Implement interactive elements
     - [ ] Build animated buttons with hover/focus states
     - [ ] Create tooltip components
     - [ ] Develop accordion and tab components
   - [ ] Create migration index entry
     - [ ] Document all core UI components with code snippets
     - [ ] Include interaction states and variations
     - [ ] Provide usage guidelines for each component

[ ] **Quality Validation: Core UI Components [Complexity: 3/5]**
   - [ ] Test all components for visual accuracy
   - [ ] Verify interactive behaviors match original implementation
   - [ ] Test theme compatibility of all components
   - [ ] Validate form elements with sample submissions
   - [ ] Verify focus states and keyboard navigation
   - [ ] Test hover and active states across all components
   - [ ] Ensure comprehensive annotations throughout component code
   - [ ] **BLOCKER:** Core UI components must pass validation before proceeding

[ ] **Step 5: Content Migration [Complexity: 3/5]**
   - [ ] Structure content collections
     - [ ] Create projects collection with frontmatter schema
     - [ ] Set up journal/blog posts collection
     - [ ] Implement tagging system for content organization
     - [ ] Document collection structure with detailed annotations
   - [ ] Convert HTML content to Markdown
     - [ ] Migrate existing project content
     - [ ] Convert journal/blog entries
     - [ ] Preserve all metadata (dates, ids, status indicators)
     - [ ] Add annotations explaining content structure and formatting
   - [ ] Set up data files
     - [ ] Create configuration data file for site settings
     - [ ] Implement navigation data structure
     - [ ] Set up featured content selection for homepage
     - [ ] Add detailed comments explaining all data structures
   - [ ] Create migration index entry
     - [ ] Document content schema and frontmatter reference
     - [ ] Provide examples of migrated content
     - [ ] Include data file structures and relationships

[ ] **Quality Validation: Content Migration [Complexity: 2/5]**
   - [ ] Verify all content is correctly migrated to Markdown
   - [ ] Validate frontmatter schema for consistency
   - [ ] Test tag filtering and content organization
   - [ ] Verify metadata preservation in all converted content
   - [ ] Test data files with sample page builds
   - [ ] Ensure all content and data files include appropriate annotations
   - [ ] **BLOCKER:** Content migration must pass validation before proceeding

[ ] **Step 6: Layout Implementation [Complexity: 3/5]**
   - [ ] Implement constrained layout system
     - [ ] Create 1-column layout (mobile-first, full width)
     - [ ] Develop 2-column layout (content + sidebar)
     - [ ] Build 3-column grid layout
     - [ ] Add detailed annotations explaining layout structure and behavior
   - [ ] Implement responsive behavior
     - [ ] Define breakpoint behavior for all layouts
     - [ ] Ensure consistent spacing across viewport sizes
     - [ ] Test and refine mobile layout experience
     - [ ] Document responsive breakpoints and behaviors with code comments
   - [ ] Create layout documentation
     - [ ] Build interactive layout examples
     - [ ] Document grid system usage guidelines
     - [ ] Create responsive behavior documentation
   - [ ] Create migration index entry
     - [ ] Document all layout patterns with visual diagrams
     - [ ] Include responsive behavior reference
     - [ ] Provide code examples for each layout

[ ] **Quality Validation: Layout Implementation [Complexity: 2/5]**
   - [ ] Test layouts across all breakpoints
   - [ ] Verify correct grid behavior with sample content
   - [ ] Validate spacing consistency across layouts
   - [ ] Test layout transitions between breakpoints
   - [ ] Verify mobile experience matches design requirements
   - [ ] Ensure thorough documentation of all layout code
   - [ ] **BLOCKER:** Layout implementation must pass validation before proceeding

[ ] **Step 7: Implement Collection Pages [Complexity: 3/5]**
   - [ ] Develop single collection template for both projects and blog
     - [ ] Create grid layout for projects
     - [ ] Build list layout for journal entries
     - [ ] Implement filtering and sorting functionality
     - [ ] Add detailed annotations for template structure and logic
   - [ ] Add pagination
     - [ ] Configure pagination settings in 11ty
     - [ ] Style pagination controls consistently
     - [ ] Test with varying content amounts
     - [ ] Document pagination functionality with code comments
   - [ ] Implement filtering and sorting
     - [ ] Create tag-based filtering
     - [ ] Implement date-based sorting
     - [ ] Add search functionality
   - [ ] Create migration index entry
     - [ ] Document collection page templates with annotations
     - [ ] Include filtering and pagination reference
     - [ ] Provide template usage guidelines

[ ] **Quality Validation: Collection Pages [Complexity: 2/5]**
   - [ ] Verify collection templates match original design
   - [ ] Test filtering and sorting with sample content
   - [ ] Validate pagination with different content volumes
   - [ ] Test responsive behavior of collection layouts
   - [ ] Verify theme compatibility of all collection elements
   - [ ] Check for comprehensive annotations in all collection templates
   - [ ] **BLOCKER:** Collection pages must pass validation before proceeding

[ ] **Step 8: Implement Entry Pages [Complexity: 3/5]**
   - [ ] Create single entry template for projects and blog posts
     - [ ] Design project detail layout
     - [ ] Implement blog post formatting
     - [ ] Add metadata display (dates, tags, etc.)
     - [ ] Add detailed annotations explaining template structure
   - [ ] Add navigation between entries
     - [ ] Implement previous/next entry navigation
     - [ ] Add return to collection links
     - [ ] Create related content section
     - [ ] Document navigation functionality with code comments
   - [ ] Implement content display features
     - [ ] Create image gallery component
     - [ ] Build code snippet formatter
     - [ ] Develop table of contents generator
   - [ ] Create migration index entry
     - [ ] Document entry page templates with annotations
     - [ ] Include navigation and content display reference
     - [ ] Provide template usage guidelines

[ ] **Quality Validation: Entry Pages [Complexity: 2/5]**
   - [ ] Compare entry page templates to original designs
   - [ ] Test navigation between related entries
   - [ ] Verify metadata display accuracy
   - [ ] Validate responsive behavior of entry layouts
   - [ ] Test theme compatibility of all entry page elements
   - [ ] Ensure thorough annotations throughout entry page templates
   - [ ] **BLOCKER:** Entry pages must pass validation before proceeding

[ ] **Step 9: Testing & Refinement [Complexity: 4/5]**
   - [ ] Validate visual fidelity
     - [ ] Compare with original implementation in multiple browsers
     - [ ] Test animations and theme toggle extensively
     - [ ] Verify responsive behavior matches design specs
     - [ ] Document any visual discrepancies
   - [ ] Accessibility testing
     - [ ] Run automated accessibility audits
     - [ ] Test with screen readers
     - [ ] Verify keyboard navigation
     - [ ] Test reduced motion preference support
     - [ ] Add accessibility-related annotations to relevant code
   - [ ] Performance optimization
     - [ ] Run Lighthouse performance audits
     - [ ] Optimize image loading strategy
     - [ ] Refine animation performance
     - [ ] Configure Tailwind purge for production
     - [ ] Document all optimization techniques with code comments
   - [ ] Cross-browser testing
     - [ ] Test in Chrome, Firefox, Safari, and Edge
     - [ ] Document and fix any browser-specific issues
     - [ ] Test with different operating systems
   - [ ] Create migration index entry
     - [ ] Document testing procedures and results
     - [ ] Include performance optimization techniques
     - [ ] Provide accessibility compliance reference

[ ] **Quality Validation: Testing & Refinement [Complexity: 3/5]**
   - [ ] Conduct comprehensive cross-browser testing
   - [ ] Verify accessibility compliance with WCAG 2.1
   - [ ] Validate performance optimizations with metrics
   - [ ] Test with real users if possible
   - [ ] Document all test results and optimizations
   - [ ] Check for thorough annotations of optimization techniques
   - [ ] Test with various network conditions
   - [ ] **BLOCKER:** All testing and refinement must pass validation before proceeding

[ ] **Step 10: Deployment [Complexity: 2/5]**
   - [ ] Configure GitHub Pages
     - [ ] Set up custom domain if needed
     - [ ] Configure HTTPS
   - [ ] Set up CI/CD pipeline
     - [ ] Finalize GitHub Actions workflow
     - [ ] Add build status indicators
   - [ ] Document
     - [ ] Update style guide documentation
     - [ ] Create content authoring guide
     - [ ] Document custom Tailwind extensions
     - [ ] Create comprehensive code annotation guide for future development
   - [ ] Create migration index entry
     - [ ] Document deployment process
     - [ ] Include CI/CD workflow reference
     - [ ] Provide maintenance guidelines

[ ] **Final Quality Validation: Pre-Launch [Complexity: 5/5]**
   - [ ] Perform end-to-end testing on staging environment
   - [ ] Validate CI/CD pipeline with test deployments
   - [ ] Verify all pages render correctly on live environment
   - [ ] Conduct final visual inspection across devices
   - [ ] Test all interactive elements on live environment
   - [ ] Validate all animations and transitions in production
   - [ ] Ensure all HTML and CSS is thoroughly annotated throughout the codebase
   - [ ] Conduct full accessibility review
   - [ ] Verify analytics and monitoring setup
   - [ ] Test site performance on various connection speeds
   - [ ] Validate SEO optimization
   - [ ] Finalize migration index.md as complete reference documentation
   - [ ] **CRITICAL BLOCKER:** Full site must pass final validation before public launch

---

## Rules

- no additional page development until UI component approval is received
- each step must pass its quality validation phase before proceeding to the next step
- all HTML and CSS code must be annotated in detail with explanatory comments
- task complexity ratings (1-5) determine the minimum number of sub-tasks required
- limit code generation to chunks of 100 lines max to reduce tool use errors
- implement a max retry limit of 3 for any error before requesting human assistance
- when facing persistent errors, try changing model perspective before clearing context
- maintain a migration index.md document that catalogs all project components for AI reference
