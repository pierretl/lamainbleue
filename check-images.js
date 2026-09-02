const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

function getImages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name);

    if (
      entry.isDirectory() &&
      !["node_modules", "_site", ".git"].includes(entry.name)
    ) {
      return getImages(fullPath);
    }

    if (entry.isFile() && /\.(jpg|jpeg)$/i.test(entry.name)) {
      return [fullPath];
    }

    return [];
  });
}

const options = {
  widths: [866, 459],
  formats: ["webp", "jpg"],
  urlPath: "/media/generate/",
  outputDir: "_site/media/generate/",
};

for (const file of getImages(".")) {
  try {
    Image.statsSync(file, options);
    console.log("✅ statsSync", file);
  } catch (error) {
    console.log("❌ statsSync", file);
    console.log(error.message);
  }
}