const pxtorem = require("@minko-fe/postcss-pxtorem");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const calc = require("postcss-calc");
const normalize = require("postcss-normalize");
// const obfuscator = require('postcss-obfuscator')

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("tailwindcss/nesting")(),
    require("tailwindcss")(),
    normalize,
    calc,
    autoprefixer,
    // obfuscator({
    //   /* options */
    //   enable: isProd, // Force Run on Dev Env or when srcPath equals desPath.
    //   classMethod: 'simple',
    //   srcPath: "src", // Source of your files.
    //   desPath: "out", // Destination for obfuscated html/js/.. files.
    //   extensions: ['.jsx', '.tsx', '.css', '.scss', '.ts', '.js'],
    //   formatJson: true, // Format obfuscation data JSON file.
    // }),
    isProd &&
      cssnano({
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
  ].filter(Boolean),
};
