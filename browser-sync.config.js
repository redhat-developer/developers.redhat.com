// require the module as normal
var bs = require("browser-sync").create();

// .init starts the server
bs.init({
    server: "docs",
    ui: false,
    port: 8088
});

bs.watch("src/**/*", function (event, file) {
    if (event === "change") {
        bs.reload("*.css")
    }
})

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.html");