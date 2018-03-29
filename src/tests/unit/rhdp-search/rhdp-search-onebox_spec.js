"use strict";
// Test rhdp-search-result-count component

describe('Search OneBox', function() {
    var wc;
    beforeEach(function() {
        wc = new RHDPSearchOneBox();
        wc.mock = true;
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should update term and url attributes', function() {
            var term ='test-term',
                url = 'test-url'; 
            wc.term = term;
            wc.url = url;
            expect(wc.getAttribute('term')).toEqual(term);
            expect(wc.getAttribute('url')).toEqual(url);
        });
    });

    describe('with incomplete properties', function() {
        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should be blank with no values', function() {
            wc.setAttribute('url', '');
            wc.setAttribute('term', '');
            expect(wc.innerHTML.length).toEqual(0);
        });

        it('should be blank with only a URL value', function() {
            wc.setAttribute('url', 'https://developers.redhat.com/rhdp-apps/onebox/onebox.json');
            expect(wc.innerHTML.length).toEqual(0);
        });

        it('should be blank with only a term value', function() {
            wc.setAttribute('url', '');
            wc.setAttribute('term', 'Test Feature Heading');
            expect(wc.innerHTML.length).toEqual(0);
        });
    })
    
    describe('with valid data', function() {
        var mockData = {
            "features": [{
                "id": "feature1",
                "heading": { 
                    "text": "feature1.heading.text", 
                    "url": "https://feature1.heading.url" 
                }, 
                "details": "feature1.details", 
                "button": { 
                    "text": "feature1.button.text", 
                    "url": "https://feature1.button.url" 
                },
                "slots": [ 
                    { "icon": "icon_helloworld", "text": "feature1.slot1.text", "url": "https://feature1.slot1.url" },
                    { "icon": "icon_helloworld", "text": "feature1.slot2.text", "url": "https://feature1.slot2.url" },
                    { "icon": "icon_helloworld", "text": "feature1.slot3.text", "url": "https://feature1.slot3.url" }
                ], 
                "match": ["f1match1","f1match2","f1match3","feature1 term","f1match4", "f1match5"]
            }, {
                "id": "feature2",
                "heading": { 
                    "text": "feature2.heading.text", 
                    "url": "https://feature2.heading.url" 
                }, 
                "details": "feature2.details", 
                "button": { 
                    "text": "feature2.button.text", 
                    "url": "https://feature2.button.url" 
                },
                "slots": [ 
                    { "icon": "icon_helloworld", "text": "feature2.slot1.text", "url": "https://feature2.slot1.url" },
                    { "icon": "icon_helloworld", "text": "feature2.slot2.text", "url": "https://feature2.slot2.url" },
                    { "icon": "icon_helloworld", "text": "feature2.slot3.text", "url": "https://feature2.slot3.url" }
                ], 
                "match": ["f2match1","f2match2","f2match3","feature2 term","f2match4", "f2match5"]
            }]
        };
        beforeEach(function() {
            wc.data = mockData;
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should be blank with an unmatched term', function() {
            wc.setAttribute('term', 'invalid test term');
            expect(wc.innerHTML.length).toEqual(0);
        });

        it('should not be blank with a matched term regardless of captialization', function() {
            wc.setAttribute('term', 'Feature1 Term');
            expect(wc.innerHTML.length).toBeGreaterThan(0);
        });

        describe('and a matched term', function() {
            beforeEach(function() {
                wc.setAttribute('term', 'feature1 term');
            });

            it('should not be blank', function() {
                expect(wc.innerHTML.length).toBeGreaterThan(0);
            });

            it('should have a heading linked to the appropriate URL', function() {
                expect(wc.querySelector('h4').innerText).toEqual('feature1.heading.text');
                expect(wc.querySelector('h4 a').href).toBe('https://feature1.heading.url/');
            });

            it('should have a paragraph with the feature details', function() {
                expect(wc.querySelector('p').innerText).toEqual('feature1.details');
            });

            it('should have a button linked to the appropriate URL', function() {
                expect(wc.querySelector('a.button').href).toEqual('https://feature1.button.url/?onebox=feature1')
                expect(wc.querySelector('a.button').innerText).toEqual('feature1.button.text')
            });

            it('should have an unordered list with three items', function() {
                expect(wc.querySelector('ul')).not.toBeNull();
                expect(wc.querySelectorAll('li').length).toEqual(3);
            });

            it('should list the slotted items with icons, text, and links', function() {
                var lis = wc.querySelectorAll('li');
                for(var i=0; i < 3; i++) {
                    var slotID = i+1;
                    expect(lis[i].innerText).toEqual('feature1.slot'+slotID+'.text');
                    expect(lis[i].querySelector('svg')).not.toBeNull();
                    expect(lis[i].querySelector('a').href).toEqual('https://feature1.slot'+slotID+'.url/?onebox=feature1');
                }
            });
        });

        describe('and a term matched to not the first feature', function() {
            beforeEach(function() {
                wc.setAttribute('term', 'feature2 term');
            });

            it('should not be blank', function() {
                expect(wc.innerHTML.length).toBeGreaterThan(0);
            });

            it('should have a heading linked to the appropriate URL', function() {
                expect(wc.querySelector('h4').innerText).toEqual('feature2.heading.text');
                expect(wc.querySelector('h4 a').href).toBe('https://feature2.heading.url/');
            });

            it('should have a paragraph with the feature details', function() {
                expect(wc.querySelector('p').innerText).toEqual('feature2.details');
            });

            it('should have a button linked to the appropriate URL', function() {
                expect(wc.querySelector('a.button').href).toEqual('https://feature2.button.url/?onebox=feature2')
                expect(wc.querySelector('a.button').innerText).toEqual('feature2.button.text')
            });

            it('should have an unordered list with three items', function() {
                expect(wc.querySelector('ul')).not.toBeNull();
                expect(wc.querySelectorAll('li').length).toEqual(3);
            });

            it('should list the slotted items with icons, text, and links', function() {
                var lis = wc.querySelectorAll('li');
                for(var i=0; i < 3; i++) {
                    var slotID = i+1;
                    expect(lis[i].innerText).toEqual('feature2.slot'+slotID+'.text');
                    expect(lis[i].querySelector('svg')).not.toBeNull();
                    expect(lis[i].querySelector('a').href).toEqual('https://feature2.slot'+slotID+'.url/?onebox=feature2');
                }
            });
        });
    })
});