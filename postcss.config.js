/**
 * Blue Marlin OS - PostCSS Configuration
 * 
 * This configuration processes our Tailwind CSS for optimal output,
 * preserving our custom underwater visual effects while optimizing
 * the final CSS bundle.
 */

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}; 