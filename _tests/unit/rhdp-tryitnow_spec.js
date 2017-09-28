"use strict";
//rhdp-tryitnow component testing

describe('Try-it now feature', function() {
    var wc;
    beforeEach(function() {
        wc = document.createElement('rhdp-tryitnow');
    });

    afterEach(function() {
        //document.body.removeChild(document.body.firstChild);
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
            buttonLink = "http://www.buttonlink.com/",
            icon = "http://www.imageicon.com";

            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;
            wc.icon = icon;
            expect(wc.getAttribute('title')).toEqual(title);
            expect(wc.getAttribute('subtitle')).toEqual(subtitle);
            expect(wc.getAttribute('buttonid')).toEqual(buttonID);
            expect(wc.getAttribute('buttontext')).toEqual(buttonText);
            expect(wc.getAttribute('buttonlink')).toEqual(buttonLink);
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
            title = "test title",
            subtitle = "test subtitle",
            buttonID = "test button id",
            buttonText = "test button text",
            buttonLink = "http://www.buttonlink.com/",
            icon = "http://www.imageicon.com/";
        });

        it('should not be blank with no values', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonID = buttonID;
            wc.buttonText = buttonText;
            wc.buttonLink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.innerHTML.length).toBeGreaterThan(0);
        });

        it('should not be blank with buttonID missing', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4').innerText).toBe(title);
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
            expect(wc.querySelector('img').src).toBe(icon);
            expect(wc.querySelector('a').id).toBe('');
        });

        it('should not be blank with title missing', function() {
            wc.subtitle = subtitle;
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4')).toBeNull();
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
            expect(wc.querySelector('img').src).toBe(icon);
            expect(wc.querySelector('a').id).toBe(buttonID);
        });
        it('should not be blank with subtitle missing', function() {
            wc.title = title;
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4').innerText).toBe(title);
            expect(wc.querySelector('h5')).toBeNull();
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
            expect(wc.querySelector('img').src).toBe(icon);
            expect(wc.querySelector('a').id).toBe(buttonID);
        });
        it('should not be blank with buttonText missing', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonid = buttonID;
            wc.buttonlink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4').innerText).toBe(title);
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
            expect(wc.querySelector('img').src).toBe(icon);
            expect(wc.querySelector('a').id).toBe(buttonID);
        });
        it('should not be blank with buttonlink missing', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4').innerText).toBe(title);
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
            expect(wc.querySelector('img').src).toBe(icon);
            expect(wc.querySelector('a').id).toBe(buttonID);
        });
        it('should not be blank with icon missing', function() {
            wc.title = title;
            wc.subtitle = subtitle;
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;

            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('h4').innerText).toBe(title);
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
            expect(wc.querySelector('img')).toBeNull();
            expect(wc.querySelector('a').id).toBe(buttonID);
            expect(wc.innerHTML.length).toBeGreaterThan(0);
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
            wc.buttonid = buttonID;
            wc.buttontext = buttonText;
            wc.buttonlink = buttonLink;
            wc.icon = icon;

            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should not be blank', function() {
            expect(wc.innerHTML.length).toBeGreaterThan(0);
        });

        it('should have a heading with appropriate text', function() {
            expect(wc.querySelector('h4').innerText).toBe(title);
        });

        it('should have a subheading with appropriate text', function() {
            expect(wc.querySelector('h5').innerText).toBe(subtitle);
        });

        it('should have button with appropriate text', function() {
            expect(wc.querySelector('a.button').innerText).toBe(buttonText);
        });

        it('should have a button with corresponding link', function() {
            expect(wc.querySelector('a.button').href).toBe(buttonLink);
        });

        it('should have an icon with a src link', function() {
            expect(wc.querySelector('img').src).toBe(icon);
        });

        it('should have an ID on the related button', function() {
            expect(wc.querySelector('a').id).toBe(buttonID);
        });

        describe('and dynamic value edits', function() {

            it('should update the heading with appropriate text', function() {
                wc.title = "Updated Title";
                expect(wc.querySelector('h4').innerHTML).toBe("Updated Title");
            });

            it('should update the subheading with appropriate text', function() {
                wc.subtitle = "Updated subtitle";
                expect(wc.querySelector('h5').innerHTML).toBe("Updated subtitle");
            });

            it('should update the button with appropriate text', function() {
                wc.buttontext = "Updated button text";
                expect(wc.querySelector('a').innerHTML).toBe("Updated button text");
            });

            it('should update the button with corresponding link', function() {
                wc.buttonlink = "http://www.newbuttonlink.com/";
                expect(wc.querySelector('a.button').href).toBe("http://www.newbuttonlink.com/");
            });

            it('should update the icon with a src link', function() {
                wc.icon = "http://www.newiconlink.com/";
                expect(wc.querySelector('img').src).toBe("http://www.newiconlink.com/");
            });

            it('should update the button ID on the related button', function() {
                wc.buttonid = "new button id";
                expect(wc.querySelector('a').id).toBe("new button id");
            });

        });
    })

});