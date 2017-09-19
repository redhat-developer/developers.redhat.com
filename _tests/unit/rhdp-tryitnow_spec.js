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
            expect(wc.getAttribute('button-id')).toEqual(buttonID);
            expect(wc.getAttribute('button-text')).toEqual(buttonText);
            expect(wc.getAttribute('button-link')).toEqual(buttonLink);
            expect(wc.getAttribute('icon')).toEqual(icon);
        });
    });

    describe('with incomplete properties', function() {
        var title,
            subtitle,
            buttonID,
            buttonText,
            buttonLink,
            icon;

        beforeEach(function() {
            title = "";
            subtitle = "";
            buttonID = "";
            buttonText = "";
            buttonLink = "";
            icon = "";
        });

        it('should be blank with no values', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });

        it('should not be blank with only buttonID missing', function() {
            title = "test title";
            subtitle = "test subtitle";
            buttonText = "test button text";
            buttonLink = "http://www.buttonlink.com";
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toBeGreaterThan(0);
        });

        it('should be blank with title missing', function() {
            subtitle = "test subtitle";
            buttonText = "test button text";
            buttonLink = "http://www.buttonlink.com";
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });
        it('should be blank with subtitle missing', function() {
            title = "test title";
            buttonText = "test button text";
            buttonLink = "http://www.buttonlink.com";
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });
        it('should be blank with buttonText missing', function() {
            title = "test title";
            subtitle = "test subtitle";
            buttonLink = "http://www.buttonlink.com";
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });
        it('should be blank with buttonLink missing', function() {
            title = "test title";
            subtitle = "test subtitle";
            buttonText = "test button text";
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });
        it('should be blank with icon missing', function() {
            title = "test title";
            subtitle = "test subtitle";
            buttonText = "test button text";
            buttonLink = "http://www.buttonlink.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toEqual(0);
        });

    })

    describe('with valid data', function() {
        var title = "test title",
            subtitle = "test subtitle",
            buttonID = "test button id",
            buttonText = "test button text",
            buttonLink = "http://www.buttonlink.com/",
            icon = "http://www.imageicon.com/";

        beforeEach(function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should not be blank', function() {
            expect(wc.innerHTML.length).toBeGreaterThan(0);
        });

        it('should have a heading with appropriate text', function() {
            expect(wc.querySelector('h4').innerText).toEqual(title);
        });

        it('should have a subheading with appropriate text', function() {
            expect(wc.querySelector('h5').innerText).toEqual(subtitle);
        });

        it('should have button with appropriate text', function() {
            expect(wc.querySelector('a.button').innerText).toEqual(buttonText);
        });

        it('should have a button with corresponding link', function() {
            expect(wc.querySelector('a.button').href).toEqual(buttonLink);
        });

        it('should have an icon with a src link', function() {
            expect(wc.querySelector('img').src).toEqual(icon);
        });

        it('should have an ID on the related button', function() {
            expect(wc.querySelector('a').id).toEqual(buttonID);
        });

        describe('and dynamic value edits', function() {

            it('should update the heading with appropriate text', function() {
                wc.title = "Updated Title";
                expect(wc.querySelector('h4').innerText).toEqual("Updated Title");
            });

            it('should update the subheading with appropriate text', function() {
                wc.subtitle = "Updated subtitle";
                expect(wc.querySelector('h5').innerText).toEqual("Updated subtitle");
            });

            it('should update the button with appropriate text', function() {
                wc.buttonText = "Updated button text";
                expect(wc.querySelector('a').innerText).toEqual("Updated button text");
            });

            it('should update the button with corresponding link', function() {
                wc.buttonLink = "http://www.newbuttonlink.com/";
                expect(wc.querySelector('a.button').href).toEqual("http://www.newbuttonlink.com/");
            });

            it('should update the icon with a src link', function() {
                wc.icon = "http://www.newiconlink.com/";
                expect(wc.querySelector('img').src).toEqual("http://www.newiconlink.com/");
            });

            it('should update the button ID on the related button', function() {
                wc.buttonID = "new button id";
                expect(wc.querySelector('a').id).toEqual("new button id");
            });

        });
    })

});