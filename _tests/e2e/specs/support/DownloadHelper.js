const fs = require('fs-extra');
const log4js = require('log4js');
const logger = log4js.getLogger();

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
                logger.info('waiting for download . . . ');
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
