module.exports = function(eleventyConfig) {
    // Copie les fichiers statiques tels quels
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("main.css");
    eleventyConfig.addPassthroughCopy("fonts.css");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("comics");
  
    return {
      dir: {
        input: "src",
        output: "_site",
        includes: "_includes"
      }
    };
  };