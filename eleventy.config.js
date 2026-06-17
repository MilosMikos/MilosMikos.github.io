module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "main.css": "main.css" });
  eleventyConfig.addPassthroughCopy({ "fonts.css": "fonts.css" });
  eleventyConfig.addPassthroughCopy({ "locales": "locales" });
  eleventyConfig.addPassthroughCopy({ scripts: "scripts" });
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy({ fonts: "fonts" });
  eleventyConfig.addPassthroughCopy({ comics: "comics" });
  eleventyConfig.addPassthroughCopy({ music: "music" });
  

  return {
    pathPrefix: "/",
   dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
