const request = require('sync-request');
const await = require('asyncawait/await');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  This DownloadManager class contains a set of functions that make calls to the Download Manager REST endpoint
 *  to retrieve download data in order to test download flows.
 */
class DownloadManager {

    /**
     * Constructor receives the baseUrl of the test run
     * @param baseUrl: baseUrl of the test run (specified in config/wdio.conf.base
     */
    constructor(baseUrl) {
        this.baseUrl = `${baseUrl}/download-manager/rest/available`
    }

    /**
     * Calls DM endpoint and returns all available downloads
     * @return a hash map containing product name and it's code
     */
    allAvailableDownloads() {
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}?nv=1`, {headers: request_header});
        let allDownloads = JSON.parse(response.getBody().toString('utf8'));

        let productNames = [];
        allDownloads.forEach(function (item) {
            productNames.push({['name']: item.name, ['productCode']: item.productCode});
        });
        return new Map(productNames.map((i) => [i.name, i.productCode]));
    }

    /**
     * Gets the download data of featured download items
     * @param productName: name of the product, for example 'Red Hat Container Development Kit (CDK)'
     * @return returns download version and download URL
     */
    featuredDownloadFor(productName) {
        let downloads = this.allAvailableDownloads();
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/${downloads.get(productName)}?nv=1`, {headers: request_header});
        let downloadData = JSON.parse(response.getBody().toString('utf8'));

        let productCode = downloadData[0]['productCode'];
        let downloadVersion = downloadData[0]['featuredArtifact']['versionName'];
        let downloadUrl = downloadData[0]['featuredArtifact']['url'];
        return [productCode, downloadVersion, downloadUrl]

    }
}

module.exports = DownloadManager;
