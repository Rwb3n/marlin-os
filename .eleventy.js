/**
 * Blue Marlin OS - Eleventy Configuration
 * 
 * This configuration sets up Eleventy as our static site generator,
 * with special attention to preserving the underwater visual effects
 * and theme system during the migration to Tailwind CSS.
 */

module.exports = function(eleventyConfig) {
  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/styles/*.css"); // For directly used CSS

  // Watch CSS files for changes during development
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");

  // Add shortcodes for underwater effects
  
  // Light Shaft Effect Shortcode
  eleventyConfig.addShortcode("lightShafts", function() {
    return `<div class="light-shafts">
      <div class="light-shaft"></div>
      <div class="light-shaft"></div>
      <div class="light-shaft"></div>
      <div class="light-shaft"></div>
    </div>`;
  });
  
  // Particles Container Shortcode
  eleventyConfig.addShortcode("particles", function(id = "particles") {
    return `<div class="particles" id="${id}"></div>`;
  });
  
  // Underwater Environment Shortcode (combines light shafts and particles)
  eleventyConfig.addShortcode("underwaterEnvironment", function() {
    return `<div class="underwater-environment">
      <div class="light-shafts">
        <div class="light-shaft"></div>
        <div class="light-shaft"></div>
        <div class="light-shaft"></div>
        <div class="light-shaft"></div>
      </div>
      <div class="particles" id="particles"></div>
    </div>`;
  });
  
  // Theme Toggle Shortcode
  eleventyConfig.addShortcode("themeToggle", function() {
    return `<button id="themeToggle" class="theme-toggle" aria-label="Switch to day mode">
      <div class="theme-toggle-knob">
        <span class="theme-toggle-icon">☾</span>
      </div>
    </button>`;
  });
  
  // Add data collections
  // Projects collection
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md");
  });
  
  // Journal collection
  eleventyConfig.addCollection("journal", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/journal/*.md");
  });
  
  // BrowserSync configuration for local development
  eleventyConfig.setBrowserSyncConfig({
    files: "./dist/css/**/*.css",
    open: true,
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = "Page not found";
          res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}; 