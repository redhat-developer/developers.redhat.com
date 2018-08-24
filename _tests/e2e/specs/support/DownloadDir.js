const fs = require('fs-extra');

export class DownloadDir {

    clear() {
        fs.removeSync(global.downloadDir);
        fs.mkdirsSync(global.downloadDir);
    };

    get() {
        let downloadCount = 0;
        let numberOfDownloads;
        let dirSize = [];
        do {
            fs.readdirSync(global.downloadDir).forEach(file => {
                dirSize.push(file)
            });
            this.sleep(1000);
            downloadCount++;
            if (dirSize.length > 0 || downloadCount === 6) {
                if (process.env.RHD_BASE_URL !== 'https://developers.stage.redhat.com') {
                    /* This is bad, however we need to throttle the production download sanity tests for monitoring purposes.
                    * Akamai is blocks requests if there are too many in quick succession. Never use sleeps in tests, ever. This is an extenuating circumstance.  */
                    numberOfDownloads = dirSize.length;
                    browser.pause(30000);
                } else {
                    numberOfDownloads = dirSize.length;
                }
                this.clear();
                return numberOfDownloads;
            }
        }
        while (dirSize.length === 0) ;
    }

    sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }
}