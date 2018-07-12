const fs = require('fs-extra');

class DownloadHelper {

    clear() {
        let dirSize = [];
        fs.readdirSync(global.downloadDir).forEach(file => {
            dirSize.push(file)
        });
        if (dirSize.length > 0) {
            fs.emptyDir(global.downloadDir)
        }
    }

    get() {
        let downloadCount = 0;
        let dirSize = [];
        do {
            fs.readdirSync(global.downloadDir).forEach(file => {
                dirSize.push(file)
            });
            this.sleep(1000);
            downloadCount++;
            if (dirSize.length > 0 || downloadCount === 6) {
                return dirSize.length;
            }
        }
        while (dirSize.length === 0) ;
    }

    sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }

}

module.exports = new DownloadHelper;
