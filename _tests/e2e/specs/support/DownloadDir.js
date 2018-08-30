const fs = require('fs-extra');

export class DownloadDir {

    clear() {
        let dirSize = [];
        fs.readdirSync(global.downloadDir).forEach(file => {
            dirSize.push(file)
        });
        if (dirSize.length > 0) {
            fs.emptyDir(global.downloadDir)
        }
    };

    get() {
        let downloadCount = 0;
        let downloads = [];
        do {
            fs.readdirSync(global.downloadDir).forEach(file => {
                downloads.push(file);
            });
            this.sleep(1000);
            downloadCount++;
            if (downloads.length > 0 || downloadCount === 15) return downloads;

        }
        while (downloads.length === 0) ;
    }

    sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }
}
