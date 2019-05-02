const fs = require('fs-extra');

class DownloadDir {
    clear() {
        const dirSize = [];
        fs.readdirSync(global.downloadDir).forEach((file) => {
            dirSize.push(file);
        });
        if (dirSize.length > 0) {
            fs.emptyDir(global.downloadDir);
        }
    }

    get() {
        let i = 0;
        const downloads = [];
        do {
            i = i + 1;
            fs.readdirSync(global.downloadDir).forEach((file) => {
                if (!file.includes('.com.google.Chrome')) {
                    downloads.push(file);
                }
            });
        } while (downloads.length === 0 && i < 10);
        return downloads;
    }
}

export default new DownloadDir;
