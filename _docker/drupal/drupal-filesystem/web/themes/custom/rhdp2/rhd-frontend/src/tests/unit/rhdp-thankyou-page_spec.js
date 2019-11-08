"use strict";

describe('Media thank you page', function () {
    var wc;
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-thankyou.js').then(() => {
            wc = document.createElement('rhdp-thankyou');
        });
    });
    
    afterEach(function () {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function () {

        var mediaName,
            url,
            directLink;

        beforeEach(function () {
            url = 'http://www.test-download.com/?p=thing&tcDownloadURL=http://www.testing.com';
            mediaName = 'Media: Test Download';
            directLink = 'http://www.test-download.com';
            });

        it('should update url, media-name and direct-link', function () {
            wc.url = url;
            wc.mediaName = mediaName;
            wc.directLink = directLink;
            document.body.insertBefore(wc, document.body.firstChild);

            expect(wc.url).toEqual(url);
            expect(wc.getAttribute('media-name')).toEqual(mediaName);
            expect(wc.getAttribute('direct-download')).toEqual(directLink);
        });
    });

    describe('with a valid url', function () {

        var url;

        beforeEach(function () {
            url = 'http://www.test-download.com/?p=Media:+Test+Download&tcDownloadURL=http://www.testing.com';
            wc.url = url;
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should display the correct name without Media in the title', function () {
            expect(wc.querySelector('.thankyou').innerText.replace(/\r?\n|\r/g, "")).toEqual('Thank you for downloading the:Test Download')
        });

        it('should display the link from tcDownloadURL', function () {
            expect(wc.querySelector('#download-link').href).toEqual('http://www.testing.com/')
        });
    });


});


