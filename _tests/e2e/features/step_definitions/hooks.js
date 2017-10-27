const hooks = function () {

    this.Before(function () {
        const wdioDeprecationWarning = /^WARNING: the "\w+" command will be depcrecated soon. Please use a different command in order to avoid failures in your test after updating WebdriverIO./;
        // Monkey patch:
        const warn = console.warn;
        console.warn = function suppressWebdriverWarnings(message) {
            if (message.match(wdioDeprecationWarning)) return;
            warn.apply(console, arguments)
        };
    });

    this.After(function () {
        driver.execute('window.localStorage.clear();')
    })

};

module.exports = hooks;
