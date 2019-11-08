"use strict";
/* global RHDPSearchFilterGroup */

describe('Search Filter Group', function() {
    var wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-filter-group.js').then(() => {
            wc = document.createElement('rhdp-search-filter-group');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('Properties', function() {
        it('should have a key property', function() {
            var key = 'test-filter-group';
            wc.key = key;
            expect(wc.key).toEqual(key);
        });
        it('should have a name property', function() {
            var name = 'Test Group Name';
            wc.name = name;
            expect(wc.name).toEqual(name);
            //expect(wc.querySelector('h6').innerText).toEqual(name.toUpperCase());
        });
        it('should have an items property', function() {
            var items = ['test1', 'test2'];
            wc.items = items;
            expect(wc.items).toEqual(items);
        });
        it('should have a toggle property', function() {
            expect(wc.toggle).toBe(true);
            expect(wc.shadowRoot.querySelector('.group').className).toEqual('group');
            expect(wc.shadowRoot.querySelector('.toggle').className).toEqual('toggle expand');
            wc.toggle = false;
            expect(wc.toggle).toBe(false);
            expect(wc.shadowRoot.querySelector('.group').className).toEqual('group hide');
            expect(wc.shadowRoot.querySelector('.toggle').className).toEqual('toggle');

        });
    });
});