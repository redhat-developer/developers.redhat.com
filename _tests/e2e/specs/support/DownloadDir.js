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
        let i = 0;
        let downloads = [];
        do {
            i = i + 1;
            fs.readdirSync(global.downloadDir).forEach(file => {
                downloads.push(file);
            });

        } while (downloads.length === 0 || i < 30);
        return downloads;
    }
}