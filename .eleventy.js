const { DateTime } = require("luxon");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require("fs-extra");
const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

function imageShortcodeSync(type, src, alt, sizes, classe="") { 
  switch (type) {
    case 'carte':
      var widthType = [420, 290];
      break;
    default:
      //texteEtVisuel
      var widthType = [866, 459];
  }

  let extentionSrc = src.split(/[#?]/)[0].split('.').pop().trim();
  // le avif ne fonctionne pas sur certaine image, why ??
  switch (extentionSrc) {
    case 'png':
      var formatType = ["webp", "png"];
      break;
    default:
      //jpg
      var formatType = ["webp", "jpg"];
  }

  let options = {
    widths: widthType,
    formats: formatType,
    urlPath: "/media/generate/",
    outputDir: "_site/media/generate/",
  };

  // generate images, while this is async we don’t wait
  Image(src, options);

  let imageAttributes = {
    class: classe,
    alt ,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  let metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Add support for maintenance-free post authors
  // Adds an authors collection using the author key in our post frontmatter
  // Thanks to @pdehaan: https://github.com/pdehaan
  eleventyConfig.addCollection("authors", collection => {
    const blogs = collection.getFilteredByGlob("posts/*.md");
    return blogs.reduce((coll, post) => {
      const author = post.data.author;
      if (!author) {
        return coll;
      }
      if (!coll.hasOwnProperty(author)) {
        coll[author] = [];
      }
      coll[author].push(post.data);
      return coll;
    }, {});
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // SCSS
eleventyConfig.on("beforeBuild", () => {

  // Compile Sass
  let result = sass.renderSync({
    file: "_sass/style.scss",
    sourceMap: false,
    outputStyle: "compressed",
  });
  console.log("SCSS compiled");

  // Optimize and write file with PostCSS
  let css = result.css.toString();
  postcss([autoprefixer])
    .process(css, { from: "style.css", to: "style.css" })
    .then((result) => {
        fs.outputFile("_site/style.css", result.css, (err) => {
          if (err) throw err;
          console.log("CSS optimized");
        });
    });
});

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");

  /* Markdown Plugins */
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  // Markdown in Nunjucks with custom filter
  const md = new markdownIt({
    html: true
  });
  //exemple {{ foobar | markdown | safe }}
  eleventyConfig.addNunjucksFilter("markdown", function(content) { 
    return md.render(content);
  });

  //Shortcode image
  eleventyConfig.addNunjucksShortcode("image", imageShortcodeSync); // Nunjucks macros cannot use asynchronous shortcodes


  // trigger a rebuild if sass changes
  eleventyConfig.addWatchTarget("_sass/");

  // Copie le dossier "media/image" dans "_site/media/image"
  eleventyConfig.addPassthroughCopy({"media/image": "media/image"});

  // Copie le dossier "media/favicon" dans "_site/media/favicon"
  eleventyConfig.addPassthroughCopy({"media/favicon": "media/favicon"});

  // Copie le dossier "media/font" dans "_site/media/fonts"
  eleventyConfig.addPassthroughCopy({"media/font": "media/font"});

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
