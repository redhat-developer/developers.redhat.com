# RHD Front-end Code and Documentation

[Live Documentation Site](https://redhat-developer.github.io/rhd-frontend/)

## Installation, Scripts, and Contributing

* ```npm install``` to install all dependencies locally
* NPM Scripts (```npm start```, ```npm test```, ```npm run {name}```)
    * ```start``` - runs ```build``` and ```docs```
    * ```test``` - runs Karma test runner using Jasmine
    * ```build``` - runs ```scripts``` and ```styles```
    * ```scripts``` - runs tsc and uglify
    * ```styles``` - runs node-sass and postcss
    * ```serve``` - runs ```start``` and browser-sync of docs folder
    * ```docs``` - runs Hugo and ```docs:front```
    * ```docs:front``` - runs ```docs:styles``` and ```docs:scripts```
    * ```docs:styles``` - copies minified css to docs and runs sassdoc
    * ```docs:scripts``` - copies minified JS to docs and runs jsdoc
    * ```hugo``` - runs Hugo live server with file watch (useful for seeing locally hosted styles correctly)

* Main Documentation update
    * Install Hugo [optional]
    * Navigate to ```src/docs```
    * Add new files by running ```hugo new path/to/file.md``` (or copy an existing file and change the frontmatter at the top)
    * Update Markdown files located in ```src/docs/content```
    * Generate docs and view changes (run in ```npm start && npm run hugo```)
    * Served [locally](http://localhost:1313/rhd-frontend/)

* Script Update
    * Edit files in ```src/scripts```
    * Run ```npm start```
    * Commit

* Style Update
    * Edit files in ```src/styles```
    * Run ```npm start```
    * Commit


## Popular Patterns

[Typography](https://redhat-developer.github.io/rhd-frontend/patterns/typography)

[Buttons and CTAs](https://redhat-developer.github.io/rhd-frontend/patterns/btn-cta/)

[Alerts and Notifications](https://redhat-developer.github.io/rhd-frontend/patterns/content/notifications)

## Credits

* NodeJS
* [Hugo](https://gohugo.io/)
* JSDoc
* SASSDoc
* TypeScript
* ESLint
* Karma
* Jasmine
* Node-Sass
* Semantic-Release
* Browser-Sync
* PostCSS
* CSSNano
* UglifyJS
* FontAwesome
* TravisCI
