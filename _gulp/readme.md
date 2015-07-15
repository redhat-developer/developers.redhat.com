# JBoss Gulp Script

This is a gulp script that does three things:

1. The browser-sync task Proxies the localhost:4242 ruby server so that it is available on a local network IP - this allows to easy testing on mobile devices and virtual machines
2. The styles task watches `*.scss` files for changes, and compiles, injects and refreshes the browser when needed
3. The fonts task builds the redhat icon font from the folder of SVG images


## Requirements

1. Node.js & NPM → Download the installer from <http://nodejs.org/>
2. Gulp → Once Node.js is installed, open any terminal window and install gulp globally → `npm install gulp -g`

## To Install

Do this only once:

0. The first time, visit the `_gulp` folder in your terminal and type `npm install` - this will fetch and install all dependencies 

## To Run

1. Make sure you are running the awestruct server via `rake preview` in the root directory
2. in the `_gulp` folder type `gulp` to run browsersync - the proxied version of the site should open in your browser. If you view the terminal, you will see links to **local** and **external** - visit the **external** url on any device or machine connected to your network.


Watch the full workflow here: <https://www.youtube.com/watch?v=sujGAuu5-Dc>
