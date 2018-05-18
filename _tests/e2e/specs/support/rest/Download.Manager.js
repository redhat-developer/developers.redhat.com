const request = require("sync-request");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  This DownloadManager class contains a set of functions that make calls to the Download Manager REST endpoint
 *  to retrieve download data in order to test download flows.
 */
class DownloadManager {

    /**
     * Constructor receives the baseUrl of the test run
     * @param url: baseUrl of the test run (specified in config/wdio.conf.base
     */
    constructor(url) {
        if (url === 'https://developers.stage.redhat.com') {
            this.baseUrl = 'https://developers.stage.redhat.com'
        } else {
            this.baseUrl = 'https://developers.redhat.com'
        }
    }

    isDMRunning() {
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/download-manager/rest/available?nv=1`, {headers: request_header});
        return response.statusCode;
    }

    /**
     * Calls DM endpoint and returns all available downloads
     * @return a hash map containing product name and it's code
     */
    allAvailableDownloads() {
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/download-manager/rest/available?nv=1`, {headers: request_header});
        let allDownloads = JSON.parse(response.getBody().toString('utf8'));

        let productNames = [];
        allDownloads.forEach(function (item) {
            productNames.push({['name']: item.name, ['productCode']: item.productCode});
        });
        return new Map(productNames.map((i) => [i.name, i.productCode]));
    }

    /**
     * Gets the download data of featured download item
     * @param productName: name of the product, for example 'Red Hat Container Development Kit (CDK)'
     * @return returns product code, download version and download URL
     */
    featuredDownloadFor(productName) {
        let downloads = this.allAvailableDownloads();
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/download-manager/rest/available/${downloads.get(productName)}?nv=1`, {headers: request_header});
        let downloadData = JSON.parse(response.getBody().toString('utf8'));
        let productCode = downloadData[0]['productCode'];
        let downloadVersion = downloadData[0]['featuredArtifact']['versionName'];
        let downloadUrl = downloadData[0]['featuredArtifact']['url'];

        if (productCode === 'cdk' || productCode === 'devsuite') {
            return this.downloadByOS('devsuite');
        } else {
            return [productCode, downloadVersion, downloadUrl]
        }
    }

    downloadByOS(productCode) {
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/download-manager/rest/available/${productCode}?nv=1`, {headers: request_header});
        let downloadData = JSON.parse(response.getBody().toString('utf8'));

        let productVersions = downloadData[0]['productVersions'][0]['files'];
        let downloadVersion = downloadData[0]['productVersions'][0]['versionName'];
        let downloadLabel, downloadUrl;
        for (let i = 0; i < productVersions.length; i++) {
            downloadLabel = productVersions[i]['label'];
            if (downloadLabel === `Installer for ${operatingSystem}`) {
                downloadUrl = productVersions[i]['url'];
            }
        }
        return ['devsuite', downloadVersion, downloadUrl]
    }

    /**
     * Gets the download filename of specified download item
     * @param downloadName: name of the product, for example 'Advanced Linux Cheatsheet'
     * @return returns download filename
     */
    getDownloadFor(downloadName) {
        let request_header = {"Content-Type": "application/json"};
        let response = request('GET', `${this.baseUrl}/download-manager/rest/available?nv=1`, {headers: request_header});
        let allDownloads = JSON.parse(response.getBody().toString('utf8'));
        let baseUrl = this.baseUrl + '/download-manager/file/';
        for (let i = 0; i < allDownloads.length; i++) {
            if (allDownloads[i]['name'] === downloadName) {
                let dl = allDownloads[i]['featuredArtifact']['url'];
                return dl.replace(baseUrl, '')
            }
        }
    }
}

module.exports = DownloadManager;

