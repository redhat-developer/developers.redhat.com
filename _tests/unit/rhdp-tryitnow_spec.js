"use strict";
//rhdp-tryitnow component testing

describe('Try-it now feature', function() {
    var wc;
    beforeEach(function() {
        wc = document.createElement('rhdp-tryitnow');
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function() {
        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should update all attributes', function() {
            var title = "test title",
            subtitle = "test subtitle",
            buttonID = "test button id",
            buttonText = "test button text",
            buttonLink = "http://www.buttonlink.com",
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;
            expect(wc.getAttribute('title')).toEqual(title);
            expect(wc.getAttribute('subtitle')).toEqual(subtitle);
            expect(wc.getAttribute('buttonID')).toEqual(buttonID);
            expect(wc.getAttribute('buttonText')).toEqual(buttonText);
            expect(wc.getAttribute('buttonLink')).toEqual(buttonLink);
            expect(wc.getAttribute('icon')).toEqual(icon);
        });
    });

});