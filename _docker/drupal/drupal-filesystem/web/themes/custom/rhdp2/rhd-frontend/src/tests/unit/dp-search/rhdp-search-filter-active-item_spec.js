"use strict";
// Test rhdp-search-filter-item component

describe('Search Filter Active Item', function() {
    var wc;
    var name = 'Test1', group = 'testgroup', key = 'test1', value = 'jbossdeveloper_test1';

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-filter-active-item.js').then(() => {
            wc = document.createElement('rhdp-search-filter-active-item');
            wc.name = name;
            wc.key = key;
            wc.value = value;
            wc.group = group;
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('Active', function() {
        it('should modify the active state', function() {
            let v = true;
            wc.addEventListener('filter-item-change', (e) => {
                if(!v) { document.removeEventListener('filter-item-change', this); }
                expect(wc.active).toBe(v);
                v = !v;
            })
            wc.active = true;
            wc.active = false;
        });
    });

    /**
     * TODO: Test all of the inline components for search to make sure they work properly
      */
    describe('Inline properties', function() {
        beforeEach(function() {
            wc.active = true;
        });

        it('should set inline innertext', function() {
            expect(wc.textContent.trim()).toBe(name);
        });
        it('should clear inline element on clearItem click', function() {
            var clr = wc.shadowRoot.querySelector('slot');
            wc.addEventListener('filter-item-change', (e) => {
                document.removeEventListener('filter-item-change', this);
                expect(wc.textContent.trim()).toBe('');                
            });
            clr.click();
        });
        it('should set active on clearItem click', function() {
            var clr = wc.shadowRoot.querySelector('slot');
            wc.addEventListener('filter-item-change', (e) => {
                document.removeEventListener('filter-item-change', this);
                expect(wc.active).toBe(true);
            });
        });

    });

});