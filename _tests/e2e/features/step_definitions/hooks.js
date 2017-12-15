const hooks = function () {

    let desktopBrowsers = ['chrome', 'firefox'];

    this.Before(function () {
        if (desktopBrowsers.includes(process.env.RHD_JS_DRIVER)) {
            browser.windowHandleSize({
                width: 1200,
                height: 768
            });
        }
    });

    this.After(function () {
        browser.execute('window.localStorage.clear();');
    })
};

module.exports = hooks;
