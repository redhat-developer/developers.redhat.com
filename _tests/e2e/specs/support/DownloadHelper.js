const fs = require('fs-extra');

class DownloadHelper {

    clearDownloadDirectory() {
        let dirSize = [];
        fs.readdirSync(global.downloadDir).forEach(file => {
            dirSize.push(file)
        });
        if (dirSize.length > 0) {
            fs.emptyDir(global.downloadDir)
        }
    }

    getDownloads() {
        let downloadCount = 0;
        let fileName = [];
        let dirSize = [];
        do {
            fs.readdirSync(global.downloadDir).forEach(file => {
                console.log('waiting for download . . . ');
                this.sleep(1000);
                fileName.push(file);
                dirSize.push(file);
                downloadCount++;
            });
        }
        while (dirSize.length === 0 && downloadCount < 6);
        return dirSize;
    }

    sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }
}

module.exports = new DownloadHelper;
