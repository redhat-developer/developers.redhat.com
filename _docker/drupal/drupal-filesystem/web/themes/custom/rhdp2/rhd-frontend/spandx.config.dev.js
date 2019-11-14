module.exports = {
    host: "localhost",
    port: "8080",
    open: false,
    startPath: "/",
    verbose: true,
    routes: {
        // Here are some routing examples to get started.
        "/themes/": { host: "https://developers.redhat.com" },
        "/sites/": { host: "https://developers.redhat.com" },
        // Route a URL path to a local directory.
        "/": "docs"

        // Route a URL path to an app server.
        // This is most useful for testing local files (esp JS and CSS) against
        // a remote QA or production server.
        

        // Route a URL path to an app server, and watch local files for changes.
        // This is most useful for putting a local development at a certain
        // path on your spandx server.  Includes browser-sync auto-reloading.
        // '/': { host: 'http://localhost:8080/', watch: '~/projects/my-app' },
    }
};

