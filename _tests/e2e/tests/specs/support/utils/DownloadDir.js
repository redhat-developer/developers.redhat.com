const fs = require('fs-extra');

class DownloadDir {
    init() {
        fs.ensureDirSync(global.downloadDir, 0o2775);
    }

    destroy() {
        const dirSize = [];
        fs.readdirSync(global.downloadDir).forEach((file) => {
            dirSize.push(file);
        });
        if (dirSize.length > 0) {
            fs.emptyDir(global.downloadDir);
        }

        try {
            fs.removeSync(global.downloadDir);
        } catch (error) {
            console.log("Failed to delete download directory");
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
