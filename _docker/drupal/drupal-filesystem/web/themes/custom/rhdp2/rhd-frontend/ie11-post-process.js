const postcss = require("postcss");
const nested = require("postcss-nested");
const cssvariables = require("postcss-css-variables");
const autoprefixer = require('autoprefixer')({ grid: false });
const cssnano = require('cssnano')({preset: 'default'});
const start = new Date()
const hrstart = process.hrtime()
const fs = require("fs");

// Compile ie11 compatible css and minify ten save to theme/rhdp2/css folder
fs.readFile('./dist/css/rhd.css', (err, css) => {
  console.info("CSS compile this can take up to 2 hours depending on system performance!")
  postcss([nested, autoprefixer, cssvariables])
    .process(css, { from: './dist/css/rhd.css', to: '../css/rhd.ie11.css' })
    .then(result => {
      console.info('CSS Compile Complete')
      fs.writeFile('../css/rhd.ie11.css', result.css, () => true)
      console.info('CSS Compression Started')
      postcss([cssnano])
        .process(result.css, { from: '../css/rhd.ie11.css', to: '../css/rhd.ie11.min.css' })
        .then(result => {
          console.info('CSS Compression Ended')
          fs.writeFile('../css/rhd.ie11.min.css', result.css, () => true)
        })
    })
})
