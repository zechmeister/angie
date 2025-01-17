const fs = require("fs");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const sass = require("sass-embedded");
const autoprefixer = require("autoprefixer");
const tailwind = require("tailwindcss");
const postcss = require("postcss");
const uglifyJs = require("uglify-js");
const { rimrafSync } = require("rimraf");

// src: https://github.com/futurist/replace-css-url
var hasQuote = /^\s*('|")/;
function replacePathInCSS(css, mapFunc) {
  return [
    /(url\s*\()(\s*')([^']+?)(')/gi,
    /(url\s*\()(\s*")([^"]+?)(")/gi,
    /(url\s*\()(\s*)([^\s'")].*?)(\s*\))/gi,
  ].reduce((css, reg, index) => {
    return css.replace(reg, (all, lead, quote1, path, quote2) => {
      var ret = mapFunc(path, quote1);
      if (hasQuote.test(ret) && hasQuote.test(quote1)) quote1 = quote2 = "";
      return lead + quote1 + ret + quote2;
    });
  }, css);
}

/* compile sass to css incl. prefixing and path adjustments */
const compileSass = async ({ entry, loadPaths }) => {
  let css = sass.compile(entry, {
    loadPaths,
    sourceMap: false,
    style: "expanded",
  }).css;

  css = (
    await postcss([autoprefixer]).process(css, {
      from: undefined,
    })
  ).css;

  if (process.env.BUILD_ENV === "GHA") {
    css = replacePathInCSS(css, (path) => {
      if (/^data:/.test(path)) return path;
      if (/^\./.test(path)) return `/angie${path.slice(1)}`;
      return `/angie${path}`;
    });
  }

  return css;
};

const compileTailwind = async () => {
  const source = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  `;

  const css = await postcss([tailwind()]).process(source, { from: undefined });

  return css.css;
};

const prependVariables = (css) => {
  delete require.cache[require.resolve("./data/colors.js")];
  delete require.cache[require.resolve("./data/spacing.js")];
  const colors = require("./data/colors");
  const spacing = require("./data/spacing");
  let block = ":root {\n";
  Object.keys(colors).forEach((group) => {
    if (group === "black" || group === "white") {
      block += `  --color-base-${group}: ${colors[group].toLowerCase()};\n`;
    } else {
      Object.keys(colors[group]).forEach((name) => {
        block += `  --color-base-${group}-${name}: ${colors[group][
          name
        ].toLowerCase()};\n`;
      });
    }
  });
  Object.keys(spacing).forEach((name) => {
    block += `  --s-${name}: ${spacing[name]}rem;\n`;
  });
  block += "}\n";

  return [block, css].join("\n");
};

const compileJs = () => {
  return fs
    .readdirSync("./src/scripts")
    .map((file) => fs.readFileSync("./src/scripts/" + file).toString())
    .join("\n\n");
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addWatchTarget("src");
  eleventyConfig.addWatchTarget("docs/styles");
  eleventyConfig.addWatchTarget("docs/scripts");

  eleventyConfig.addPassthroughCopy({ "assets/fonts/*": "fonts" }); // Bundes
  eleventyConfig.addPassthroughCopy({ "docs/fonts/*": "fonts" }); // Inter
  eleventyConfig.addPassthroughCopy({ "docs/images/*": "images" });
  eleventyConfig.addPassthroughCopy({ "docs/styles/prism.css": "prism.css" });
  eleventyConfig.addPassthroughCopy({ "docs/scripts/prism.js": "prism.js" });

  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    // clean
    rimrafSync("_site");
    rimrafSync("dist");
    fs.mkdirSync("dist");

    let fontsCss = await compileSass({ entry: "./src/styles/fonts.scss" });
    fs.writeFileSync("dist/fonts.css", fontsCss);

    let angieJs = compileJs();
    fs.writeFileSync("dist/angie.js", angieJs);

    if (runMode === "build") {
      angieJs = uglifyJs.minify(angieJs).code;
      fs.writeFileSync("dist/angie.min.js", angieJs);

      fs.cpSync("assets", "dist", { recursive: true });
      fs.cpSync("src/index.js", "dist/index.js");
      fs.cpSync("src/components", "dist/components", { recursive: true });
      fs.cpSync("src/utils", "dist/utils", { recursive: true });
    }
  });

  eleventyConfig.on("eleventy.after", async (args) => {
    // docs.css
    let docsCss = await compileSass({ entry: "./docs/styles/docs.scss" });
    docsCss = prependVariables(docsCss);
    fs.writeFileSync("./_site/docs.css", docsCss);

    // build tailwind
    let tailwindCss = await compileTailwind();
    fs.writeFileSync("./_site/tailwind.css", tailwindCss);

    // copy over angie distributables
    fs.copyFileSync("dist/fonts.css", "_site/fonts.css");
    fs.copyFileSync("dist/angie.js", "_site/angie.js");

    fs.copyFileSync("package.json", "dist/package.json");
  });

  return {
    dir: {
      input: "docs/pages",
      data: "../../data",
      includes: "_includes",
    },
  };
};
